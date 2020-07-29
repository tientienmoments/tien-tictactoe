import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {
    
    

     calculateWinner = (squares) => {
        const lines=[
        [0,1,2],
        [3,4,5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
        
        ]
        for (let i=0; i<lines.length; i++){
            const[a,b,c]=lines[i];
            if (
                squares[a]
                
                && squares[a]===squares[b]
        
                && squares[b]===squares[c]){
                return squares[a];
            }
        }
        
        
            return null
        }

selectSquare=(id)=>{
    
    let array = this.props.squaresList.slice();
    let historyArray= this.props.history;


    if (this.props.winner !== "") {
        return
    }
    if (array[id]!== ""){
        alert("input other square")
        return
    }
    

    console.log("hey",id)
    
    console.log("array",array)
    array[id] = this.props.nextPlayer ? "x":"o";

    historyArray.push({
        squaresList:array,  
        nextPlayer: !this.props.nextPlayer
    })

    this.props.setParentsState({
        squaresList : array,
         nextPlayer:! this.props.nextPlayer,
        history: historyArray
    })
    
    let winner = this.calculateWinner(array)
    console.log("winner", winner)
    if (winner) {
            console.log("winner",winner)
            this.props.setParentsState({winner})
        }
    
    if (winner !==null){
        this.props.postData()
    }
    
    

};      //{this.props.value === "x"? <img src="https://image.flaticon.com/icons/png/512/826/826963.png" width="150px" alt="player pic"></img>:this.props.value ==="o"? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSy9yywjjq9v6mNaL9tkVCnO4Sa6EPUMcJFtQ&usqp=CAU" width="150px" alt="player pic"></img>: ""}

    render() {  
        let array = this.props.squaresList;
        if (this.props.winner !== "") {
        return<h4> Winner: {this.props.winner === "x"? <img src="https://image.flaticon.com/icons/png/512/826/826963.png" width="150px" alt="player pic"></img> : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSy9yywjjq9v6mNaL9tkVCnO4Sa6EPUMcJFtQ&usqp=CAU" width="150px" alt="player pic"></img>} <br></br>
                <span>Game Over</span>
                </h4>
            
            
        }else if (array.every((item) => item !== '')){
            console.log("check")
            return<h4>Game Tie<br></br> 
                <span>No Winner</span></h4>
        }

        return (
            <div>


                <h4>Next Player<br></br> {this.props.nextPlayer === true ?<img src="https://image.flaticon.com/icons/png/512/826/826963.png" width="150px" alt="player pic"></img> :  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSy9yywjjq9v6mNaL9tkVCnO4Sa6EPUMcJFtQ&usqp=CAU" width="150px" alt="player pic"></img>}</h4>
                
                <div style={{ display: "flex" }}>
                    
                    <Square  selectSquare={this.selectSquare} value={this.props.squaresList[0] } id={0} />
                    <Square  selectSquare={this.selectSquare} value={this.props.squaresList[1]} id={1}/>
                    <Square  selectSquare={this.selectSquare} value={this.props.squaresList[2]} id={2}/>
                </div>
                <div style={{ display: "flex" }}>
                    
                    <Square  selectSquare={this.selectSquare} value={this.props.squaresList[3]} id={3}/>
                    <Square  selectSquare={this.selectSquare} value={this.props.squaresList[4]} id={4}/>
                    <Square  selectSquare={this.selectSquare} value={this.props.squaresList[5]} id={5}/>
                </div>
                <div style={{ display: "flex" }}>
                    
                    <Square  selectSquare={this.selectSquare} value={this.props.squaresList[6]} id={6}/>
                    <Square  selectSquare={this.selectSquare} value={this.props.squaresList[7]} id={7}/>
                    <Square  selectSquare={this.selectSquare} value={this.props.squaresList[8]} id={8}/>
                </div>
            </div>
        )
    }
}

