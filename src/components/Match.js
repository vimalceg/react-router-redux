import React from 'react';
import { connect } from 'react-redux';
export class Match extends React.Component{
  render(){
    var { children, isMatch } = this.props;
    return isMatch && React.Children.only(children) || null;
  }
}

Match = connect((state,props)=>{
   var url =state.routing.urls[props.name];
   if(url)
  return {
    isMatch:  (props.isExactly && url.match == 2) || (!props.isExactly && url.match)
  }
  return {
  	isMatch:0
  }
})(Match)

Match.defaultProps={
	isExactly:false
}