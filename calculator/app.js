const myCalc = require('./calculator');

try{
    console.log(myCalc.divideTwoNumbers(1,2));
} catch(e){
    console.log(e);
}
try{
    console.log(myCalc.divideTwoNumbers());
}catch(e){
    console.log(e)


try{
    console.log(myCalc.divideTwoNumbers('Patruck', 'Aiden'));
} catch(e){
    console.log(e);
    }
}    
 

