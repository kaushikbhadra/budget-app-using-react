import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import expenseSelector from '../selectors/expenseSelector'
import expenseSelectorTotal from '../selectors/expenses-total'

const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
  const formattedExpensesTotal = numeral(expensesTotal).format('$0,0.00')
  return (
    <div>
      <h1>
        Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}
      </h1>
    </div>
  )
}
const mapStateToProps = (state) => {
  const visibleExpense = expenseSelector(state.expenses, state.filters)
  return {
    expenseCount: visibleExpense.length,
    expensesTotal: expenseSelectorTotal(visibleExpense),
  }
}
export default connect(mapStateToProps)(ExpensesSummary)
