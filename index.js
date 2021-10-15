// first lets get the value of the input
let bill = document.getElementById("bill-input");
let billValue = 0.0 //by default
bill.addEventListener("input", handleBillValue); //we listen for inputs on our input

// *********************we build our callback here***********************************************
function handleBillValue(){
    
    if(bill.value.includes(",")){  //since we set input type="number" we dont really need a lot of veryfication
        replace(",", ".")
    }
    
    if(bill.value < 0){
        bill.value = Math.abs(bill.value);
        billValue = bill.value;
    }else{
        billValue = bill.value;
    }
    console.log(billValue);
    handleOutputs();
}


// ****************************************Now lets handle our tip section*****************************************

let tipValue = 0.15; //it defaults to 15%

var tipBtn = document.querySelectorAll(".tipButtons");

// we loop through the array and addEventListerners
tipBtn.forEach(tipButtons=>{
    tipButtons.addEventListener("click", handleTipClick); 
 });

 function handleTipClick(event){
     tipBtn.forEach(tipButtons=>{
        //  we clear all active states once any button is clicked
         tipButtons.classList.remove("tip-button-click");

        
        if(event.target.innerHTML === tipButtons.innerHTML){
            tipButtons.classList.add("tip-button-click");
        }
    })
    // a click on buttons should wipe the custom input value and reset to Custom.................
    customInput.value = null;   //resets it back to default when placeholder was zero

    // also we want a click on any of the buttons to give a value of 1 to no of people so....
    if(peopleInput.value == 0){
        peopleInput.value = 1;
    }else{}  //we do nothing....

    // then we remove the peopleInput red color aslo the error message dissappers............
    document.querySelector(".people .people-input-div input").classList.remove("input-error");
    document.querySelector(".no-of-peolpe .error-message").classList.remove("error-message-visible");
    //  we determine which button gets the active state
    // this will only be true when we get to the element that the click event occured

    tipValue = parseFloat(event.target.innerHTML) / 100;  //in this case the parseFloat() is useful to remove the % signs
        console.log(tipValue);
        handleOutputs();
 }

//  **********************Now we handle the custom input*********************************

var customInput = document.getElementById("tip");
customInput.addEventListener("input", handleCustomInput);

function handleCustomInput(){
    // once we input somthing we remove all active states
    if(customInput.value != 0){
        tipBtn.forEach(tipButtons=>{
            tipButtons.classList.remove("tip-button-click");
        })
        // we handle the fact that we may have negative inputs and we desire absolute values
        if(customInput.value < 0){
            customInput.value =  Math.abs(customInput.value);
            tipValue = customInput.value / 100;
        }else{
            tipValue = customInput.value / 100;
        }
        
        if(peopleInput.value == 0){
            peopleInput.value = 1;  //adds a value of 1 to our no of person.........
        }else{}  //we do nothing....
    }else if(customInput.value == 0){
        // we clear all active states....
        tipBtn.forEach(tipButtons=>{
            tipButtons.classList.remove("tip-button-click")
        })
        
        // we bring back active to 15% since we have no valid input 
        document.querySelector(".tip-button-div div:nth-child(3) Button").classList.add("tip-button-click");
        tipValue = 0.15;
    }
    
    handleOutputs();
    console.log(tipValue);
}

//*************************** */ Now lets tackle no of people section********************************

let peopleValue = 1; // decided not to use a set default value

let peopleInput = document.getElementById("people");
peopleInput.addEventListener("click", ()=>{
    if(peopleInput.value == 0){
        peopleInput.value = 1;
    }else{} //we do nothing

    // these two lines handles the case where red color has to be removed from input border as well as error message
    // when we click on the input
    peopleInput.classList.remove("input-error");
    document.querySelector(".no-of-peolpe .error-message").classList.remove("error-message-visible");
    console.log(peopleInput.value);
    handleOutputs();
})

// now we listen for inputs.....................
peopleInput.addEventListener("input", handleNoOfPeople);

function handleNoOfPeople(){
    if(peopleInput.value == 0){
        document.querySelector(".people .people-input-div input").classList.add("input-error");
        document.querySelector(".no-of-peolpe .error-message").classList.add("error-message-visible");
    }else if(peopleInput.value != 0){
        document.querySelector(".people .people-input-div input").classList.remove("input-error");
        document.querySelector(".no-of-peolpe .error-message").classList.remove("error-message-visible");
    }

    // this handles the fact that we can't have a float no of people
    if(peopleInput.value % 1 != 0){
        peopleInput.value = Math.floor(peopleInput.value);
        if(peopleInput.value >= 1){
            // we remove our error classes incase..............
            document.querySelector(".people .people-input-div input").classList.remove("input-error");
            document.querySelector(".no-of-peolpe .error-message").classList.remove("error-message-visible");
        }else{
            // we add our error classes............
            document.querySelector(".people .people-input-div input").classList.add("input-error");
        document.querySelector(".no-of-peolpe .error-message").classList.add("error-message-visible");
        }
    }
    // we handle the -ve input issue..........

    if(peopleInput.value < 0){
        peopleInput.value = Math.abs(peopleInput.value);
    }
    
    console.log(peopleInput.value);
    handleOutputs();
}

//............................ now lets handle the outputs.................................



function handleOutputs(){
    
    // declare variables outside the for loop for global use inside the function else you have to definne them inside 
    // the individual loops which isn't so condusive
    var outputResults = document.querySelectorAll(".output-span");
    let tipAmount = (tipValue * billValue) / peopleInput.value;
    let tipTotal = (billValue * tipValue) + billValue / peopleInput.value;
    if(peopleInput.value !=0){
        outputResults[1].innerHTML = "$" + tipTotal.toFixed(2);
        outputResults[0].innerHTML = "$" + tipAmount.toFixed(2);    
    }else{
        // document.querySelectorAll(".output-span")[0].innerHTML = "Infinit"
        outputResults[0].innerHTML = "Infinit";
        outputResults[1].innerHTML = "Infinit";
    }
    // debugging uptions:
    // console.log("this is billvalue " + billValue);
    // console.log("this is tipvalue " + tipValue);
    // console.log("this is tipamount " + tipAmount);
    // console.log("this is tiptotal " + tipTotal);
    // console.log("this is tipvalue * billvalue " + (tipValue * billValue));
}

// Now lets handel the reset button..........................

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", reset);

function reset(){
    bill.value = null; //resets bills input
    handleBillValue(); //this is useful because it makes sure after reset that the bill value remains at zero...
                        //else it uses the old value for the billvalue ie value before reset.....

    tipBtn[2].click();  //triggers the 15% button  "click" event listener....look at that callback to see what it does.
                        // notice tha in triggering it we also reset the custom input to null....problem solved

    peopleInput.value = null; //resets the no of people input to null.......
    
    // finally we reset our outputs
    document.querySelectorAll(".output-span")[0].innerHTML = "$0.0";
    document.querySelectorAll(".output-span")[1].innerHTML = "$0.0";
}
