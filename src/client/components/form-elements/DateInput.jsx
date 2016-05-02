import React from 'react';
import _ from 'lodash';

import ErrorableSelect from '../form-elements/ErrorableSelect';
import ErrorableNumberInput from '../form-elements/ErrorableNumberInput';

import { validateIfDirtyDate, isBlank, isValidDate } from '../../utils/validations';
import { months, days } from '../../utils/options-for-select.js';

/**
 * A form input with a label that can display error messages.
 *
 * Props:
 * `required` - boolean. Render marker indicating field is required.
 * `label` - string. Label for entire question.
 * `day` - number. Value of day.
 * `month` - number. Value of month.
 * `year` - number. Value of year.
 * `onValueChange` - a function with this prototype: (newValue)
 */
class DateInput extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.id = _.uniqueId('date-input-');
  }

  handleChange(path, update) {
    const date = {
      month: this.props.month,
      day: this.props.day,
      year: this.props.year
    };

    date[path] = update;

    this.props.onValueChange(date);
  }

  render() {
    let isValid;
    let daysForSelectedMonth = [];
    const day = this.props.day;
    const month = this.props.month;
    const year = this.props.year;

    if (month) {
      daysForSelectedMonth = days[month.value];
    }

    if (this.props.required) {
      isValid = validateIfDirtyDate(day, month, year, isValidDate);
    } else {
      isValid = (isBlank(day.value) && isBlank(month.value) && isBlank(year.value)) ||
          validateIfDirtyDate(day, month, year, isValidDate);
    }

    return (
      <div>
        <label>{this.props.label ? this.props.label : 'Date of Birth'}</label>
        <span className="usa-form-hint usa-datefield-hint" id="dobHint">For example: Apr 28 1986</span>
        <div className={isValid ? undefined : 'usa-input-error'}>
          <div className="usa-date-of-birth row">
            <div className="hca-datefield-month">
              <ErrorableSelect errorMessage={isValid ? undefined : ''}
                  label="Month"
                  options={months}
                  value={this.props.month}
                  onValueChange={(update) => {this.handleChange('month', update);}}/>
            </div>
            <div className="hca-datefield-day">
              <ErrorableSelect errorMessage={isValid ? undefined : ''}
                  label="Day"
                  options={daysForSelectedMonth}
                  value={this.props.day}
                  onValueChange={(update) => {this.handleChange('day', update);}}/>
            </div>
            <div className="usa-datefield usa-form-group usa-form-group-year">
              <ErrorableNumberInput errorMessage={isValid ? undefined : ''}
                  label="Year"
                  max={new Date().getFullYear()}
                  min="1900"
                  pattern="[0-9]{4}"
                  field={this.props.year}
                  onValueChange={(update) => {this.handleChange('year', update);}}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DateInput.propTypes = {
  required: React.PropTypes.bool,
  label: React.PropTypes.string,
  day: React.PropTypes.shape({
    value: React.PropTypes.string,
    dirty: React.PropTypes.bool,
  }).isRequired,
  month: React.PropTypes.shape({
    value: React.PropTypes.string,
    dirty: React.PropTypes.bool,
  }).isRequired,
  year: React.PropTypes.shape({
    value: React.PropTypes.string,
    dirty: React.PropTypes.bool,
  }).isRequired,
  onValueChange: React.PropTypes.func.isRequired,
};

export default DateInput;