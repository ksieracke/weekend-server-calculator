console.log('client.js is sourced!');
let operatorsList=[]

function submitCalculation(event){
    event.preventDefault();
    let numOne=document.querySelector('#numOne');
    const operator=operatorsList[operatorsList.length-1];
    let numTwo=document.querySelector('#numTwo');
    const result=null;
    if (isNaN(Number(numOne.value)) || isNaN(Number(numTwo.value))) {
        console.error('Invalid input. Please enter valid numbers.');
        return;
      }

    //put together object and push to server to do calculations and add result
    const calc={
        numOne: Number(numOne.value),
        operator: operator,
        numTwo: Number(numTwo.value),
        result: result
    }
    console.log(calc);

    //axios.post('/calculations', calc)
    axios({
        method: 'POST',
        url: '/calculations',
        data: calc,
    })
        .then((response)=>{
            numOne.value='';
            numTwo.value='';

            fetchCalculations();
            fetchCurrentResult();
        }
        )
        .catch((error)=>{
            console.error('could not submit calculation', error);
        });
}

function fetchCurrentResult(){
    axios({
        method:'GET',
        url: '/calculations',
    })
        .then(response => {
            const calculations=response.data;
            const currentResultSection = document.querySelector('#currentResultArea')
            const lastCalculation=calculations[calculations.length-1];
            currentResultSection.innerHTML=lastCalculation.result
        })
        .catch(error =>{
            console.error('Error fetching last result', error)
        })
}

function fetchCalculations(){
    //axios.get('/calculations')
    axios({
        method:'GET',
        url: '/calculations',
    })
        .then(response => {
            const calculations = response.data;
            console.log(calculations);
            renderHistory(calculations);
        })
        .catch(error =>{
            console.log('Error fetching calculations', error);
        })
}

function renderHistory(calcHistory){
    let calcResultListArea= document.querySelector('#calcResultHistory');
    calcResultListArea.innerHTML=`<ul id="calcHistoryList"></ul>`;
    for(let calc of calcHistory){
        calcResultListArea.innerHTML+=`<li>
        ${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}
        </li>  `;
}
}

window.onload = function(){
    fetchCalculations();
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