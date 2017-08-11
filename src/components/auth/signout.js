import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signOutUser } from '../../actions/index';

class SignOut extends Component{
  componentWillMount(){
    this.props.signOutUser();
  };
  
  render(){
    return(
      <div> Sorry to see you go!!</div>
    );
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    signOutUser
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(SignOut);
