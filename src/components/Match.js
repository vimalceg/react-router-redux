import React from 'react';
import { connect } from 'react-redux';
import { replace } from '../actions'
export class Match extends React.Component{
  render(){
    var { children, isMatch, isAuthenticate } = this.props;
    return isMatch && isAuthenticate && React.Children.only(children) || null;
  }
  componentDidMount() {
    
    if(!this.props.isAuthenticate && this.props.isMatch){
       this.props.replace(this.props.redirect)
       
    }
  }
  componentDidUpdate(prevProps, prevState) {
    
    if(!this.props.isAuthenticate && this.props.isMatch){
      this.props.replace(this.props.redirect)
    }
  }
}

Match = connect((state,props)=>{
   var url =state.routing.urls[props.name];
   if(url)
  return {
    isMatch:  (props.isExactly && url.match == 2) || (!props.isExactly && url.match),
    isAuthenticate: props.checkAuthenticate? props.checkAuthenticate(state) : true
  }
  return {
  	isMatch:0
  }
},{replace})(Match)

Match.defaultProps={
	isExactly:false
}