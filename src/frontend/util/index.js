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
  }
}