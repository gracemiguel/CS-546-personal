
function isProperNumber(num, variableName){
    if(typeof num !== 'number'){
        throw `${variableName || 'provided variable'} is not a number`
    }   
    if(isNaN(num)){
        throw `${variableName ||'provided variable'} is not a number`
    }
}
function isAnArray(arr, variableName){
    if(!Array.isArray(arr)){
        throw `${variableName || 'provided variable'} is not an Array`
    }
}
function input_exists(x){
    if(typeof(x)=== 'undefined'){
        throw 'No input'
    }
}
module.exports = {
    description: "functions for arrays",
    mean: (array) => {
        let sum =0
        let mean_val = 0
        input_exists(array)
        isAnArray(array, 'arr')
        if(array.length ===0){
            throw `${variableName || 'provided array'} is empty`
        }
        for(let x of array){
            isProperNumber(x, 'array[x]')
            sum+=x
        }
        mean_val = sum/array.length
        return mean_val; 
    },
    medianSquared: (array)=> {
        input_exists(array)
        isAnArray(array, 'array')
        if(array.length ===0){
            throw `${variableName || 'provided array'} is empty`
        }
        for(let x of array){
            isProperNumber(x, 'array[x]')
        }
        let median = 0; 
        array.sort(function(a,b){ return a-b}) 
        let middle = array.length/2
        if( array.length % 2 ==0){
            median = (array[middle] +array[middle-1])/2
        }
        else{
            median = Math.trunc(median)
            median = array[middle]
        }
        return median*median
    },
    maxElement: (array)=>{
        input_exists(array)
        isAnArray(array, 'array')
        if(array.length ===0){
            throw `${variableName || 'provided array'} is empty`
        }
        let max = array[0]
        
        for(let x of array){
            isProperNumber(x ,'array [' + x + ' ]')
            if(x > max){
                max = x
                
            }
        }
        let maxVal = {}
        maxVal[max] = array.indexOf(max) 
        return maxVal
    },

    fill: (end, value) =>{
        input_exists(end)
        isProperNumber(end, 'end')
        if(end<=0){
            throw `${end} is equal to or less than zero`
        }
        let arr = []
        if(value === undefined){
            for(i=0; i<end; i++){
                arr[i]=i
            }
        }
        else{
            for(i=0; i<end; i++){
                arr[i]=value
            }
        }
        return arr
    },
    countRepeating: (array)=>{
        input_exists(array)
        isAnArray(array, 'array')
        let var_count = {}
        if(array.length ==0){
            return var_count
        }
        for(x in array){
            if(typeof array[x] !== 'number' && typeof array[x] !== 'string' ){
                throw `array [ ${array[i]} ] is not a number or string`
            }
            if(var_count[array[x]]){
                var_count[array[x]]+=1
            }
            else{
                var_count[array[x]] = 1
            }
        }
        for(let y in var_count){
            if(var_count[y] ==1){
                delete var_count[y]
            }
        }
        return var_count
    },
    isEqual(array1, array2){
        input_exists(array1)
        input_exists(array2)
        isAnArray(array1, 'array1')
        isAnArray(array2, 'array2')
        if(array1.length != array2.length){
            throw 'Array 1 and Array 2 do not have the same length'
        }
        else if(array1.length === 0 && array2.length === 0){
            return true;
        }
        else if(typeof array1[0] !== typeof array2[0]){
            throw 'Arrays are not of the same type'
        }
        else if(typeof array1[0] === 'string' && typeof array2[0] === 'string'){
                array1.sort()
                array2.sort()
                for(i=0; i< array1.length; i++){
                    if(array1[i]!=array2[i]){
                        return false
                    }
                }
            }
        else if(typeof array1[0] === 'number' && typeof array2[0] === 'number'){
                array1.sort(function(a,b){ return a- b})
                array2.sort(function(a,b){ return a- b})
                for(k=0; k<array1.length; k++){
                    if(array1[k] != array2[k]){
                        return false;
                    }
                }
            }
        else if(typeof array1[0] === 'boolean' && typeof array2[0] === 'boolean'){
                array1.sort(function(a,b){ return (a===b)? 0 : a? -1 : 1 })
                array2.sort(function(a,b){ return (a===b)? 0 : a? -1 : 1 })
                for(m=0; m<array1.length; m++){
                    if(array1[m] !=array2[m]){
                        return false;
                    }
                }
            }
        else if(isAnArray(array1) && isAnArray(array2)){
                for(n=0; n<array1.length; n++){
                    array1[n].sort(function(a,b){return a-b})
                    array2[n].sort(function(a,b){return a-b})
                }
                for(j = 0; j<array1.length; j++){
                    if(array1[j] != array2[j]){
                        return false;
                    }
                }
        }
        else if(typeof array1[0] === 'undefined' && typeof array2[0] === 'undefined'){
            return true 
        }
        else if(typeof array1[0]=== null && typeof array2[0] === null){
            return true
        }
        else{
            return true
        }
        
    }
};



