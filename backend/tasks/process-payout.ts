import { task } from "hardhat/config";
import { ethers } from "ethers";

task("process-payout", "Triggers a contractor payout attempt")
  .addParam("contractor", "Contractor wallet")
  .addParam("amount", "Token amount")
  .setAction(async ({ contractor, amount }, hre) => {
    const escrowAddress = process.env.PAYSHIELD_ESCROW_ADDRESS;
    if (!escrowAddress) {
      throw new Error("PAYSHIELD_ESCROW_ADDRESS is required");
    }

    const [signer] = await hre.ethers.getSigners();
    const escrow = (await hre.ethers.getContractAt("PayShieldEscrow", escrowAddress)) as any;
    const tx = await escrow.connect(signer).release(contractor, ethers.toBigInt(amount));
    await tx.wait();
    console.log(`Payout attempted: ${amount} tokens to ${contractor}`);
  });
