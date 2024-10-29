export function calculateBalance(transactions,balance) {
    let income = transactions.reduce((income, transaction) => {
        if (transaction.type === "1") {
            return income + parseInt(transaction.amount);
        }
        return income;
    }, 0);
    let expense = transactions.reduce((expense, transaction) => {
        if (transaction.type === "0") {
        return expense + parseInt(transaction.amount);
        } else return expense;
    }, 0);
    balance(income,expense);
}