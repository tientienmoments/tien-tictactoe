import React, { Component } from 'react'

export default class Square extends Component {


    render() {

        return (
            <div className='box-outer'onClick={() => this.props.selectSquare(this.props.id)}>
                <div className='main_box'>
                {this.props.value === "x" ? <img width="200px" src="https://i.pinimg.com/originals/d6/c0/eb/d6c0eb6b4487c133c431c8957ac19ed5.gif" width="150px" alt="player pic"></img> : this.props.value === "o" ? <img className="player-style" src="https://media1.tenor.com/images/4a54404d97232c2cfd7b30bb5575e29c/tenor.gif?itemid=6240685" width="150px" alt="player pic"></img> : ""}
                    <div className='bar top'></div>
                    <div className='bar right delay'>
                    
                    </div>
                    <div className='bar bottom delay'></div>
                    <div className='bar left'></div>
                </div>
            </div>


            // <div className="box-outer" onClick={() => this.props.selectSquare(this.props.id)}>
                
            // </div>
        )
    }
}
