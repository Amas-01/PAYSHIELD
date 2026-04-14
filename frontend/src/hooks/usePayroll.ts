import { useMemo } from "react";
import { usePublicClient, useWaitForTransactionReceipt, useWalletClient, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESSES, PAYSHIELD_PAYROLL_ABI, PAYSHIELD_POOL_ABI } from "../lib/config";

type EncryptedInputStruct = {
  ctHash: bigint;
  securityZone: number;
  utype: number;
  signature: `0x${string}`;
};

export function usePayroll() {
  useWalletClient();
  usePublicClient();
  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  const isConfigured = useMemo(() => {
    return (
      CONTRACT_ADDRESSES.payroll !== "0x0000000000000000000000000000000000000000" &&
      CONTRACT_ADDRESSES.pool !== "0x0000000000000000000000000000000000000000"
    );
  }, []);

  const assertConfigured = () => {
    if (!isConfigured) {
      throw new Error("Set VITE_PAYSHIELD_* contract addresses before submitting transactions");
    }
  };

  const submitPayroll = async (
    contractor: `0x${string}`,
    encryptedHours: EncryptedInputStruct,
    encryptedRate: EncryptedInputStruct
  ) => {
    assertConfigured();
    return writeContractAsync({
      address: CONTRACT_ADDRESSES.payroll,
      abi: PAYSHIELD_PAYROLL_ABI,
      functionName: "submitPayroll",
      args: [contractor, encryptedHours, encryptedRate],
    });
  };

  const confirmPayroll = async (contractor: `0x${string}`) => {
    assertConfigured();
    return writeContractAsync({
      address: CONTRACT_ADDRESSES.payroll,
      abi: PAYSHIELD_PAYROLL_ABI,
      functionName: "confirmPayroll",
      args: [contractor],
    });
  };

  const prepareStablecoinDisbursement = async (amount: string) => {
    const parsed = Number(amount);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      throw new Error("Enter a valid USDC amount");
    }
    return BigInt(Math.round(parsed * 1_000_000));
  };

  const depositToPool = async (amount: bigint) => {
    assertConfigured();
    return writeContractAsync({
      address: CONTRACT_ADDRESSES.pool,
      abi: PAYSHIELD_POOL_ABI,
      functionName: "deposit",
      args: [amount],
    });
  };

  return {
    hash,
    isPending,
    isConfigured,
    receipt,
    submitPayroll,
    confirmPayroll,
    prepareStablecoinDisbursement,
    depositToPool,
  };
}
