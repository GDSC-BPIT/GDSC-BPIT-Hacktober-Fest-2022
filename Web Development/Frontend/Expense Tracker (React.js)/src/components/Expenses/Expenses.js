import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpenseChart from "./ExpensesChart";


function Expenses(props) {
    const [filterYear, setFilterYear] = useState("2018");

    function filterChangeHandler(selectedYear) {
        setFilterYear(selectedYear);
    }
    function filterExpenseByYear(item) {
        return item.d.getFullYear().toString() === filterYear;
    }
    const filteredExpenses = props.items.filter(filterExpenseByYear);
    
    return (
        <Card className="expenses">
            <ExpensesFilter selected={filterYear} onChangeFilter={filterChangeHandler} />
            <ExpenseChart expenses={filteredExpenses} />
            <ExpensesList items={filteredExpenses} />
        </Card>
    )
}

export default Expenses;