console.log('client.js is sourced!');
let operatorsList=[]

function submitCalculation(event){
    event.preventDefault();
    let numOne=document.querySelector('#numOne');
    const operator=operatorsList[operatorsList.length-1];
    let numTwo=document.querySelector('#numTwo');
    const result=null;

    

    console.log(numOne.value);

    //put together object and push to server to do calculations and add result
    const calc={
        numOne: Number(numOne.value),
        operator: operator,
        numTwo: Number(numTwo.value),
        result: result
    }
    console.log(calc);

    axios.post('/calculations', calc)
        .then((response)=>{
            numOne.value='';
            numTwo.value='';
            fetchCalculations();
        }
        )
}


function plusPressed(event){
    event.preventDefault();
    console.log('pushedplus');
    operatorsList.push('+')
    console.log(operatorsList);
}

function minusPressed(event){
    event.preventDefault();
    operatorsList.push('-')
    console.log(operatorsList);

}

function multiplyPressed(event){
    event.preventDefault();
    operatorsList.push('*')
    console.log(operatorsList);

}

function dividePressed(event){
    event.preventDefault();
    operatorsList.push('/')
    console.log(operatorsList);

}

function clearPressed(event){
    let numOne=document.querySelector('#numOne');
    let numTwo=document.querySelector('#numTwo');
    numOne.value='';
    numTwo.value='';
}