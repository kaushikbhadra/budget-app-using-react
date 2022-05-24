import database, { firebase } from '../firebase/firebase'

//ADD_EXPENSE
const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
})

const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0,
    } = expenseData
    const expense = { description, note, amount, createdAt }
    const postListRef = firebase.ref(database, `users/${uid}/expenses`)
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
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const postListRef = firebase.ref(database, `users/${uid}/expenses/${id}`)
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

const startEditExpense = (id, update) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const postListRef = firebase.ref(database, `users/${uid}/expenses/${id}`)
    return firebase.update(postListRef, update).then(() => {
      dispatch(editExpense(id, update))
    })
  }
}

//SET_EXPENSES
const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses,
})
const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const postListRef = firebase.ref(database, `users/${uid}/expenses`)
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
  startEditExpense,
  setExpenses,
  startSetExpenses,
}
