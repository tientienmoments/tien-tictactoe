import React, { Component } from 'react'


import FacebookLogin from 'react-facebook-login';

import './App.css';
import Board from './component/Board'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',    //true is x, false is o
      nextPlayer: true,
      squaresList: ['', '', '', '', '', '', '', '', ''],
      winner: "",
      history: [],
      
    };
  }

  setParentsState = (obj) => {
    this.setState(obj)
  }

  postData = async () => {
    // let data = new URLSearchParams();
    // data.append("player", "tien");
    // data.append("score", -1500);
let data = {
  player: "Tien Tien",
  score: -1500,
}

    console.log("data", data)
   const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(data),
      json: true
    });

  }

  getData = async () => {
    let url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`
    let data= await fetch(url)
    let result = await data.json()
    console.log("result?", result)
    this.setState({
      ...this.state,
      otherPlayers: result.items
      // otherScore:result.item.score
    })
  }
  componentDidMount(){
    this.getData()
    this.postData()
      // this.setState({otherPlayer:/result.item.name, otherScore:result.item.score})

  }
//   otherScore =(result)=>{
// console.log("result",result)
//   }
  
  




  backToPast = (index) => {
    let past = this.state.history[index]
    this.setState({ ...this.state, squaresList: past.squaresList, nextPlayer: past.nextPlayer })
  }

  //  responseFacebook = (response) => {
  //   this.setState(response)
  // }
  responseFacebook = (response) => {
    console.log(response);
    this.setState({ userName: response.name })
    this.setState({ picture: response.picture.data.url })
  }


  render() {
    return (
      <div>
        <div>
        {this.state.userName ===""?
            
         <FacebookLogin

          appId="295808331745524"
          autoLoad={true}
          fields="name,email,picture"
          // onClick={this.componentClicked}
          callback={this.responseFacebook}

        /> : null
    }

        </div>

        {/* ----------------------- */}
        <div>
        <h1 >Tic Tac Toe</h1>
       {this.state.otherPlayers ? this.state.otherPlayers.map((item)=> item.player ) : null}
       {this.state.otherPlayers ? this.state.otherPlayers.map((item)=> item.score) : null}
        <span ><img src={this.state.picture} className="login-style" /></span>
        <h3>Playing Player:{this.state.userName}</h3>
        {/* <h3>Next Player:{this.state.nextPlayer}</h3> */}
        </div>
      {/* ------------------------------------ */}
        <div >
        <Board
          postData={this.postData}
          squaresList={this.state.squaresList}
          setParentsState={this.setParentsState}
          nextPlayer={this.state.nextPlayer}
          winner={this.state.winner}
          history={this.state.history}
        />
        <ol hidden={this.state.hide}>History
        {this.state.history.map((record, index) => {
          return (


            <li><button onClick={() => this.backToPast(index)}>Go to: {index + 1}</button></li>

          )
        })}

        </ol>
        </div>
      </div>


    )
  }
}


