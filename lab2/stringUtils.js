

function isString(s){
    if(typeof s != 'string'){
        throw 'This is not a string!'
    }
}
function input_exists(x){
    if(typeof(x)=== 'undefined'){
        throw 'No input'
    }
}

module.exports = {
    description: 'functions for strings',
    camelCase: (str) =>{
        input_exists(str)
        isString(str)
        if(str.length ==0){
            throw 'This is an empty string.'
        }
        else if(str.replace(" ", "").length == 0){
            throw "All spaces"
        }
        else{
            let phrase = ""
            let str_split = str.split(" ")
            for(x of str_split){
                let upper = x
                let frst_let = x[0]
            phrase+= frst_let.toUpperCase() + upper.slice(1)
            
            }
        return phrase
        }
    }, 
    replaceChar: (string) =>{
        input_exists(string)
        isString(string)
        let str= string.toLowerCase()
        let double = '*'
        for(i=1; i<string.length-1; i++){
            char = str.charAt(i)
            if(char == str.charAt(0)){
                char = double
                str = str.slice(0,i) + char + str.slice(i+1)
                if(double == "*"){
                    double = "$"
                }
                else{
                    double ="*"
                }
            }
        }
        return str
    }, 
    mashUp: (string1, string2) =>{
        input_exists(string1)
        input_exists(string2)
        isString(string1, 'string1')
        isString(string2, 'string2')
        string1 = string1.trim()
        string2 = string2.trim()
        let swap = string1.charAt(0)
        let together = ""
        string1 = string2.charAt(0) + string1.slice(1)
        string2 = swap + string2.slice(1)
        together = `${string1} ${string2}`
        return together
    }
};