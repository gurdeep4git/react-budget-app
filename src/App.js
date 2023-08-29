import BudgetForm from "./components/BudgetForm/BudgetForm";
import BudgetList from "./components/BudgetList/BudgetList";
import BudgetSummary from "./components/BudgetSummary/BudgetSummary";
import BudgetProvider from "./store/BudgetProvider";
function App() {
  return (
    <BudgetProvider>
      <div className="App">
        <BudgetSummary />
        <BudgetForm />
        <BudgetList />
      </div>
    </BudgetProvider>
  );
}

export default App;
