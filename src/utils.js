
import { arrayOf, schema } from 'simple-normalizr';
export const urlsSchema = arrayOf(schema("urls",{id:"name"}));
/* utility copy from react-router */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
const CompiledPatternsCache = Object.create(null)
function _compilePattern(pattern) {
  let regexpSource = ''
  const paramNames = []
  const tokens = []

  let match, lastIndex = 0, matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)/g
  while ((match = matcher.exec(pattern))) {
    if (match.index !== lastIndex) {
      tokens.push(pattern.slice(lastIndex, match.index))
      regexpSource += escapeRegExp(pattern.slice(lastIndex, match.index))
    }

    if (match[1]) {
      regexpSource += '([^/]+)'
      paramNames.push(match[1])
    } else if (match[0] === '**') {
      regexpSource += '(.*)'
      paramNames.push('splat')
    } else if (match[0] === '*') {
      regexpSource += '(.*?)'
      paramNames.push('splat')
    } else if (match[0] === '(') {
      regexpSource += '(?:'
    } else if (match[0] === ')') {
      regexpSource += ')?'
    }

    tokens.push(match[0])

    lastIndex = matcher.lastIndex
  }

  if (lastIndex !== pattern.length) {
    tokens.push(pattern.slice(lastIndex, pattern.length))
    regexpSource += escapeRegExp(pattern.slice(lastIndex, pattern.length))
  }

  return {
    pattern,
    regexpSource,
    paramNames,
    tokens
  }
}
function compilePattern(pattern) {
  if (!CompiledPatternsCache[pattern])
    CompiledPatternsCache[pattern] = _compilePattern(pattern)

  return CompiledPatternsCache[pattern]
}
export function matchPattern(pattern, pathname) {
  // Ensure pattern starts with leading slash for consistency with pathname.
  if (pattern.charAt(0) !== '/') {
    pattern = `/${pattern}`
  }
  let { regexpSource, paramNames, tokens } = compilePattern(pattern)
  
  if (pattern.charAt(pattern.length - 1) !== '/') {
    regexpSource += '/?' // Allow optional path separator at end.
  }

  // Special-case patterns like '*' for catch-all routes.
  if (tokens[tokens.length - 1] === '*') {
    regexpSource += '$'
  }
  
  const match = pathname.match(new RegExp(`^${regexpSource}`, 'i'))
  if (match == null) {
    return null
  }

  const matchedPath = match[0]
  let remainingPathname = pathname.substr(matchedPath.length)

  if (remainingPathname) {
    // Require that the match ends at a path separator, if we didn't match
    // the full path, so any remaining pathname is a new path segment.
    if (matchedPath.charAt(matchedPath.length - 1) !== '/') {
      return null
    }

    // If there is a remaining pathname, treat the path separator as part of
    // the remaining pathname for properly continuing the match.
    remainingPathname = `/${remainingPathname}`
  }
    var paramMap={};
    match.slice(1).forEach((v,i) => paramMap[paramNames[i]] = v && decodeURIComponent(v))
  return {
    remainingPathname,
    paramMap
  }
}

export const initialStateWithTokens = (initialState)=>{
  return Object.keys(initialState).reduce((result,next)=>{
    result[next]= Object.assign({},initialState[next],
      {
        tokens:compilePattern(initialState[next].pattern).tokens
      })
    return result;
  },{})
}

export function queryStringToJSON(queryString) {
        if(queryString.indexOf('?') > -1){
          queryString = queryString.split('?')[1];
        }
        var pairs = queryString.split('&');
        var result = {};
        pairs.forEach(function(pair) {
          pair = pair.split('=');
          result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return result;
      }
