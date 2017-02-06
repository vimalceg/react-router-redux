/*
	routing:{
		location:{
		  pathname:,
		  state,
		  query,
		},
		urls:{
		  entity:{
		    "url1":{
		      name:
		      pattern:
		      match:
		      tokens:
		    }
		  },
		  order:["url1",..],
		},
		currentParams:{
		  
		}
	}
*/
import { normalize } from 'simple-normalizr';
import { MATCH, EXACT_MATCH, NOT_MATCH, URL_CHANGE } from './constants';
import { urlsSchema, initialStateWithTokens, matchPattern } from './utils'


export const routing=(urls)=>{
  var urlNormalizer = normalize(urls, urlsSchema)
  var urls = initialStateWithTokens(urlNormalizer.entities.urls);
  var order = urlNormalizer.result;
  var initialState={
    urls,
    order,
    location
  };
  return (state = initialState, action)=>{
    var currentParams;
    switch(action.type){
      case URL_CHANGE:
         return {
            urls:state.order.reduce((result, next)=>{
              var obj = matchPattern(state.urls[next].pattern,action.data.location.pathname);
              var match=NOT_MATCH;
              if(obj){
                currentParams=obj;
                if(obj.remainingPathname == ""){
                  match=EXACT_MATCH;
                }
                else{
                  match=MATCH;
                }
              }
              result[next] = url(state.urls[next],action,match);
             return result;
         },{}),
            order:state.order,
            paramMap:currentParams && currentParams.paramMap || {},
            location:location(state.location,action),//old location and new location are diff deep compare
        }
    }
    return state;
  }
}

var url=(state={},action,matchType)=>{
    return Object.assign({},state,{match:matchType})
}
var location = (state={},action) => {
  if(action.type == URL_CHANGE){
    return action.data.location;
  }
  return state;
}
