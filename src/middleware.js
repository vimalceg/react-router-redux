import { URL_CHANGE } from './constants';
import { queryStringToJSON } from './utils';

export const historyMiddleware = ( history ) => ( store )=>{
  /* init dispatch*/
  store.dispatch({
    type:URL_CHANGE,
    from:"history",data:{
    	location:history.getCurrentLocation()/* only works history ^3.0.0 */
    }
  })
  var unlisten = history.listen( ( location, action) => {
      var search=location.search;
      location.query=queryStringToJSON(search);
      store.dispatch({
        type:URL_CHANGE,
        from:"history",data:{location}
      })
  })
  return ( next ) => ( action ) => {
    if(action.type==URL_CHANGE && action.from=="history"){
      return next(Object.assign(action,{from:null})) //from is a flag used for update url only via history api 
    }
    else if(action.type==URL_CHANGE){
      if(action.data.location.action=="POP"){//no idea some issue there
        history.go(-1);
      }
      else{
        history[action.data.location.action.toLowerCase()](action.data.location) 
      }
    }
    else{
      return next(action)
    }
  }
}