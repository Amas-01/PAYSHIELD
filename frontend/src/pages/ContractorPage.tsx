import ContractorView from "../components/ContractorView";

export default function ContractorPage() {
  return (
    <main className="page-wrapper">
      <section className="page-section">
        <div className="page-header">
          <h1>Contractor View</h1>
          <p>Decrypt and view your encrypted payroll compensation.</p>
        </div>

        <div className="page-content">
          <ContractorView />
        </div>

        <div className="page-info">
          <h3>Privacy Guarantee</h3>
          <ul>
            <li>Only your wallet can decrypt your pay using your private key.</li>
            <li>The employer never sees the plaintext amount they confirm.</li>
            <li>Contract state is encrypted; plaintext never touches the blockchain.</li>
            <li>Decryption requires a permit issued specifically for your wallet address.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
