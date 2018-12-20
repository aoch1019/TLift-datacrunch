import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import csvString from './tacticString.js'

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      arr: []
    }

  }

  componentDidMount(){
    this.transformCsv()
  }


// Turns the csv into an array of hashes
  transformCsv(){
    let newArr = csvString.split('\n')

    let index = 1
    let headings = newArr[0].split('	')
    let hashArray = []

// Goes through each row of the CSV and creates a hash with the proper header as its key
    while(index < newArr.length){
      let currArr = newArr[index].split('	')
      let currHash = {}
      headings.forEach((elem, idx) => {
        currHash[elem] = currArr[idx]
      })
      // console.log(currHash)
      hashArray.push(currHash)
      index++
    }
    // After the array is created, the state is set and a function is called
    this.setState({ arr: hashArray }, () => this.getFromUrl())
  }

  getFromUrl(){
    this.state.arr.forEach(hash => {
      let str = hash['impression_pixel_json']
      let url = `${str.substring(2, str.length - 3)}/?tripleliftTest=true&tl_tactic_id=343664`
      if(url.includes('http')){
        fetch(`${url}`).then(res => res.json()).then(info => {
          console.log(info)
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        Hello
      </div>
    );
  }
}

export default App;
