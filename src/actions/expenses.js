import database, { firebase } from '../firebase/firebase'
//ADD_EXPENSE
const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
})

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0,
    } = expenseData
    const expense = { description, note, amount, createdAt }
    const postListRef = firebase.ref(database, 'expenses')
    firebase.push(postListRef, expense).then((ref) => {
      dispatch(
        addExpense({
          id: ref.key,
          ...expense,
        })
      )
    })
  }
}

//REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',

  id,
})

//EDIT_EXPENSE
const editExpense = (id, update) => ({
  type: 'EDIT_EXPENSE',
  id,
  update,
})

//SET_EXPENSES
const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses,
})
const startSetExpenses = () => {
  return (dispatch) => {
    const postListRef = firebase.ref(database, 'expenses')
    return firebase.get(postListRef).then((snapshot) => {
      const expenses = []
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          })
        })
        console.log(expenses)
        dispatch(setExpenses(expenses))
      } else {
        console.log('No data available')
      }
    })
  }
}
export { addExpense, removeExpense, editExpense, setExpenses, startSetExpenses }
