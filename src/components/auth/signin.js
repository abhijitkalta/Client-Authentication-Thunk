import React, {Component, PropTypes} from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { signInUser } from '../../actions/index';

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

class SignIn extends Component {
  constructor(props){
    super(props);
    this.renderAlert = this.renderAlert.bind(this);
  };

  //inorder to navigate without the link tag, we need access to router which is available through the context property
  static contextTypes = {
    router: PropTypes.object  //access it from the parent component i.e - index.js
  };

  handleFormSubmit(formProps) {
    this.props.signInUser(formProps);
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
        onSubmit= { handleSubmit(this.handleFormSubmit.bind(this)) }
        className="col-md-6 col-md-offset-4">
        <h3> Sign In </h3>
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
      {this.renderAlert()}
      <div>
        <RaisedButton
          label="Submit"
          primary={true}
          type="submit"
          disabled={pristine || submitting}
          style={{marginTop:12}}
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
    'password'
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
  }
  return errors
}

function mapStateToProps(state){
  return {
    errorMessage: state.auth.error
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    signInUser
  }, dispatch);
};

const signInForm = reduxForm({
  form: 'SignInForm',
  validate
})(SignIn);


export default connect(mapStateToProps, mapDispatchToProps)(signInForm);
