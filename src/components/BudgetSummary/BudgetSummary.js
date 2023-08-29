import React, { useContext } from 'react'
import classes from './BudgetSummary.module.css';
import BudgetContext from '../../store/budget-context';

const BudgetSummary = () => {

    const ctx = useContext(BudgetContext);

    const date = new Date().toLocaleString('en-us', { month: 'long', year: 'numeric' });

    const getBudgetTotalTemplate = () => {
        if (ctx.budgetTotal > 0) {
            return (<h1 className={classes.green}>+{ctx.budgetTotal}</h1>)
        }
        if (ctx.budgetTotal < 0) {
            return (<h1 className={classes.red}>{ctx.budgetTotal}</h1>)
        }
        return (<h1>{ctx.budgetTotal}</h1>)
    }

    return (
        <div className={classes['budget-summary']}>

            <p>Available budget in <b>{date}</b></p>

            {getBudgetTotalTemplate()}


            <div className={classes['slab-content']}>
                <div className={`${classes.slab} ${classes.income}`}>
                    <span>Income</span>
                    <span>+{ctx.incomeTotal}</span>
                </div>

                <div className={`${classes.slab} ${classes.expense}`}>
                    <span>Expenses</span>
                    <span>-{ctx.expenseTotal}</span>
                </div>
            </div>
        </div>
    )
}

export default BudgetSummary