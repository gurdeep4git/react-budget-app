import React from 'react';

const BudgetContext = React.createContext({
    transactions: [],
    incomeTotal: 0,
    expenseTotal: 0,
    budgetTotal: 0,
    addTransaction: (transaction) => { },
    deleteTransaction: (id) => { }
})

export default BudgetContext