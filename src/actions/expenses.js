import { v4 as uuidv4 } from 'uuid'

//ADD_EXPENSE
const addExpense = ({
  id = uuidv4(),
  description = '',
  note = '',
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id,
    description,
    note,
    amount,
    createdAt,
  },
})
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

export { addExpense, removeExpense, editExpense }
