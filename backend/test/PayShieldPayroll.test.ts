import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { Encryptable } from "@cofhe/sdk";

const TASK_COFHE_MOCKS_DEPLOY = "task:cofhe-mocks:deploy";

describe("PayShieldPayroll", function () {
  async function deployFixture() {
    await hre.run(TASK_COFHE_MOCKS_DEPLOY);

    const [_, employer, contractor] = await hre.ethers.getSigners();

    const registryFactory = await hre.ethers.getContractFactory("PayShieldRegistry");
    const registry = await registryFactory.connect(employer).deploy();
    await registry.waitForDeployment();

    await registry.connect(employer).registerContractor(contractor.address);

    const payrollFactory = await hre.ethers.getContractFactory("PayShieldPayroll");
    const payroll = await payrollFactory.connect(employer).deploy(await registry.getAddress());
    await payroll.waitForDeployment();

    const client = await hre.cofhe.createClientWithBatteries(employer);

    return { employer, contractor, payroll, client };
  }

  it("computes encrypted net pay with FHE.mul and keeps values encrypted", async function () {
    const { employer, contractor, payroll, client } = await loadFixture(deployFixture);

    const encryptedInputs = await client
      .encryptInputs([Encryptable.uint32(40n), Encryptable.uint32(25n)])
      .execute();

    await payroll
      .connect(employer)
      .submitPayroll(contractor.address, encryptedInputs[0], encryptedInputs[1]);

    const netPayHandle = await payroll.getNetPay(employer.address, contractor.address);
    await hre.cofhe.mocks.expectPlaintext(netPayHandle, 1000n);
  });

  it("marks payroll as employer-confirmed", async function () {
    const { employer, contractor, payroll, client } = await loadFixture(deployFixture);

    const encryptedInputs = await client
      .encryptInputs([Encryptable.uint32(10n), Encryptable.uint32(10n)])
      .execute();

    await payroll
      .connect(employer)
      .submitPayroll(contractor.address, encryptedInputs[0], encryptedInputs[1]);

    await payroll.connect(employer).confirmPayroll(contractor.address);

    const confirmed = await payroll.isPayrollConfirmed(employer.address, contractor.address);
    expect(confirmed).to.equal(true);
  });
});
