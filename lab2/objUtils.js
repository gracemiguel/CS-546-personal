function input_exists(x){
    if(typeof(x)=== 'undefined'){
        throw 'No input'
    }
}

function isProperNumber(num, variableName){
    if(typeof num !== 'number'){
        throw `${variableName || 'provided variable'} is not a number`
    }   
    if(isNaN(num)){
        throw `${variableName ||'provided variable'} is not a number`
    }
}
function isArrayOfObjects(arr, variableName){
    if( !Array.isArray(arr)){
        throw `${variableName || 'The given variable'} is not an array`
    }
    for(let x of arr){
        if(typeof(x) != 'object'){
            throw `${variableName || 'The given parameter'} is not an Array of objects`
        }
    }
}

function isObject(obj, variableName){
    if(typeof obj != 'object'){
        throw `${variableName || 'Given parameter'} is not an object`
    }
}

function isFunction(func, variableName){
    if(typeof func != 'function'){
        throw `${variableName || 'Given parameter'} is not a function`
    }
}

module.exports = {
    description: 'methods useful for objects.', 
    makeArray: (objects) =>{
        input_exists(objects)
        isArrayOfObjects(objects)
        let final_arr = new Set()
        for(let x of objects){
            let arr = []
           for(let property in x){
                arr[0] = property
                arr[1] = x[property]
            }
            
            final_arr.add(arr)
            
        }
        final_arr = Array.from(final_arr)
        return final_arr
    }, 

    computeObject(object, func){
        input_exists(object)
        input_exists(func)
        isObject(object, 'object')
        isFunction(func, 'func')
        if(Object.keys(object) == 0){
            throw 'Object is empty'
        }
        let new_obj = {}
        for(let property in object){
            isProperNumber(object[property])
            let x = func(object[property])
            new_obj[property] = x
        }
        return new_obj
    },

    isDeepEquals(obj1, obj2){
        input_exists(obj1)
        input_exists(obj2)
        isObject(obj1)
        isObject(obj2)
        obj1_keys = Object.keys(obj1)
        obj2_keys = Object.keys(obj2)
        if(obj1_keys.length != obj2_keys.length){
            return false
        }
        obj1_values = Object.values(obj1)
        obj2_values = Object.values(obj2)
        for(i=0; i<obj1_keys.length; i++){
            for(k=0; k<obj2_keys.length-1; k++){
                if(obj1_keys[i] === obj2_keys[k]){  
                    if(obj1_values[i] !== obj2_values[k]){
                        return false
                        
                    }
                    else if(k === obj2_keys.length-1){
                        return false
                    }
                    else{
                        continue
                    }
                }  
            }
        }
        return true
    }
}