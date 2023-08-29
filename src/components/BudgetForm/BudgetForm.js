import React, { useContext, useState } from 'react'
import classes from './BudgetForm.module.css';
import BudgetContext from '../../store/budget-context';

const BudgetForm = () => {

    const generateRandom = (maxLimit = 100) => {
        let rand = Math.random() * maxLimit;
        rand = Math.floor(rand);
        return rand;
    }

    const initTransaction = {
        id: generateRandom(),
        transactionType: 'income',
        title: '',
        amount: ''
    }

    const [transaction, setTransaction] = useState(initTransaction);

    const ctx = useContext(BudgetContext);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!transaction.title ||
            !transaction.amount ||
            (!transaction.title && transaction.amount === 0) ||
            (transaction.title && transaction.amount === 0)) {
            return;
        }

        ctx.addTransaction(transaction);
        setTransaction(initTransaction);
    }



    const onChangeHandler = (event) => {
        setTransaction(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <div className={classes['form-content']}>
            <form onSubmit={submitHandler}>
                <div className={classes['form-container']}>
                    <div>
                        <select name="transactionType" onChange={onChangeHandler} value={transaction.transactionType}>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div>
                        <input onChange={onChangeHandler} value={transaction.title} type="text" name="title" placeholder="Title" />
                    </div>
                    <div>
                        <input onChange={onChangeHandler} value={transaction.amount} type="number" placeholder="Amount" name="amount" />
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default BudgetForm