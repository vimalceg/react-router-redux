import { URL_CHANGE, URL_CHANGE_BLOCK, URL_CHANGE_UNBLOCK } from './constants';

const historyAction = (action)=>  (location) =>{
	console.log("location",location)
	return {
	  	type:URL_CHANGE,
	  	data:{
	  		location:Object.assign({},location,{action:action})
	  	}
  	}
}

export const push = historyAction('push')
export const replace = historyAction('replace')
//export const go = historyAction('go') //not check
//export const goBack = historyAction('goBack') //not check
//export const goForward = historyAction('goForward') //not check
export const block = (msg=null)=>({type:URL_CHANGE_BLOCK,data:{msg:msg}});
export const unblock = () =>({type:URL_CHANGE_UNBLOCK});
export const routerActions = { push, replace, block, unblock /*, go, goBack, goForward*/ }
