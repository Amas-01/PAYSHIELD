import { task } from "hardhat/config";

task("fund-payroll", "Funds employer payroll pool")
  .addParam("amount", "Amount in wei")
  .setAction(async ({ amount }, hre) => {
    const [signer] = await hre.ethers.getSigners();
    const pool = await hre.ethers.getContractAt("PayShieldPool", process.env.PAYSHIELD_POOL_ADDRESS || "");
    const tx = await pool.connect(signer).fund({ value: amount });
    await tx.wait();
    console.log(`Pool funded with ${amount} wei`);
  });
