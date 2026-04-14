import { task } from "hardhat/config";
import { ethers } from "ethers";

task("fund-payroll", "Funds employer payroll pool")
  .addParam("amount", "Token amount")
  .setAction(async ({ amount }, hre) => {
    const poolAddress = process.env.PAYSHIELD_POOL_ADDRESS;
    if (!poolAddress) {
      throw new Error("PAYSHIELD_POOL_ADDRESS is required");
    }

    const [signer] = await hre.ethers.getSigners();
    const pool = await hre.ethers.getContractAt("PayShieldPool", poolAddress);
    const tx = await pool.connect(signer).deposit(ethers.toBigInt(amount));
    await tx.wait();
    console.log(`Pool funded with ${amount} tokens`);
  });
