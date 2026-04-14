import EmployerDashboard from "../components/EmployerDashboard";

export default function EmployerPage() {
  return (
    <main className="page-wrapper">
      <section className="page-section">
        <div className="page-header">
          <h1>Employer Dashboard</h1>
          <p>Submit and confirm encrypted payroll for contractors.</p>
        </div>

        <div className="page-content">
          <EmployerDashboard />
        </div>

        <div className="page-info">
          <h3>How this works</h3>
          <ul>
            <li>Enter the contractor's wallet address.</li>
            <li>Submit encrypted hours and rate. These values are encrypted in the browser before submission.</li>
            <li>Confirm the payroll to unlock escrow release.</li>
            <li>Once confirmed, the contractor can decrypt their net pay.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
