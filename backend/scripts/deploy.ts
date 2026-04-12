import { ethers } from "hardhat";

async function main() {
  const registryFactory = await ethers.getContractFactory("PayShieldRegistry");
  const registry = await registryFactory.deploy();
  await registry.waitForDeployment();

  const poolFactory = await ethers.getContractFactory("PayShieldPool");
  const pool = await poolFactory.deploy();
  await pool.waitForDeployment();

  const escrowFactory = await ethers.getContractFactory("PayShieldEscrow");
  const escrow = await escrowFactory.deploy();
  await escrow.waitForDeployment();

  const payrollFactory = await ethers.getContractFactory("PayShieldPayroll");
  const payroll = await payrollFactory.deploy(await registry.getAddress());
  await payroll.waitForDeployment();

  console.log("PayShieldRegistry:", await registry.getAddress());
  console.log("PayShieldPool:", await pool.getAddress());
  console.log("PayShieldEscrow:", await escrow.getAddress());
  console.log("PayShieldPayroll:", await payroll.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
