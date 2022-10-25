import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

function NewExpense(props) {
    const [isEditing,setIsEditing] = useState(false);
    function expenseHandler(expenseData) {
        const dataToStore = {
            ...expenseData,
            id: Math.random().toString()
        };
        // console.log(dataToStore);
        props.onAddExpense(dataToStore);
        localStorage.setItem(""+id, JSON.stringify(dataToStore));
        setIsEditing(false);
    };
    function addExpenseHandler(event){
        setIsEditing(true);
    }
    function stopEditing(){
        setIsEditing(false);
    }

    return <div className="new-expense">
        {!isEditing && <button onClick={addExpenseHandler}>Add New Expense</button>}
        {isEditing && <ExpenseForm onSaveExpenseData={expenseHandler} onCancel={stopEditing} />}
    </div>
}

export default NewExpense;