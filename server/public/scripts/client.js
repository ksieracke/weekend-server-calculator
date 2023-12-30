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
            fetchCurrentResult();
        }
        )
}

function fetchCurrentResult(){
    axios.get('/calculations')
        .then(response => {
            const calculations=response.data;
            const currentResultSection = document.querySelector('#currentResultArea')
            const lastCalculation=calculations[calculations.length-1];
            currentResultSection.innerHTML=`<h3>${lastCalculation.result}</h3>`
        })
        .catch(error =>{
            console.error('Error fetching last result', error)
        })
}

function fetchCalculations(){
    axios.get('/calculations')
        .then(response => {
            const calculations = response.data;
            renderHistory(calculations);
        })
        .catch(error =>{
            console.log('Error fetching calculations', error);
        })
}

function renderHistory(calcHistory){
    const calcHistoryList= document.querySelector('#calcHistoryList')
    for(let calc of calcHistory){
    calcHistoryList.innerHTML+=`<li>
        ${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}
        </li>  `;
}
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