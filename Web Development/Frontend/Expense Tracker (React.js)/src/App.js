import { useState } from "react";
import Expenses from "../src/components/Expenses/Expenses.js";
import NewExpense from "./components/NewExpense/NewExpense.js";

const DUMMY_EXPENSES = [
  {
      id: 'e1',
      title: 'Toilet Paper',
      amount: 94.12,
      d: new Date(2020, 7, 14),
  },
  {
      id: 'e2',
      title: 'New TV',
      amount: 799.49,
      d: new Date(2021, 2, 12)
  },
  {
      id: 'e3',
      title: 'Car Insurance',
      amount: 294.67,
      d: new Date(2021, 2, 28),
  },
  {
      id: 'e4',
      title: 'New Desk (Wooden)',
      amount: 450,
      d: new Date(2021, 5, 12),
  }
];


function App() {


  const [newExpenseArray,setNewExpenseArray] = useState(DUMMY_EXPENSES);

  function addExpenseHandler(expenses){
    setNewExpenseArray((prevExpenses)=>{
      return [expenses,...prevExpenses];
    });

  }
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler}/>
      <Expenses items={newExpenseArray}/>
    </div>
  );
}

export default App;
