import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, initialize } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { signUpUser } from '../../actions/index';

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />

class SignUp extends Component{

  constructor(props){
    super(props);
    this.renderAlert = this.renderAlert.bind(this);
    this.state = {
      dataSource: [],
    };
  };

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
      ],
    });
  };

  handleFormSubmit(formProps) {
    this.props.signUpUser(formProps);
  };

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div
          className="alert alert-danger"
          role="alert"
          style={{height: 52, width: 256}}>
          {this.props.errorMessage}
        </div>
      );
    };
  };

  render(){
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return(
      <form
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        className="col-md-6 col-md-offset-4">
        <div>
          <Field
            name="email"
            component={renderTextField}
            label="Email"
            hintText="Email Field"
          />
        </div>
        <div>
          <Field
            name="password"
            component={renderTextField}
            type="password"
            hintText="Password Field"
            label="Password" />
        </div>
        <div>
          <Field
            name="passwordConfirmation"
            component={renderTextField}
            type="password"
            hintText="Password Field"
            label="Password Confirmation" />
        </div>
        {this.renderAlert()}
        <div>
          <RaisedButton
            label="Submit"
            primary={true}
            type="submit"
            disabled={pristine || submitting}
            style={{margin: 12}}
          />
          <RaisedButton
            label="Clear Value"
            secondary={true}
            type="submit"
            disabled={pristine || submitting}
            style={{margin: 12}}
            onClick={reset}
            />
        </div>
      </form>
    );
  }
};

const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'password',
    'passwordConfirmation'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  };
  if(values.password !== values.passwordConfirmation){
    errors.passwordConfirmation = 'Passwords must match'
  }
  return errors;
}

function mapStateToProps(state){
  return {
    errorMessage: state.auth.error
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    signUpUser
  }, dispatch);
};

const signUpForm = reduxForm({
  form: 'SignUpForm',
  validate
})(SignUp);

export default connect( mapStateToProps, mapDispatchToProps)(signUpForm);
