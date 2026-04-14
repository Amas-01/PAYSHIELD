import PoolFunding from "../components/PoolFunding";

export default function PoolPage() {
  return (
    <main className="page-wrapper">
      <section className="page-section">
        <div className="page-header">
          <h1>Pool Management</h1>
          <p>Deposit stablecoin liquidity for escrow disbursement.</p>
        </div>

        <div className="page-content">
          <PoolFunding />
        </div>

        <div className="page-info">
          <h3>Pool Mechanics</h3>
          <ul>
            <li>Employers deposit USDC to fund outgoing contractor payments.</li>
            <li>Escrow contract holds funds and releases only after payroll confirmation.</li>
            <li>Pool balance is tracked on-chain but never reveals individual contractor amounts.</li>
            <li>Selective disclosure allows employers to prove funding without exposing amounts.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
