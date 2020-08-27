export default {
  roundToPlaces: (num, places) => {
    if(places === 0) {
      return Math.floor(num)
    }
    let temp = num * Math.pow(10, places)
    temp = Math.floor(temp)
    let result = (temp / Math.pow(10, places)).toString().split('.')
    if(result.length === 1) {
      result.push('')
    }
    while(result[1].length < places) {
      result[1] += '0'
    }
    
    return result.join('.')
  },
  jitter: (value, amount) => {
    let jitter = value * amount * 2
    jitter = Math.random() * jitter
    jitter -= jitter / 2
  
    return value + jitter
  },
  degToRad: (deg) => {
    return deg * (Math.PI / 180)
  },
  parseSearch: (search) => {
    return search.slice(1).split('&').reduce((memo, keyPair) => {
      const [key, value] = keyPair.split('=')
      if(memo[key] === undefined) {
        memo[key] = value
      } else {
        if(!Array.isArray(memo[key])) {
          memo[key] = [memo[key]]
        }
        memo[key].push(value)
      }
      return memo
    }, {})
  },
  qs: (params) => {
    return Object.keys(params).map((key) => {
      return [key, encodeURIComponent(params[key])].join('=')
    }).join('&')
  }
}