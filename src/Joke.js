import React, { Component } from "react";
import axios from "axios"
import './Joke.css'

class Joke extends Component {
    static defaultProps = {
    };
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        return (
            <div className="joke-main">
                <div className="vote-container">
                    <button className="vote-button" onClick={this.props.voteUp}>⇑</button>
                    <div className="scorebox">
                        <p>{this.props.score}</p>
                    </div>
                    <button className="vote-button" onClick={this.props.voteDown}>⇓</button>
                </div>
                <p>{this.props.text}</p>
                <p className="emoji">{this.props.emoji}</p>
            </div>
        );
    }
}

export default Joke;
