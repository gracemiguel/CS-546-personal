function checkIsProperNumber (val, variableName){
    if(typeof val != 'number') throw `${variableName || 'provided variable'} is not a number`;
    if(isNaN(val)) throw `${variableName || 'provided variable'} is NaN`;

    module.exports = {
        description: 'This is a calculator for CS-546',
        divideTwoNumbers: (num1, num2) =>{
            checkIsProperNumber(num1)
            checkIsProperNumber(num2)
            if(num2===0) throw 'Division by Zero!'
            return num1/ num2;
        }
         
        
    }
}