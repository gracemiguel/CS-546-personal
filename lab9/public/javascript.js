//I pledge my honor that I've abided by the Stevens Honor System.
let btn = document.getElementById("btn")
let myP= document.getElementById("myP")
let header = document.getElementById("header")
let myForm = document.getElementById("myForm")
let numberInput = document.getElementById('number_input');
let errorDiv = document.getElementById('error');
let results = document.getElementById('results');

function fibonacci(num){
    let nth, num1 = 0
    let num2=1
    let output = 0;
    if(num < 1){
        //numberInput.value = 0
        output = 0
    }
    else if(num ==1){
        //numberInput.value = 1
        output = 1
    }
    else{
        for(i=0; i<num-1; i++){
         nth=num1+num2
         num1 = num2
         num2=nth
        }
        //numberInput.value = num2
        output = num2
     }return output
}

if(myForm){
    myForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        if(numberInput.value.trim()){
           let li = document.createElement('li')
           li.innerHTML = `The Fibonacci of ${numberInput.value} is `
           output = fibonacci(numberInput.value)
        //    let nth, num1 = 0
        //    let num2=1
        //    let output = 0;
        //    if(numberInput.value < 1){
        //        //numberInput.value = 0
        //        output = 0
        //    }
        //    else if(numberInput.value ==1){
        //        //numberInput.value = 1
        //        output = 1
        //    }
        //    else{
        //        for(i=0; i<numberInput.value-1; i++){
        //         nth=num1+num2
        //         num1 = num2
        //         num2=nth
        //        }
        //        //numberInput.value = num2
        //        output = num2
        //     }
               li.innerHTML += output
               var x = true
               if(output ==2 || output == 3 || output==5 || output == 7){
                   x = true
               }
                   for(i=2; i< output; i++){
                        if(output %i ==0){
                            x= false
                        }
                   }
               
               if(x ==true){
                   li.className = "is-prime"
                  
               }
               if(x == false){
                   li.className = "not-prime"
                
               }
               results.appendChild(li)
               myForm.reset()
               numberInput.focus()
            }
            else{
                errorDiv.hidden = false;
                errorDiv.innerHTML = 'You must enter a value';
            }
           
 
    })
}
