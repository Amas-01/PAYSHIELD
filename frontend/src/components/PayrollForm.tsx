import { FormEvent, useState } from "react";
import { isAddress } from "viem";
import { useFHE } from "../hooks/useFHE";
import { usePayroll } from "../hooks/usePayroll";

function PayrollForm() {
  const [contractor, setContractor] = useState("");
  const [hours, setHours] = useState("40");
  const [rate, setRate] = useState("25");
  const [status, setStatus] = useState("Ready");

  const { encryptPayrollInputs, isEncrypting } = useFHE();
  const { submitPayroll, isPending, hash } = usePayroll();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isAddress(contractor)) {
      setStatus("Invalid contractor address");
      return;
    }

    try {
      setStatus("Encrypting payroll inputs...");
      const encrypted = await encryptPayrollInputs(Number(hours), Number(rate));

      setStatus("Submitting encrypted payroll transaction...");
      await submitPayroll(contractor, encrypted.encryptedHours as any, encrypted.encryptedRate as any);
      setStatus("Submitted successfully");
    } catch (error) {
      setStatus((error as Error).message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="contractor">Contractor Address</label>
      <input
        id="contractor"
        name="contractor"
        type="text"
        placeholder="0x..."
        value={contractor}
        onChange={(event) => setContractor(event.target.value)}
      />

      <label htmlFor="hours">Encrypted Hours</label>
      <input
        id="hours"
        name="hours"
        type="number"
        min="0"
        placeholder="e.g. 40"
        value={hours}
        onChange={(event) => setHours(event.target.value)}
      />

      <label htmlFor="rate">Encrypted Rate</label>
      <input
        id="rate"
        name="rate"
        type="number"
        min="0"
        placeholder="e.g. 25"
        value={rate}
        onChange={(event) => setRate(event.target.value)}
      />

      <button type="submit" disabled={isEncrypting || isPending}>
        Encrypt & Submit Payroll
      </button>
      <p>{status}</p>
      {hash ? <p>Tx: {hash}</p> : null}
    </form>
  );
}

export default PayrollForm;
