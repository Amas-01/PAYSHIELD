import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { Encryptable } from "@cofhe/sdk";

const TASK_COFHE_MOCKS_DEPLOY = "task:cofhe-mocks:deploy";

describe("PayShieldEscrow", function () {
  async function deployFixture() {
    await hre.run(TASK_COFHE_MOCKS_DEPLOY);

    const [deployer, employer, contractor] = await hre.ethers.getSigners();

    const tokenFactory = await hre.ethers.getContractFactory("MockFHERC20");
    const token = await tokenFactory.connect(deployer).deploy();
    await token.waitForDeployment();

    await token.connect(deployer).mint(employer.address, 1_000_000n);

    const registryFactory = await hre.ethers.getContractFactory("PayShieldRegistry");
    const registry = await registryFactory.connect(deployer).deploy();
    await registry.waitForDeployment();
    await registry.connect(employer).registerContractor(contractor.address);

    const payrollFactory = await hre.ethers.getContractFactory("PayShieldPayroll");
    const payroll = await payrollFactory.connect(deployer).deploy(await registry.getAddress());
    await payroll.waitForDeployment();

    const poolFactory = await hre.ethers.getContractFactory("PayShieldPool");
    const pool = await poolFactory.connect(deployer).deploy(await token.getAddress());
    await pool.waitForDeployment();

    const escrowFactory = await hre.ethers.getContractFactory("PayShieldEscrow");
    const escrow = await escrowFactory
      .connect(deployer)
      .deploy(await payroll.getAddress(), await pool.getAddress());
    await escrow.waitForDeployment();

    await pool.connect(deployer).setEscrow(await escrow.getAddress());

    await token.connect(employer).approve(await pool.getAddress(), 1_000_000n);
    await pool.connect(employer).deposit(1_000_000n);

    const client = await hre.cofhe.createClientWithBatteries(employer);
    const encrypted = await client
      .encryptInputs([Encryptable.uint32(40n), Encryptable.uint32(25n)])
      .execute();

    await payroll
      .connect(employer)
      .submitPayroll(contractor.address, encrypted[0], encrypted[1]);

    return { employer, contractor, token, payroll, escrow };
  }

  it("uses silent failure when payroll is not confirmed", async function () {
    const { employer, contractor, token, escrow } = await loadFixture(deployFixture);

    const beforeBalance = await token.balanceOf(contractor.address);
    const success = await escrow.connect(employer).release.staticCall(contractor.address, 1000n);
    await escrow.connect(employer).release(contractor.address, 1000n);
    const afterBalance = await token.balanceOf(contractor.address);

    expect(success).to.equal(false);
    expect(afterBalance).to.equal(beforeBalance);
  });

  it("releases payout after employer confirms payroll", async function () {
    const { employer, contractor, token, payroll, escrow } = await loadFixture(deployFixture);

    await payroll.connect(employer).confirmPayroll(contractor.address);

    const success = await escrow.connect(employer).release.staticCall(contractor.address, 1000n);
    await escrow.connect(employer).release(contractor.address, 1000n);

    const contractorBalance = await token.balanceOf(contractor.address);
    expect(success).to.equal(true);
    expect(contractorBalance).to.equal(1000n);
  });
});
