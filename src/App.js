import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Button } from 'react-bootstrap'

import FacebookLogin from 'react-facebook-login';

import './App.css';
import Board from './component/Board'
import video from './video/video.mp4'

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
    let data = new URLSearchParams();
    data.append("player", "Tien");
    data.append("score", 3);
    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
      json: true,
    });

  }

  getData = async () => {
    let url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`
    let data = await fetch(url)
    let result = await data.json()
    console.log("result?", result)
    this.setState({
      ...this.state,
      otherPlayers: result.items
      // otherScore:result.item.score
    })
  }
  componentDidMount() {
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
      this.state.userName === "" ?
        <>
          {/* <video src={video} width="100%" height="100%" autoplay="true" /> */}
          <FacebookLogin

            appId="295808331745524"
            autoLoad={true}
            fields="name,email,picture"
            // onClick={this.componentClicked}
            callback={this.responseFacebook}

          />
        </>
        :
        <>
          {/* <video src={video} width="100%" height="100%" autoplay="true" /> */}
          <Container >

            <Row >
              <Col className="sidebar-style">
                <Row  >
                  {/* <h1 aria-label="Tic Tac Toe"></h1> */}
                  <div class="text">
                    <span>T</span>
                    <span>I</span>
                    <span>C</span>
                    <span>T</span>
                    <span>A</span>
                    <span>C</span>
                    <span>T</span>
                    <span>O</span>
                    <span>E</span>
                  </div>



                </Row>
                <Row style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginBottom:"20px" }}>
                  <span ><img src={this.state.picture} className="login-style" /></span>
                  <h4>Player:{this.state.userName}</h4>
                  {/* <h3>Next Player:{this.state.nextPlayer}</h3> */}
                </Row>
                <Row className="scoll-style">
                  <ol><span style={{ fontWeight: "bold" }}>History</span>
                    {this.state.history.map((record, index) => {
                      return (


                        <p><Button variant="info" style={{ margin: "0px" }} onClick={() => this.backToPast(index)}>Go to:{index + 1}</Button> </p>

                      )
                    })}
                  </ol>

                </Row>
                <Row className="scoll-style set-bottom">
                  <ol> <span style={{ fontWeight: "bold" }}>Ranking</span>
                    {this.state.otherPlayers ? this.state.otherPlayers.map((item, index) => {
                      return (
                        <Row>
                          <Col>Player: {item.player}</Col>
                          <Col>Score: {item.score}</Col>
                        </Row>
                      )

                    }) : null}

                  </ol>
                </Row>
              </Col>
              <Col>
                <Board
                  postData={this.postData}
                  squaresList={this.state.squaresList}
                  setParentsState={this.setParentsState}
                  nextPlayer={this.state.nextPlayer}
                  winner={this.state.winner}
                  history={this.state.history}
                />

              </Col>


            </Row>
          </Container>
        </>

    )
  }
}


