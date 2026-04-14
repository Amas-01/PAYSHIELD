import { ethers } from "hardhat";

async function main() {
  const usdcAddress = process.env.USDC_ADDRESS;
  if (!usdcAddress) {
    throw new Error("USDC_ADDRESS is required");
  }

  const registryFactory = await ethers.getContractFactory("PayShieldRegistry");
  const registry = await registryFactory.deploy();
  await registry.waitForDeployment();

  const payrollFactory = await ethers.getContractFactory("PayShieldPayroll");
  const payroll = await payrollFactory.deploy(await registry.getAddress());
  await payroll.waitForDeployment();

  const poolFactory = await ethers.getContractFactory("PayShieldPool");
  const pool = await poolFactory.deploy(usdcAddress);
  await pool.waitForDeployment();

  const escrowFactory = await ethers.getContractFactory("PayShieldEscrow");
  const escrow = await escrowFactory.deploy(await payroll.getAddress(), await pool.getAddress());
  await escrow.waitForDeployment();

  const setEscrowTx = await pool.setEscrow(await escrow.getAddress());
  await setEscrowTx.wait();

  console.log("PayShieldRegistry:", await registry.getAddress());
  console.log("PayShieldPayroll:", await payroll.getAddress());
  console.log("PayShieldPool:", await pool.getAddress());
  console.log("PayShieldEscrow:", await escrow.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
