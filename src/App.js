import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [amount, setAmount] = useState(10000);
  const [duration, setDuration] = useState(4);
  const [rcfRate, setRcfRate] = useState(2);
  const [blRate, setBlRate] = useState(2);
  const [rcfTable, setRcfTable] = useState(null);
  const [blTable, setBlTable] = useState(null);

  const calcDate = day => {
    const setDate = (date, day) => {
      date = new Date(date);
      date.setDate(day);
      date.setHours(23);
      return date;
    };

    const setMonths = () => {
      const date = new Date();
      date.setMonth(date.getMonth() + parseInt(duration));
      return date;
    };

    let today = new Date().toLocaleDateString(),
      range1 = new Date(today),
      range2 = new Date(setMonths()),
      newDate1 = setDate(today, day),
      newDate2 = setDate(setMonths(), day),
      dates = [],
      temp = null;

    while(newDate1 <= newDate2){
      if(newDate1.getDate() !== day) {
        temp = setDate(newDate1, 0);
        if(temp >= range1 && temp <= range2) dates.push(temp);
        newDate1 = setDate(newDate1, day);
      } else {
        temp = new Date(newDate1);
        if(temp >= range1 && temp <= range2) dates.push(temp);
        newDate1.setMonth(newDate1.getMonth() + 1);
      }
    }

    return dates;
  };

  const calcPrincipal = () => parseInt(amount) / parseInt(duration);

  const calcInterest = (p, r, t, bl) => {
    let tempInterest = [];

    for (let i = 0; i <= (parseInt(duration) - 1); i++) {
      if(i === 0 && bl) {
        const total = t * bl;
        tempInterest.push((t - (p * i)) * (r / 100) + total);
      } else tempInterest.push((t - (p * i)) * (r / 100));
    }

    return tempInterest;
  };

  const calcRepayment = (p, r) => {
    let tempRepayment = [];

    for (let i = 0; i <= (parseInt(duration) - 1); i++) {
      tempRepayment.push(p + r[i]);
    }

    return tempRepayment;
  };

  const calcTotal = arr => {
    let tempTotal = [];

    arr.forEach((val, i) => {
      if(!Array.isArray(val)) tempTotal[i] = val * parseInt(duration);
      else val.forEach(num => {
        if (!tempTotal[i]) tempTotal[i] = 0;
        tempTotal[i] = tempTotal[i] + num;
      });
    });

    return tempTotal;
  };

  useEffect(() => {
    const dates = calcDate(30);
    const principals = calcPrincipal();
    const rcfInterest = calcInterest(parseInt(principals), parseFloat(rcfRate), parseInt(amount));
    const blInterest = calcInterest(parseInt(principals), parseFloat(blRate), parseInt(amount), 0.1);
    const rcfRepayment = calcRepayment(principals, rcfInterest);
    const blRepayment = calcRepayment(principals, blInterest);
    const rcfTotal = calcTotal([principals, rcfInterest, rcfRepayment]);
    const blTotal = calcTotal([principals, blInterest, blRepayment]);

    console.log(rcfTotal, blTotal);
  }, [amount, duration, rcfRate, blRate]);

  return (
    <div className="App">

      <div className="amount-requested">
        Amount requested <input className="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)}  /> (in £)
      </div>

      <div className="duration-requested">
        Duration <input className="duration" type="number" value={duration} onChange={e => setDuration(e.target.value)}  /> (in months)
      </div>

      <br /><br />

      <div className="resolving-credit-facility">
        Interest rate <input className="rcf" type="number" value={rcfRate} onChange={e => setRcfRate(e.target.value)}  /> (in %)
        <br />
        <table>
          <thead>
          <tr>
            <th>Repayment date</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Total repayment</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>The table body</td>
            <td>with two columns</td>
            <td>with two columns</td>
            <td>with two columns</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div className="business-loan">
        Interest rate <input className="bl" type="number" value={blRate} onChange={e => setBlRate(e.target.value)}  /> (in %)
        <br />
        <table>
          <thead>
          <tr>
            <th>Repayment date</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Total repayment</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>The table body</td>
            <td>with two columns</td>
            <td>with two columns</td>
            <td>with two columns</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default App;
