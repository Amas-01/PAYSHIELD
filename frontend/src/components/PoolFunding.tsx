import { useState } from "react";
import { usePayroll } from "../hooks/usePayroll";

function PoolFunding() {
  const [amount, setAmount] = useState("100");
  const [status, setStatus] = useState("Ready to fund pool");
  const { prepareStablecoinDisbursement, depositToPool } = usePayroll();

  const onDeposit = async () => {
    try {
      setStatus("Preparing Reineira USDC units...");
      const baseUnits = await prepareStablecoinDisbursement(amount);

      setStatus("Submitting pool deposit transaction...");
      await depositToPool(baseUnits);
      setStatus(`Pool funded with ${amount} USDC`);
    } catch (error) {
      setStatus((error as Error).message);
    }
  };

  return (
    <section>
      <h2>Pool Funding</h2>
      <input
        type="number"
        min="0"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        placeholder="USDC amount"
      />
      <button type="button" onClick={onDeposit}>
        Deposit USDC
      </button>
      <p>{status}</p>
    </section>
  );
}

export default PoolFunding;
