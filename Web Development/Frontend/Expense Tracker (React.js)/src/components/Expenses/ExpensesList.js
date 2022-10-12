import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";
function ExpensesList(props) {
    if (props.items.length === 0) {
        return <h2 className="expenses-list__fallback">No expenses found!</h2>
    }
    return <ul className="expenses-list">
        {props.items.map(expense => {
            return <ExpenseItem key={expense.id} d={expense.d} title={expense.title} amount={expense.amount} />
        })}
    </ul>
}

export default ExpensesList;