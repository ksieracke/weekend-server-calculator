const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []


// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', function(req,res){
  res.send(calculations);
});
// POST /calculations
app.post('/calculations', (req,res)=>{
  const newCalc=req.body;
  console.log(`Get a POST request`, newCalc);

  if(!newCalc.numOne || !newCalc.operator || !newCalc.numTwo){
    res.sendStatus(400);
    return;
  }
  let numOne=parseInt(newCalc.numOne);
  let numTwo=parseInt(newCalc.numTwo);
  if(newCalc.operator=='+'){
    newCalc.result=numOne+numTwo;
  }
  else if(newCalc.operator=='-'){
    newCalc.result=numOne-numTwo
  }
  else if(newCalc.operator=='*'){
    newCalc.result=numOne*numTwo
  }
  else if(newCalc.operator=='/'){
    newCalc.result=numOne/numTwo
  }
  else{
    console.log('operator error');
    return;
  }
  calculations.push(newCalc);
  res.sendStatus(201);
});

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
