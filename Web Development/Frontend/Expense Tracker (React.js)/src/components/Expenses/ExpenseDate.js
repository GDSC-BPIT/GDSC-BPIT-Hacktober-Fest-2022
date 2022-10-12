import "./ExpenseDate.css";

export default function ExpenseDate(props) {
    const month = props.d.toLocaleDateString("en-IN", { month: 'long' });
    const day = props.d.toLocaleDateString("en-IN", { day: '2-digit' });
    const year = props.d.getFullYear();
    return (
        <div className="expense-date">
            <div className="expense-date__month">{month}</div>
            <div className="expense-date__day">{day}</div>
            <div className="expense-date__year">{year}</div>
        </div>
    )
}
