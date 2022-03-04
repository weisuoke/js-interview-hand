// ES5
function unique1(arr) {
  var res = arr.filter((item, index, array) => {
    console.log(array)
    return array.indexOf(item) === index
  })
  return res
}

console.log(unique1([1, 2, 2, 3, 4, 4, 5]))

// ES6
const unique2 = arr => [...new Set(arr)];