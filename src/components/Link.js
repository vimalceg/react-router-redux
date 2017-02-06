import React from 'react';
import { connect } from 'react-redux';

import { push, replace } from '../actions'

export class Link extends React.Component{
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e){
    var { push, replace, action,pathname,state,query } = this.props;
    if(!this.props.isReload){
      e.preventDefault();
       if(action == "PUSH"){
        this.props.push({
          pathname:pathname,
          state,
          query,
        })
      }else if(action == "REPLACE"){
        replace({
          pathname:pathname,
          state,
          query
        })
      }
    }
    //var {name,params,query,state,action} = this.props;
    //this.context.action(name,params,query,state,action)
  }

  render(){
    var { children,href,isActive,isReload=false } = this.props;
     
    return <a href={href} onClick={this.onClick} className={isActive?"active":""}>{children}</a>
  }

}
Link.defaultProps= {
  isReload:false,
  action:"PUSH"
}

Link.contextTypes={
  action:React.PropTypes.func
}
Link = connect((state,props)=>{
  var { paramMap,urls,location } = state.routing;
  var url=urls[props.name];
  var tokens=url.tokens;
  var href=tokens.reduce((result,next)=>{
    if(!next.startsWith(":"))
    result+=next;
    else{
      var key=next.substring(1);
      result+=props.params && props.params[key] || paramMap[key];
    }
    return result;
  },"")
  function jsonToQueryString(json) {
    return '?' + 
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
  }
  var qStr=jsonToQueryString(props.query || {})
  return {
    pathname:href,
    href:href+qStr,
    isActive:href == location.pathname
  }
},{push,replace})(Link)

