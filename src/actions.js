import { URL_CHANGE } from './constants';

const historyAction = (action)=>  (location) =>{
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

export const routerActions = { push, replace /*, go, goBack, goForward*/ }
