export default (expenses) => {
  return expenses
    .map((expanse) => expanse.amount)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
}
