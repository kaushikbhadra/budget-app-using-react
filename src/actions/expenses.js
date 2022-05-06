import database, { firebase } from '../firebase/firebase'

let postListRef = firebase.ref(database, 'expenses')

//ADD_EXPENSE
const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
})

const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0,
    } = expenseData
    const expense = { description, note, amount, createdAt }
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

const startRemoveExpense = ({ id } = {}) => {
  return (dispatch) => {
    postListRef = firebase.ref(database, `expenses/${id}`)
    firebase
      .remove(postListRef)
      .then(() => {
        dispatch(removeExpense({ id }))
      })
      .catch((error) => {
        console.log('Error Message:' + error)
      })
  }
}

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
    return firebase.get(postListRef).then((snapshot) => {
      const expenses = []
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          })
        })

        dispatch(setExpenses(expenses))
      } else {
        console.log('No data available')
      }
    })
  }
}
export {
  addExpense,
  startAddExpense,
  removeExpense,
  startRemoveExpense,
  editExpense,
  setExpenses,
  startSetExpenses,
}
