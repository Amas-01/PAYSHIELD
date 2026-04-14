import { useCofheClient, useCofheEncrypt } from "@cofhe/react";
import { Encryptable, FheTypes } from "@cofhe/sdk";
import { useAccount } from "wagmi";

export function useFHE() {
  const { encryptInputsAsync, isEncrypting } = useCofheEncrypt();
  const client = useCofheClient();
  const { address } = useAccount();

  const encryptPayrollInputs = async (hours: number, rate: number) => {
    if (hours < 0 || rate < 0) {
      throw new Error("Hours and rate must be non-negative");
    }

    const encryptedInputs = await encryptInputsAsync([
      Encryptable.uint32(BigInt(hours)),
      Encryptable.uint32(BigInt(rate)),
    ] as const);

    return {
      encryptedHours: encryptedInputs[0],
      encryptedRate: encryptedInputs[1],
    };
  };

  const decryptNetPay = async (ciphertextHandle: string) => {
    if (!address) {
      throw new Error("Connect wallet to decrypt payroll");
    }

    const permit = await client.permits.createSelf({
      issuer: address,
      name: "PayShield Contractor Permit",
    });

    const decrypted = await client
      .decryptForView(ciphertextHandle, FheTypes.Uint32)
      .withPermit(permit)
      .execute();

    return decrypted;
  };

  return {
    isEncrypting,
    encryptPayrollInputs,
    decryptNetPay,
  };
}
