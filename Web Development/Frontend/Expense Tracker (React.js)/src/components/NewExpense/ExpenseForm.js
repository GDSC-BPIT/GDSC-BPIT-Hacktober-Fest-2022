import React, { useState } from "react";
import "./ExpenseForm.css";
function ExpenseForm(props) {

    const [newUserInput, setUserInput] = useState({
        title: "",
        amount: "",
        d: ""
    });


    function titleChangeHandler(event) {
        const newTitle = event.target.value;
        setUserInput((prevState) => {
            return { ...prevState, title: newTitle };
        })

    }
    function amountChangeHandler(event) {
        const newAmount = event.target.value;
        setUserInput((prevState) => {
            return { ...prevState, amount: newAmount };
        })
    }
    function dateChangeHandler(event) {
        const newDate = event.target.value;
        setUserInput((prevState) => {
            return { ...prevState, d: newDate };
        })
    }
    function formSubmitHandler(event) {
        event.preventDefault();
        // console.log(newUserInput);
        const expenseData = {
            title: newUserInput.title,
            amount: +newUserInput.amount,
            d: new Date(newUserInput.d)
        }
        // console.log(expenseData.d);
        props.onSaveExpenseData(expenseData);
        setUserInput({
            title: "",
            amount: "",
            d: ""
        });

    }

    return <form onSubmit={formSubmitHandler}>
        <div className="new-expense__controls">
            <div className="new-expense__control">
                <label>Title</label>
                <input type="text" value={newUserInput.title} onChange={titleChangeHandler} />
            </div>
            <div className="new-expense__control">
                <label>Amount</label>
                <input type="number" value={newUserInput.amount} min="0.01" step="0.01" onChange={amountChangeHandler} />
            </div>
            <div className="new-expense__control">
                <label>Date</label>
                <input type="date" value={newUserInput.d} min="2018-01-01" max="2024-12-31" onChange={dateChangeHandler} />
            </div>
        </div>
        <div className="new-expense__actions">
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button type="submit">Add Expense</button>
        </div>
    </form>
}

export default ExpenseForm;