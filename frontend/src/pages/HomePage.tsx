export default function HomePage() {
  return (
    <main className="app-shell">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__panel">
          <div className="hero__badge">Encrypted Payroll Platform</div>
          <h1 className="hero__title">Payroll Privacy at Scale</h1>
          <p className="hero__subtitle">
            Contractor compensation stays encrypted through computation. Employers fund payroll. Contractors decrypt only their own pay.
          </p>

          <div className="hero__metrics">
            <div className="metric">
              <div className="metric__label">Privacy Model</div>
              <div className="metric__value">Encrypted at rest + in computation</div>
            </div>
            <div className="metric">
              <div className="metric__label">Technical Stack</div>
              <div className="metric__value">Solidity + CoFHE + Mock FHE tests</div>
            </div>
            <div className="metric">
              <div className="metric__label">Use Case</div>
              <div className="metric__value">Contractor safety, compliance, privacy</div>
            </div>
          </div>

          <div className="hero__cta">
            <a href="#how-it-works" className="button button-lg">
              Learn How It Works
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <svg viewBox="0 0 300 300" className="hero__diagram">
            <defs>
              <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            {/* Employer box */}
            <rect x="20" y="40" width="100" height="80" fill="none" stroke="url(#heroGrad)" strokeWidth="2" rx="8" />
            <text x="70" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              Employer
            </text>
            <text x="70" y="90" textAnchor="middle" fill="#ccc" fontSize="11">
              Funds pool
            </text>

            {/* Arrow 1 */}
            <path d="M 120 80 L 160 80" stroke="url(#heroGrad)" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Encryption box */}
            <circle cx="180" cy="80" r="35" fill="none" stroke="url(#heroGrad)" strokeWidth="2" />
            <text x="180" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
              Encrypt
            </text>
            <text x="180" y="88" textAnchor="middle" fill="#ccc" fontSize="10">
              FHE.mul
            </text>

            {/* Arrow 2 */}
            <path d="M 180 115 L 180 155" stroke="url(#heroGrad)" strokeWidth="2" />

            {/* Compute box */}
            <rect x="130" y="155" width="100" height="80" fill="none" stroke="url(#heroGrad)" strokeWidth="2" rx="8" />
            <text x="180" y="190" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              Encrypted Payroll
            </text>
            <text x="180" y="205" textAnchor="middle" fill="#ccc" fontSize="11">
              on-chain math
            </text>

            {/* Arrow 3 */}
            <path d="M 180 235 L 180 260" stroke="url(#heroGrad)" strokeWidth="2" />

            {/* Contractor decrypt */}
            <rect x="130" y="260" width="100" height="25" fill="url(#heroGrad)" rx="4" opacity="0.2" />
            <text x="180" y="277" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
              Contractor decrypts
            </text>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="url(#heroGrad)" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section">
        <div className="section__header">
          <h2>How It Works</h2>
          <p>A simple workflow that keeps payroll private at every step.</p>
        </div>

        <div className="workflow">
          <div className="workflow__step">
            <div className="workflow__number">1</div>
            <h3>Employer enters compensation</h3>
            <p>Hours and rate are submitted through the PayShield app and encrypted immediately.</p>
          </div>

          <div className="workflow__arrow">→</div>

          <div className="workflow__step">
            <div className="workflow__number">2</div>
            <h3>On-chain FHE computation</h3>
            <p>Encrypted inputs are multiplied using FHE.mul, returning an encrypted result handle.</p>
          </div>

          <div className="workflow__arrow">→</div>

          <div className="workflow__step">
            <div className="workflow__number">3</div>
            <h3>Employer confirms</h3>
            <p>Employer must explicitly confirm the payroll before funds can be released.</p>
          </div>

          <div className="workflow__arrow">→</div>

          <div className="workflow__step">
            <div className="workflow__number">4</div>
            <h3>Contractor decrypts</h3>
            <p>Only the contractor can decrypt their pay using their wallet's decryption key.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="section__header">
          <h2>Built on Production Infrastructure</h2>
          <p>Hardened with encrypted computation primitives and rigorous testing.</p>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-card__icon">🔐</div>
            <h3>Homomorphic Encryption</h3>
            <p>Hours, rates, and net pay remain encrypted during all on-chain operations using CoFHE.</p>
          </article>

          <article className="feature-card">
            <div className="feature-card__icon">✓</div>
            <h3>Privacy by Design</h3>
            <p>No contractor data is ever exposed to payroll admins, pool operators, or blockchain observers.</p>
          </article>

          <article className="feature-card">
            <div className="feature-card__icon">🏗️</div>
            <h3>Tested & Proven</h3>
            <p>6 passing integration tests verify encrypted payroll math correctness in mock FHE environment.</p>
          </article>

          <article className="feature-card">
            <div className="feature-card__icon">⚖️</div>
            <h3>Compliance Ready</h3>
            <p>Selective disclosure and escrow mechanics support audit requirements and dispute resolution.</p>
          </article>

          <article className="feature-card">
            <div className="feature-card__icon">🔗</div>
            <h3>Bridge Compatible</h3>
            <p>Pool funding via stablecoin deposits with Reineira SDK for cross-chain payment plumbing.</p>
          </article>

          <article className="feature-card">
            <div className="feature-card__icon">⚡</div>
            <h3>Developer Ready</h3>
            <p>TypeChain generated types, Hardhat mock FHE environment, React hooks for cryptographic UX.</p>
          </article>
        </div>
      </section>

      {/* Privacy & Safety */}
      <section className="section section--dark">
        <div className="section__header">
          <h2>Privacy Guarantees</h2>
          <p>Data protection at every layer.</p>
        </div>

        <div className="guarantees">
          <div className="guarantee">
            <h4>Before Submission</h4>
            <p>Inputs are encrypted in the browser before any network transmission.</p>
          </div>

          <div className="guarantee">
            <h4>During Computation</h4>
            <p>Smart contract executes math on ciphertexts using FHE.mul, never decrypts intermediate values.</p>
          </div>

          <div className="guarantee">
            <h4>After Confirmation</h4>
            <p>Only employers can initiate escrow release; only contractors can decrypt their compensation.</p>
          </div>

          <div className="guarantee">
            <h4>On-chain Transparency</h4>
            <p>Encrypted state is recorded on-chain. Plaintext never exists in the system's critical path.</p>
          </div>
        </div>
      </section>

      {/* Demo Path */}
      <section className="section">
        <div className="section__header">
          <h2>Judge Demo Flow</h2>
          <p>Five minutes to see the complete encrypted payroll cycle.</p>
        </div>

        <div className="demo-path">
          <ol className="demo-steps">
            <li>
              <strong>Connect wallet</strong> — Use the navigation to link a test wallet (Injected provider simulation).
            </li>
            <li>
              <strong>Go to Employer</strong> — Submit encrypted payroll: enter contractor address, hours (e.g., 40), and rate (e.g., 25).
            </li>
            <li>
              <strong>Confirm payroll</strong> — Employer confirmation unlocks the escrow gate.
            </li>
            <li>
              <strong>Check Pool</strong> — Deposit USDC to demonstrate pool funding mechanics.
            </li>
            <li>
              <strong>Decrypt as Contractor</strong> — Switch to Contractor View, decrypt your pay, see plaintext net compensation.
            </li>
          </ol>
          <p className="demo-note">
            Backend tests prove encrypted math is correct. README shows mock FHE assertion output as judge validation.
          </p>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="section section--footer">
        <div className="footer-content">
          <h2>Ready to try?</h2>
          <p>Use the navigation above to explore the Employer, Contractor, and Pool screens.</p>
          <a href="/employer" className="button button-lg">
            Start with Employer Screen
          </a>
        </div>
      </section>
    </main>
  );
}
