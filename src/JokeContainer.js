import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import { v4 as uuidv4 } from 'uuid';
import './JokeContainer.css';

class JokeContainer extends Component {
    static defaultProps = {
    };
    constructor(props) {
        super(props);
        this.state = {
            apiUrl: 'https://sv443.net/jokeapi/v2/joke/Programming?type=single',
            jokes: [],
            isLoaded: false
        };
        this.jokeIncluded = this.jokeIncluded.bind(this);
        this.voteUp = this.voteUp.bind(this);
        this.voteDown = this.voteDown.bind(this);
        this.sortJokes = this.sortJokes.bind(this);
    }

    async componentDidMount() {
        var newJokes = this.state.jokes;
        while (this.state.jokes.length < 9) {
            var newJoke = await (await axios.get(this.state.apiUrl)).data.joke;
            if (this.jokeIncluded(newJoke) === false) {
                var joke = {
                    id: uuidv4(),
                    jokeText: newJoke,
                    score: 0,
                    emoji: '😐'
                }
                newJokes.push(joke)
            }
        }
        //console.log(newJokes)
        this.setState({
            jokes: newJokes,
            isLoaded: true
        })
    }

    voteUp(id) {
        var newJokes = this.state.jokes;
        var joke = newJokes.find(function (el) { return el.id === id });
        joke.score++;
        if (joke.score > 0 && joke.score < 3) {
            joke.emoji = '😀'
        }
        if (joke.score >= 3 && joke.score < 5) {
            joke.emoji = '😆'
        }
        if (joke.score < 0 && joke.score > -3) {
            joke.emoji = '😔'
        }
        if (joke.score <= -3 && joke.score < 3) {
            joke.emoji = '🤢'
        }
        this.setState({
            jokes: newJokes,
        })
        this.sortJokes();
    }
    voteDown(id) {
        var newJokes = this.state.jokes;
        var joke = newJokes.find(function (el) { return el.id === id });
        joke.score--;
        if (joke.score > 0 && joke.score < 3) {
            joke.emoji = '😀'
        }
        if (joke.score >= 3 && joke.score < 5) {
            joke.emoji = '😆'
        }
        if (joke.score < 0 && joke.score > -3) {
            joke.emoji = '😔'
        }
        if (joke.score <= -3 && joke.score < 3) {
            joke.emoji = '🤢'
        }
        this.setState({
            jokes: newJokes,
        })
        this.sortJokes();
    }

    sortJokes() {
        let sortedJokes = this.state.jokes;
        function compare(j1, j2) {
            if (j1.score < j2.score) {
                return -1;
            }
            if (j1.score > j2.score) {
                return 1;
            }
            return 0;
        }
        sortedJokes = sortedJokes.sort(compare).reverse();
        this.setState({
            jokes: sortedJokes
        })
    }

    jokeIncluded(joke) {
        var jokes = this.state.jokes;
        var includes = false;
        if (jokes.length > 0) {
            for (let i = 0; i < jokes.length; i++) {
                if (jokes[i].jokeText === joke) {
                    includes = true;
                }
            }
        }
        return includes;
    }

    render() {
        return (
            <div className="jokecontainer-main">
                {this.state.isLoaded ?
                    <div className="jokecontainer-jokecontainer">
                        {this.state.jokes.map(joke => <Joke
                            key={joke.id}
                            id={joke.id}
                            text={joke.jokeText}
                            score={joke.score}
                            sortJokes={this.sortJokes}
                            voteUp={() => this.voteUp(joke.id)}
                            voteDown={() => this.voteDown(joke.id)}
                            emoji={joke.emoji}
                        />)}
                    </div> :
                    <div className="loader"></div>}
            </div>
        );
    }
}

export default JokeContainer;