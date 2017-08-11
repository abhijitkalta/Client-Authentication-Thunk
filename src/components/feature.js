import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMessage } from '../actions/index';


class Feature extends Component{
  componentWillMount(){
    this.props.fetchMessage();
  };

  render(){
    return(
      <div>
        <h2>Feature</h2>
        <h5>{this.props.message}</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras orci neque, finibus ut odio at, ullamcorper interdum ante. Phasellus vestibulum, arcu et tempus dignissim, tortor nulla varius velit, eu tempor risus est sit amet nunc. Mauris a orci at justo pulvinar tincidunt. Sed sodales mi ut erat feugiat eleifend. Vivamus bibendum posuere lobortis. Nullam elementum enim ac turpis tristique vulputate. Vestibulum tortor tortor, placerat in velit sed, pharetra bibendum enim. Maecenas venenatis quam ac est euismod cursus. Etiam orci velit, consectetur in semper bibendum, molestie vitae risus.
        </p>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchMessage
  }, dispatch);
};

function mapStateToProps(state){
  return {
    message: state.auth.message
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feature);
