import React, { useContext } from 'react'
import classes from './BudgetList.module.css';
import BudgetContext from '../../store/budget-context';

const BudgetList = () => {

    const ctx = useContext(BudgetContext);

    const incomeTransactions = ctx.transactions?.filter(t => t.transactionType === 'income')
    const expensesTransactions = ctx.transactions?.filter(t => t.transactionType === 'expense')

    const onDelete = (id) => {
        ctx.deleteTransaction(id);
    }

    return (
        <div className={classes['list-container']}>
            <div className={classes['list-row']}>
                <div className={classes['list-col']}>
                    <p>INCOME</p>

                    {incomeTransactions.map(t => (
                        <div key={t.id} className={classes['list-item']}>
                            <span>{t.title} - {t.amount}</span>
                            <a onClick={(e) => onDelete(t.id)} href="#">
                                <img style={{ width: '22px' }} src='./images/delete.png'></img>
                            </a>

                        </div>
                    ))
                    }

                </div>
                <div className={classes['list-col']}>
                    <p>EXPENSES</p>

                    {expensesTransactions.map(t => (
                        <div key={t.id} className={classes['list-item']}>
                            <span>{t.title} - {t.amount}</span>
                            <a onClick={(e) => onDelete(t.id)} href="#">
                                <img style={{ width: '22px' }} src='./images/delete.png'></img>
                            </a>

                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BudgetList