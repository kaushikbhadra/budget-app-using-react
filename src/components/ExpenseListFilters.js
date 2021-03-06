import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate,
} from '../actions/filters'
const id = uuidv4()

class ExpenseListFilters extends React.Component {
  state = {
    focused: null,
  }
  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate))
    this.props.dispatch(setEndDate(endDate))
  }
  onFocusChange = (focused) => {
    this.setState(() => ({ focused }))
  }
  render() {
    return (
      <div className='content-container'>
        <div className='input-group'>
          <div className='input-group__item'>
            <input
              className='text-input'
              type='text'
              placeholder='Search Expenses'
              value={this.props.filters.text}
              onChange={(e) => {
                this.props.dispatch(setTextFilter(e.target.value))
              }}
            />
          </div>
          <div className='input-group__item'>
            <select
              className='select'
              value={this.props.filters.sortBy}
              onChange={(e) => {
                if (e.target.value === 'date') {
                  this.props.dispatch(sortByDate())
                } else if (e.target.value === 'amount') {
                  this.props.dispatch(sortByAmount())
                }
              }}
            >
              <option value='date'>Date</option>
              <option value='amount'>Amount</option>
            </select>
          </div>
          <div className='input-group__item'>
            <DateRangePicker
              startDate={this.props.filters.startDate}
              startDateId={id}
              endDate={this.props.filters.endDate}
              endDateId={id}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.focused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  }
}

export default connect(mapStateToProps)(ExpenseListFilters)
