//I pledge my honor that I have abided by the Stevens Honor Code.
const arrayUtils = require("./arrayUtils")
const stringUtils = require("./stringUtils")
const objUtils = require("./objUtils");
try {
    const mean_test1 = arrayUtils.mean([1,2,3])//returns 2
    console.log('mean passed successfully')
    console.log(mean_test1)
} catch(e){
    console.error(e)
}

try{
    const mean_test2 = arrayUtils.mean(23)// throws arr is not an Array
        console.error('mean did not error')
} catch(e){
    console.log('mean failed successfully')
    console.log(e)
}

try{
    const medianSquared_test1 = arrayUtils.medianSquared([12,32,5,77,8,6])// returns 100
    console.log('Median Squared passed successfully')
    console.log(medianSquared_test1)
} catch(e){
    console.log('Median Squared failed')
    console.log(e)
}

try{
    const medianSquared_test2 = arrayUtils.medianSquared(['hello', 1, 2])//throws array[x] is not a number
    console.error('Median Squared did not error')
} catch(e){
    console.log('Median Squared failed successfully')
    console.log(e)
}
try{
    const maxElement_test1 = arrayUtils.maxElement([1,-45,2222,1,104, 90])//returns {'2222': 2}
    console.log('MaxElement passed successfully')
    console.log(maxElement_test1)
} catch(e){
    console.error("MaxElement failed test case")
}
try{
    const maxElement_test2 = arrayUtils.maxElement('It is too cold')// throws array is not an Array
    console.error('maxElement did not error')
} catch(e){
    console.log('MaxElement failed successfully')
    console.log(e)
}
try{
    const fill_test1 = arrayUtils.fill(3, 'let it snow')// returns ['let it snow, 'let it snow', 'let it snow']
    console.log('fill test 1 passed successfully')
    console.log(fill_test1)
} catch(e){
    console.error('fill test 1 failed test case')
}
try{
    const fill_test2 = arrayUtils.fill([12, "codebug"], "haha") //throws end is not a number
    console.error("fill test 2 did not error")
} catch(e){
    console.log('fill test 2 failed successfully')
    console.log(e)

}
try{
    const countRepeating_test1 = arrayUtils.countRepeating([12, "love", 4, 56, 12, "Love", "love"])// returns {'12': 2, love: 2}
    console.log("countRepeating test 1 passed successfully")
    console.log(countRepeating_test1)
} catch(e){
    console.error("countRepeating test 1 failed test case")
    console.error(e)
}
try{
    const countRepeating_test2 = arrayUtils.countRepeating(5849805)// throws array is not an Array
    console.error("countRepeating test 2 did not error")
    console.log(countRepeating_test2)
} catch(e){
    console.log('countRepeating test 2 failed successfully')
    console.log(e)
}
try{
    const isEqual_test1 = arrayUtils.isEqual([[10,9,8], [7,6,5], [4,3,2]], [[2,3,4], [5,7,6], [10,9,8]]) //returns true
    console.log('isEqual test 1 passed successfully')
    console.log(isEqual_test1)
} catch(e){
    console.error("isEqual test 1 failed the test case")
    console.error(e)
}
try{
    const isEqual_test2 = arrayUtils.isEqual([true, false, false], [true, true]) //throws Array 1 and Array 2 do not have the same length
    console.error('isEqual test 2 did not error')
} catch(e){
    console.log('isEqual test 2 failed successfully')
    console.log(e)
}
try{
    const camelCase_test1 = stringUtils.camelCase("Hello how are you?") // returns HellowHowAreYou?
        console.log('CamelCase test 1 is successful')
        console.log(camelCase_test1)

    }catch(e){
        console.error(e)
        console.error('CamelCase failed test 1')
    }
try{
    const camelCase_test2 = stringUtils.camelCase([1,24])// throws This is not a string!
    console.error('camelCase test 2 did not error')
    console.log(camelCase_test2)
}catch(e){
    console.log("Camel Case 2 successfully failed")
    console.log(e)
}
try{
    const replaceChar_test1 = stringUtils.replaceChar("mommy")// returns mo*$y
    console.log('replaceChar test 1 is successful')
    console.log(replaceChar_test1)
}catch(e){
    console.error("replaceChar test 1 failed")
    console.error(e)
}
try{
    const replaceChar_test2 = stringUtils.replaceChar(456)// throws This is not a string!
    console.error("replaceChar_test2 did not error")
}catch(e){
    console.log('replaceChar_test2 failed successfully')
    console.log(e)
}
try{
    const mashUp_test1 = stringUtils.mashUp('  Good', 'Morning')// returns Mood Gorning
    console.log('mashUp test 1 passed successfully' )
    console.log(mashUp_test1)
} catch(e){
    console.error('mashUp test 1 failed')
}
try{
    const mashUp_test2 = stringUtils.mashUp(54, 'hello')//throws This is not a string!
    console.error('mashUp test 2 did not error')
}catch(e){
    console.log("mashUp test 2 failed successfully")
    console.log(e)
}

let obj1 = {
    cat : 4
}
let obj2 = {
    dog: 1
}
let objects = [obj1, obj2]
try{
    const makeArray_test1 = objUtils.makeArray(objects)// returns [ ['cat', 4], ['dog, 1] ]
    console.log('makeArray passed successfully')
    console.log(makeArray_test1)
}catch(e){
    console.error('makeArray failed test 1')
    console.error(e)
}
try{
    const makeArray_test2 = objUtils.makeArray([1,2,3])// throws The given parameter is not an Array of Objects
    console.error('makeArray test 2 did not error')
}catch(e){
    console.log('makeArray test 2 failed successfully')
    console.error(e)

}
try{
    const computeObject_test1 = objUtils.computeObject({a:1, b:2, c:3}, n=>n*2) // returns {a:2, b: 4, c:6}
    console.log('computeObject test 1 ran successfully')
    console.log(computeObject_test1)
}catch(e){
    console.error("computeObject test 1 failed")
    console.error(e)
}
try{
    const computeObject_test2 = objUtils.computeObject({a:1, b: "This is not a number", c:5}, n=>n+1)//Throws provided variable is not a number
    console.error("computeObject test 2 did not error")
}catch(e){
    console.log("computeObject test 2 failed successfully")
    console.log(e)
}
let object1 = {
    apple: 1, banana: 4, blueberries: 20
}
let object2 = {
    banana: 4, apple: 5, blueberries: 20
}
try{
    const isDeepEquals_test1 = objUtils.isDeepEquals(object1, object2)//returns false
    console.log("isDeepEquals test 1 passed successfully")
    console.log(isDeepEquals_test1) 
}catch(e){
  
    console.error("isDeepEquals failed test 1")
    console.error(e)
}
try{
    const isDeepEquals_test2 = objUtils.isDeepEquals(object2)//Throws no input
    console.error("isDeepEquals test 2 did not error")
    console.log(isDeepEquals_test2)
}catch(e){
    console.log("isDeepEquals  test 2failed successfully")
    console.log(e) 
}
