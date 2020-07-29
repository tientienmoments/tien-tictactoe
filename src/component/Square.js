import React, { Component } from 'react'

export default class Square extends Component {


render() {
    
        return (
            <div className="square" onClick={()=> this.props.selectSquare(this.props.id)}>
                {this.props.value === "x"? <img src="https://image.flaticon.com/icons/png/512/826/826963.png" width="150px" alt="player pic"></img>:this.props.value ==="o"? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSy9yywjjq9v6mNaL9tkVCnO4Sa6EPUMcJFtQ&usqp=CAU" width="150px" alt="player pic"></img>: ""}    
            </div>
        )
    }
}
