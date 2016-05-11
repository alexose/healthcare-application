import React from 'react';
import { connect } from 'react-redux';

import DateInput from '../form-elements/DateInput';
import ErrorableSelect from '../form-elements/ErrorableSelect';
import ErrorableTextInput from '../form-elements/ErrorableTextInput';
import FullName from '../questions/FullName';
import MothersMaidenName from './MothersMaidenName';
import SocialSecurityNumber from '../questions/SocialSecurityNumber';
import { states } from '../../utils/options-for-select.js';
import { veteranUpdateField } from '../../actions';

/**
 * Props:
 * `isSectionComplete` - Boolean. Marks the section as completed. Provides styles for completed sections.
 * `reviewSection` - Boolean. Hides components that are only needed for ReviewAndSubmitSection.
 */
class PersonalInfoSection extends React.Component {
  render() {
    let content;

    if (this.props.isSectionComplete && this.props.reviewSection) {
      content = (<table className="review usa-table-borderless">
        <tbody>
          <tr>
            <td>Veteran Name:</td>
            <td>{this.props.data.veteranFullName.first.value} {this.props.data.veteranFullName.middle.value} {this.props.data.veteranFullName.last.value} {this.props.data.veteranFullName.suffix.value}</td>
          </tr>
          <tr>
            <td>Mother's Maiden Name:</td>
            <td>{this.props.data.mothersMaidenName.value}</td>
          </tr>
          <tr>
            <td>Social Security Number:</td>
            <td>{this.props.data.veteranSocialSecurityNumber.value}</td>
          </tr>
          <tr>
            <td>Date of Birth:</td>
            <td>{this.props.data.veteranDateOfBirth.month.value}/{this.props.data.veteranDateOfBirth.day.value}/{this.props.data.veteranDateOfBirth.year.value}</td>
          </tr>
          <tr>
            <td>Place of Birth:</td>
            <td>{this.props.data.cityOfBirth.value} {this.props.data.stateOfBirth.value}</td>
          </tr>
        </tbody>
      </table>);
    } else {
      content = (<fieldset>
        <legend>Personal Information</legend>
        <p>(<span className="hca-required-span">*</span>) Indicates a required field</p>
        <div className="input-section">
          <FullName required
              name={this.props.data.veteranFullName}
              onUserInput={(update) => {this.props.onStateChange('veteranFullName', update);}}/>
          <DateInput required
              day={this.props.data.veteranDateOfBirth.day}
              month={this.props.data.veteranDateOfBirth.month}
              year={this.props.data.veteranDateOfBirth.year}
              onValueChange={(update) => {this.props.onStateChange('veteranDateOfBirth', update);}}/>
          <SocialSecurityNumber required
              ssn={this.props.data.veteranSocialSecurityNumber}
              onValueChange={(update) => {this.props.onStateChange('veteranSocialSecurityNumber', update);}}/>
          <MothersMaidenName value={this.props.data.mothersMaidenName}
              onUserInput={(update) => {this.props.onStateChange('mothersMaidenName', update);}}/>
        </div>
        <div className="input-section">
          <h4>Place of Birth</h4>
          <ErrorableTextInput label="City"
              field={this.props.data.cityOfBirth}
              autocomplete="off"
              onValueChange={(update) => {this.props.onStateChange('cityOfBirth', update);}}/>
          <ErrorableSelect label="State"
              options={states.USA}
              autocomplete="off"
              value={this.props.data.stateOfBirth}
              onValueChange={(update) => {this.props.onStateChange('stateOfBirth', update);}}/>
        </div>
      </fieldset>);
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.veteran,
    isSectionComplete: state.uiState.sections['/veteran-information/personal-information'].complete
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onStateChange: (field, update) => {
      dispatch(veteranUpdateField(field, update));
    }
  };
}

// TODO(awong): Remove the pure: false once we start using ImmutableJS.
export default connect(mapStateToProps, mapDispatchToProps, undefined, { pure: false })(PersonalInfoSection);
export { PersonalInfoSection };
