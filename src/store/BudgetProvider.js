import React, { useReducer } from 'react'
import BudgetContext from './budget-context'

const initialBudgetState = {
    transactions: [],
    incomeTotal: 0,
    expenseTotal: 0,
    budgetTotal: 0
}

const budgetReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TRANSACTION': {
            let updatedTransactions;
            let updatedIncomeTotal;
            let updatedBudgetTotal;
            let updatedExpenseTotal;

            if (action.transaction.transactionType === 'income') {
                updatedIncomeTotal = state.incomeTotal + Number(action.transaction.amount);
                updatedBudgetTotal = state.budgetTotal + Number(action.transaction.amount);
                updatedExpenseTotal = state.expenseTotal;
            } else {
                updatedExpenseTotal = state.expenseTotal + Number(action.transaction.amount);
                updatedBudgetTotal = state.budgetTotal - Number(action.transaction.amount);
                updatedIncomeTotal = state.incomeTotal;
            }

            updatedTransactions = state.transactions.concat(action.transaction)

            return {
                transactions: updatedTransactions,
                incomeTotal: updatedIncomeTotal,
                expenseTotal: updatedExpenseTotal,
                budgetTotal: updatedBudgetTotal
            }

        }

        case 'DELETE_TRANSACTION': {

            const transactionToDelete = state.transactions.find(t => t.id === action.id);

            let updatedTransactions;
            let updatedIncomeTotal;
            let updatedBudgetTotal;
            let updatedExpenseTotal;

            if (transactionToDelete.transactionType === 'income') {
                updatedIncomeTotal = state.incomeTotal - Number(transactionToDelete.amount);
                updatedBudgetTotal = state.budgetTotal - Number(transactionToDelete.amount);
                updatedExpenseTotal = state.expenseTotal;
            } else {
                updatedExpenseTotal = state.expenseTotal - Number(transactionToDelete.amount);
                updatedBudgetTotal = state.budgetTotal + Number(transactionToDelete.amount);
                updatedIncomeTotal = state.incomeTotal;
            }

            updatedTransactions = state.transactions.filter(t => t.id !== transactionToDelete.id);

            return {
                transactions: updatedTransactions,
                incomeTotal: updatedIncomeTotal,
                expenseTotal: updatedExpenseTotal,
                budgetTotal: updatedBudgetTotal
            }

        }

        default: return initialBudgetState;
    }
}


const BudgetProvider = (props) => {

    const [budgetState, dispatchAction] = useReducer(budgetReducer, initialBudgetState)

    const addTransactionHandler = (transaction) => {
        dispatchAction({ type: 'ADD_TRANSACTION', transaction: transaction })
    }

    const deleteTransactionHandler = (id) => {
        dispatchAction({ type: 'DELETE_TRANSACTION', id: id })
    }

    const budgetContext = {
        transactions: budgetState.transactions,
        incomeTotal: budgetState.incomeTotal,
        expenseTotal: budgetState.expenseTotal,
        budgetTotal: budgetState.budgetTotal,
        addTransaction: addTransactionHandler,
        deleteTransaction: deleteTransactionHandler
    }

    return (
        <BudgetContext.Provider value={budgetContext}>
            {props.children}
        </BudgetContext.Provider>
    )
}

export default BudgetProvider