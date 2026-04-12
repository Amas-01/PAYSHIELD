<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>PayShield — Architecture</title>
<style>
  :root {
    --bg: #f8f8f6;
    --card: #ffffff;
    --border: rgba(0,0,0,0.10);
    --text: #1a1a18;
    --muted: #6b6b66;
  }
  @media (prefers-color-scheme: dark) {
    :root { --bg:#1a1a18; --card:#24241f; --border:rgba(255,255,255,0.10); --text:#e8e6de; --muted:#9c9a90; }
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--bg); font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 32px; max-width: 900px; width: 100%; box-shadow: 0 2px 24px rgba(0,0,0,0.06); }
  h1 { font-size: 22px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
  p.sub { font-size: 14px; color: var(--muted); margin-bottom: 28px; }
  svg text { font-family: system-ui, -apple-system, sans-serif; }
  .legend { display: flex; gap: 24px; margin-top: 20px; flex-wrap: wrap; }
  .legend-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--muted); }
  .dot { width: 12px; height: 12px; border-radius: 3px; flex-shrink: 0; }
</style>
</head>
<body>
<div class="card">
  <h1>🛡️ PayShield — Architecture</h1>
  <p class="sub">Confidential Payroll · Arbitrum Sepolia · FHE via CoFHE · Stablecoin flows via Privara SDK</p>

  <svg width="100%" viewBox="0 0 840 760" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </marker>
    </defs>

    <!-- ═══ COLUMN HEADERS ═══ -->
    <text x="130" y="22" text-anchor="middle" font-size="13" font-weight="600" fill="#3B8BD4">Application</text>
    <text x="420" y="22" text-anchor="middle" font-size="13" font-weight="600" fill="#7F77DD">Host Chain · Arbitrum Sepolia</text>
    <text x="720" y="22" text-anchor="middle" font-size="13" font-weight="600" fill="#639922">Plugin Interfaces</text>

    <!-- ═══ APPLICATION BOX ═══ -->
    <rect x="30" y="34" width="200" height="210" rx="12" fill="#E6F1FB" stroke="#378ADD" stroke-width="0.8"/>
    <text x="130" y="58" text-anchor="middle" font-size="13" font-weight="600" fill="#0C447C">Employer / Contractor</text>
    <text x="130" y="74" text-anchor="middle" font-size="11" fill="#185FA5">React + Vite + wagmi v2</text>

    <rect x="46" y="88" width="168" height="44" rx="7" fill="#B5D4F4" stroke="#378ADD" stroke-width="0.5"/>
    <text x="130" y="107" text-anchor="middle" font-size="12" font-weight="600" fill="#0C447C">Employer Dashboard</text>
    <text x="130" y="122" text-anchor="middle" font-size="11" fill="#185FA5">Encrypts hours &amp; salary</text>

    <rect x="46" y="142" width="168" height="44" rx="7" fill="#B5D4F4" stroke="#378ADD" stroke-width="0.5"/>
    <text x="130" y="161" text-anchor="middle" font-size="12" font-weight="600" fill="#0C447C">Contractor View</text>
    <text x="130" y="176" text-anchor="middle" font-size="11" fill="#185FA5">Decrypt own pay only</text>

    <rect x="46" y="196" width="168" height="36" rx="7" fill="#B5D4F4" stroke="#378ADD" stroke-width="0.5"/>
    <text x="130" y="214" text-anchor="middle" font-size="12" font-weight="600" fill="#0C447C">Pool Funding UI</text>
    <text x="130" y="226" text-anchor="middle" font-size="11" fill="#185FA5">USDC deposit interface</text>

    <!-- SDK labels -->
    <text x="130" y="256" text-anchor="middle" font-size="10" fill="#185FA5">@cofhe/react · @reineira-os/sdk</text>
    <text x="130" y="269" text-anchor="middle" font-size="10" fill="#185FA5">@cofhe/sdk ^0.4.0</text>

    <!-- ═══ ARROW App → Host Chain ═══ -->
    <line x1="230" y1="140" x2="288" y2="140" stroke="#378ADD" stroke-width="1.5" marker-end="url(#arr)"/>
    <text x="259" y="133" text-anchor="middle" font-size="10" fill="#185FA5">euint32</text>
    <text x="259" y="153" text-anchor="middle" font-size="10" fill="#185FA5">encrypted</text>

    <!-- ═══ HOST CHAIN BOX ═══ -->
    <rect x="290" y="34" width="260" height="380" rx="12" fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.8"/>
    <text x="420" y="58" text-anchor="middle" font-size="13" font-weight="600" fill="#3C3489">Core Protocol Contracts</text>
    <text x="420" y="73" text-anchor="middle" font-size="11" fill="#534AB7">ERC-165 required on all contracts</text>

    <!-- Contract 1 -->
    <rect x="306" y="84" width="228" height="58" rx="8" fill="#AFA9EC" stroke="#7F77DD" stroke-width="0.5"/>
    <text x="420" y="105" text-anchor="middle" font-size="12" font-weight="600" fill="#26215C">PayShieldPayroll.sol</text>
    <text x="420" y="120" text-anchor="middle" font-size="10" fill="#3C3489">FHE.mul(hours, rate) → net pay</text>
    <text x="420" y="133" text-anchor="middle" font-size="10" fill="#3C3489">Encrypted totals, no plaintext leak</text>

    <!-- Contract 2 -->
    <rect x="306" y="154" width="228" height="58" rx="8" fill="#AFA9EC" stroke="#7F77DD" stroke-width="0.5"/>
    <text x="420" y="175" text-anchor="middle" font-size="12" font-weight="600" fill="#26215C">PayShieldRegistry.sol</text>
    <text x="420" y="190" text-anchor="middle" font-size="10" fill="#3C3489">Employer → contractor mapping</text>
    <text x="420" y="203" text-anchor="middle" font-size="10" fill="#3C3489">Active → Paid → Disputed states</text>

    <!-- Contract 3 -->
    <rect x="306" y="224" width="228" height="58" rx="8" fill="#AFA9EC" stroke="#7F77DD" stroke-width="0.5"/>
    <text x="420" y="245" text-anchor="middle" font-size="12" font-weight="600" fill="#26215C">PayShieldEscrow.sol</text>
    <text x="420" y="260" text-anchor="middle" font-size="10" fill="#3C3489">IFHERC20 · silent failure pattern</text>
    <text x="420" y="273" text-anchor="middle" font-size="10" fill="#3C3489">Holds USDC until payout confirmed</text>

    <!-- Contract 4 -->
    <rect x="306" y="294" width="228" height="58" rx="8" fill="#AFA9EC" stroke="#7F77DD" stroke-width="0.5"/>
    <text x="420" y="315" text-anchor="middle" font-size="12" font-weight="600" fill="#26215C">PayShieldPool.sol</text>
    <text x="420" y="330" text-anchor="middle" font-size="10" fill="#3C3489">Permissionless USDC liquidity pool</text>
    <text x="420" y="343" text-anchor="middle" font-size="10" fill="#3C3489">Employers pre-fund payroll here</text>

    <text x="420" y="394" text-anchor="middle" font-size="10" fill="#534AB7">Arbitrum Sepolia · arb-sepolia plugin</text>

    <!-- ═══ ARROWS Host Chain → Plugin Interfaces ═══ -->
    <path d="M550 113 L610 113" fill="none" stroke="#7F77DD" stroke-width="1" stroke-dasharray="4 3" marker-end="url(#arr)"/>
    <path d="M550 253 L610 200" fill="none" stroke="#7F77DD" stroke-width="1" stroke-dasharray="4 3" marker-end="url(#arr)"/>
    <path d="M550 323 L610 280" fill="none" stroke="#7F77DD" stroke-width="1" stroke-dasharray="4 3" marker-end="url(#arr)"/>

    <!-- ═══ PLUGIN INTERFACES ═══ -->
    <rect x="610" y="34" width="210" height="360" rx="12" fill="#EAF3DE" stroke="#639922" stroke-width="0.8"/>
    <text x="715" y="58" text-anchor="middle" font-size="13" font-weight="600" fill="#27500A">Plugin Contracts</text>

    <!-- Plugin 1: FHE ops -->
    <rect x="626" y="72" width="178" height="90" rx="8" fill="#C0DD97" stroke="#639922" stroke-width="0.5"/>
    <text x="715" y="92" text-anchor="middle" font-size="11" font-weight="600" fill="#173404">FHE Operations</text>
    <text x="715" y="108" text-anchor="middle" font-size="10" fill="#27500A">FHE.add / FHE.mul / FHE.sub</text>
    <text x="715" y="122" text-anchor="middle" font-size="10" fill="#27500A">FHE.allowThis(value)</text>
    <text x="715" y="136" text-anchor="middle" font-size="10" fill="#27500A">FHE.allow(value, address)</text>
    <text x="715" y="150" text-anchor="middle" font-size="10" fill="#27500A">Selective disclosure per contractor</text>

    <!-- Plugin 2: Privara -->
    <rect x="626" y="174" width="178" height="80" rx="8" fill="#C0DD97" stroke="#639922" stroke-width="0.5"/>
    <text x="715" y="194" text-anchor="middle" font-size="11" font-weight="600" fill="#173404">Privara SDK</text>
    <text x="715" y="210" text-anchor="middle" font-size="10" fill="#27500A">@reineira-os/sdk ^0.1.0</text>
    <text x="715" y="224" text-anchor="middle" font-size="10" fill="#27500A">Encrypted USDC stablecoin flow</text>
    <text x="715" y="238" text-anchor="middle" font-size="10" fill="#27500A">ReineiraOS 0.1 compatible</text>

    <!-- Plugin 3: Compliance -->
    <rect x="626" y="266" width="178" height="70" rx="8" fill="#C0DD97" stroke="#639922" stroke-width="0.5"/>
    <text x="715" y="286" text-anchor="middle" font-size="11" font-weight="600" fill="#173404">NDPR Compliance</text>
    <text x="715" y="302" text-anchor="middle" font-size="10" fill="#27500A">No plaintext PII on-chain</text>
    <text x="715" y="316" text-anchor="middle" font-size="10" fill="#27500A">Employer-only audit access</text>
    <text x="715" y="330" text-anchor="middle" font-size="10" fill="#27500A">Encrypted payslip records</text>

    <text x="715" y="380" text-anchor="middle" font-size="10" fill="#3B6D11">cofhe-contracts ^0.1.3</text>

    <!-- ═══ ARROW Host Chain → FHE Layer ═══ -->
    <line x1="420" y1="414" x2="420" y2="460" stroke="#534AB7" stroke-width="1.5" marker-end="url(#arr)"/>
    <text x="420" y="443" text-anchor="middle" font-size="10" fill="#534AB7">FHE operations + ciphertext</text>

    <!-- ═══ FHE LAYER ═══ -->
    <rect x="30" y="462" width="800" height="270" rx="12" fill="#E6F1FB" stroke="#378ADD" stroke-width="0.8"/>
    <text x="430" y="486" text-anchor="middle" font-size="14" font-weight="600" fill="#042C53">FHE Layer — CoFHE · Fhenix Threshold Network</text>
    <text x="430" y="501" text-anchor="middle" font-size="11" fill="#0C447C">All encrypted payroll computations processed here · PreOS decrypts to permitted recipients only</text>

    <!-- CoFHE nodes -->
    <rect x="50" y="516" width="140" height="56" rx="8" fill="#B5D4F4" stroke="#378ADD" stroke-width="0.5"/>
    <text x="120" y="538" text-anchor="middle" font-size="12" font-weight="600" fill="#042C53">Verifier</text>
    <text x="120" y="553" text-anchor="middle" font-size="10" fill="#0C447C">Validates FHE inputs</text>
    <text x="120" y="565" text-anchor="middle" font-size="10" fill="#0C447C">from contracts</text>

    <rect x="222" y="516" width="140" height="56" rx="8" fill="#B5D4F4" stroke="#378ADD" stroke-width="0.5"/>
    <text x="292" y="538" text-anchor="middle" font-size="12" font-weight="600" fill="#042C53">Coordinator</text>
    <text x="292" y="553" text-anchor="middle" font-size="10" fill="#0C447C">Orchestrates compute</text>
    <text x="292" y="565" text-anchor="middle" font-size="10" fill="#0C447C">across nodes</text>

    <rect x="394" y="516" width="140" height="56" rx="8" fill="#B5D4F4" stroke="#378ADD" stroke-width="0.5"/>
    <text x="464" y="538" text-anchor="middle" font-size="12" font-weight="600" fill="#042C53">Preprocessor</text>
    <text x="464" y="553" text-anchor="middle" font-size="10" fill="#0C447C">Prepares encrypted</text>
    <text x="464" y="565" text-anchor="middle" font-size="10" fill="#0C447C">ciphertext batches</text>

    <rect x="566" y="516" width="140" height="56" rx="8" fill="#B5D4F4" stroke="#378ADD" stroke-width="0.5"/>
    <text x="636" y="538" text-anchor="middle" font-size="12" font-weight="600" fill="#042C53">Dispatcher</text>
    <text x="636" y="553" text-anchor="middle" font-size="10" fill="#0C447C">Routes results to</text>
    <text x="636" y="565" text-anchor="middle" font-size="10" fill="#0C447C">correct contracts</text>

    <!-- Arrows between CoFHE nodes -->
    <line x1="190" y1="544" x2="222" y2="544" stroke="#185FA5" stroke-width="1.2" marker-end="url(#arr)"/>
    <line x1="362" y1="544" x2="394" y2="544" stroke="#185FA5" stroke-width="1.2" marker-end="url(#arr)"/>
    <line x1="534" y1="544" x2="566" y2="544" stroke="#185FA5" stroke-width="1.2" marker-end="url(#arr)"/>

    <!-- Threshold Network -->
    <rect x="120" y="596" width="560" height="56" rx="10" fill="#85B7EB" stroke="#378ADD" stroke-width="0.8"/>
    <text x="400" y="620" text-anchor="middle" font-size="13" font-weight="600" fill="#042C53">Threshold Network</text>
    <text x="400" y="638" text-anchor="middle" font-size="11" fill="#0C447C">PreOS: decrypts to permitted contractor addresses only · FHE.allowThis() + FHE.allow() required</text>

    <!-- Arrows nodes → threshold -->
    <line x1="292" y1="572" x2="292" y2="595" stroke="#185FA5" stroke-width="1" marker-end="url(#arr)"/>
    <line x1="464" y1="572" x2="464" y2="595" stroke="#185FA5" stroke-width="1" marker-end="url(#arr)"/>

    <!-- Privara payout bar -->
    <rect x="120" y="672" width="560" height="44" rx="8" fill="#C0DD97" stroke="#639922" stroke-width="0.8"/>
    <text x="400" y="692" text-anchor="middle" font-size="12" font-weight="600" fill="#173404">Privara SDK (@reineira-os/sdk) — Stablecoin Disbursement</text>
    <text x="400" y="708" text-anchor="middle" font-size="10" fill="#27500A">USDC payout released from PayShieldEscrow.sol → contractor wallet · ReineiraOS 0.1</text>

    <!-- Arrow threshold → privara -->
    <line x1="400" y1="652" x2="400" y2="671" stroke="#1D9E75" stroke-width="1.2" marker-end="url(#arr)"/>

    <!-- ═══ LEGEND ═══ -->
    <rect x="30" y="738" width="12" height="12" rx="3" fill="#C0DD97" stroke="#639922" stroke-width="0.5"/>
    <text x="48" y="749" font-size="11" fill="#3B6D11">FHE Operations</text>
    <rect x="160" y="738" width="12" height="12" rx="3" fill="#AFA9EC" stroke="#7F77DD" stroke-width="0.5"/>
    <text x="178" y="749" font-size="11" fill="#534AB7">Payroll Contracts</text>
    <rect x="300" y="738" width="12" height="12" rx="3" fill="#B5D4F4" stroke="#378ADD" stroke-width="0.5"/>
    <text x="318" y="749" font-size="11" fill="#185FA5">CoFHE Layer</text>
    <rect x="420" y="738" width="12" height="12" rx="3" fill="#B5D4F4" stroke="#378ADD" stroke-width="0.5"/>
    <text x="438" y="749" font-size="11" fill="#185FA5">Application</text>
    <text x="680" y="749" text-anchor="end" font-size="10" fill="#9c9a90">PayShield · Akindo Buildathon 2025</text>
  </svg>

  <div class="legend">
    <div class="legend-item"><div class="dot" style="background:#C0DD97;border:1px solid #639922"></div>FHE Operations</div>
    <div class="legend-item"><div class="dot" style="background:#AFA9EC;border:1px solid #7F77DD"></div>Payroll Contracts</div>
    <div class="legend-item"><div class="dot" style="background:#B5D4F4;border:1px solid #378ADD"></div>CoFHE Layer</div>
    <div class="legend-item"><div class="dot" style="background:#B5D4F4;border:1px solid #378ADD"></div>Application</div>
  </div>
</div>
</body>
</html>