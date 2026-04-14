import { useState } from "react";
import { isAddress } from "viem";
import { usePayroll } from "../hooks/usePayroll";
import PayrollForm from "./PayrollForm";

function EmployerDashboard() {
  const [contractorToConfirm, setContractorToConfirm] = useState("");
  const [status, setStatus] = useState("No confirmation submitted");
  const { confirmPayroll } = usePayroll();

  const handleConfirm = async () => {
    if (!isAddress(contractorToConfirm)) {
      setStatus("Invalid contractor address");
      return;
    }

    try {
      await confirmPayroll(contractorToConfirm);
      setStatus("Payroll confirmed by employer");
    } catch (error) {
      setStatus((error as Error).message);
    }
  };

  return (
    <section>
      <h2>Employer Dashboard</h2>
      <PayrollForm />
      <h3>Confirm Payroll</h3>
      <input
        type="text"
        placeholder="Contractor address"
        value={contractorToConfirm}
        onChange={(event) => setContractorToConfirm(event.target.value)}
      />
      <button type="button" onClick={handleConfirm}>
        Confirm Payroll
      </button>
      <p>{status}</p>
    </section>
  );
}

export default EmployerDashboard;
