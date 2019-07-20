import React from 'react';

export default class App extends React.Component {

    constructor(props) { //the constructor is here to set the initial state the components 
        super(props)
        this.state = {  
          balance: '', 
          rate: '',
          term: 15,
          output:''
        }
        this.HandleChange = this.HandleChange.bind(this);
        this.MortgageCalc = this.MortgageCalc.bind(this);
        this.ClickHandle = this.ClickHandle.bind(this);
    }

    HandleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    MortgageCalc(balance, rate, term) {// Calculate the mortgage given the balance, rate, and term
        balance = this.state.balance;
        rate = this.state.rate;
        term = this.state.term;
        
        let p = balance; //principle / initial amount borrowed
        let i = rate / 1200; //monthly interest rate
        let n =  term * 12; //number of payments months
        let M = (p * (i * (1 + i) ** n) / ((1 + i) ** n - 1)).toFixed(2);

        return M;
    }  
    
    ClickHandle() {
        let payment = this.MortgageCalc()
        this.setState({output: `$${payment} is your monthly payment.`});
    }
         
  render() {
    return (
      <div className='container center-block'>
        <div className='center-block'>
            <h3>Mortgage Calculator</h3>
          </div>
        <div className='form-group'>
          <label className='center-block'>Balance</label>
          <input 
              id='balance'
              className='col-md-4 center-block'
              name='balance' 
              type='number' 
              placeholder='Balance'
              value = {this.state.balance} 
              onChange = {this.HandleChange}/> 
        </div>
        <div className='form-group'>
          <label className='center-block'>Rate</label>
          <input 
              className='col-md-4 center-block'
              id='rate'
              name="rate" 
              type="number" 
              step ="0.01" 
              placeholder='Rate'
              value = {this.state.rate} 
              onChange = {this.HandleChange}/>
        </div>
        <div className='form-group'>
          <label className='center-block'>Term</label>
          <select 
              className='center-block'
              name='term' 
              id='term' 
              value={this.state.term} 
              onChange={this.HandleChange}>
            <option value ="15"> 15 </option>
            <option value="30"> 30 </option>
          </select>
        </div>
        <div className='form-group'>
          <button
            type='button' 
            className='btn btn-primary btn-block'
            name ='submit' 
            value={this.state.output} 
            onClick = {this.ClickHandle}>Calculate Mortgage</button>
        </div>
        <div name ='output' id='output'> 
              <h4>{this.state.output}</h4> 
        </div>  
      </div>
    );
  }
}
