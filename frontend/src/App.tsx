import EmployerDashboard from "./components/EmployerDashboard";
import ContractorView from "./components/ContractorView";
import PoolFunding from "./components/PoolFunding";

function App() {
  return (
    <main>
      <h1>PayShield</h1>
      <EmployerDashboard />
      <PoolFunding />
      <ContractorView />
    </main>
  );
}

export default App;
