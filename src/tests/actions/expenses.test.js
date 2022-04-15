import { addExpense, removeExpense, editExpense } from '../../actions/expenses'
test('have all the same properties', () => {
  const action = removeExpense({ id: '123abc456' })
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc456',
  }) 
})
