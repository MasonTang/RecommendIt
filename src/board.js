import React from "react";
import Fire from "./fire";

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };
    }

    add(text) {
        let arr = this.state.comments;
        arr.push(text);
        this.setState({ comments: arr });
    }

    removeComment(i) {
        console.log("hi");
        let arr = this.state.comments;
        arr.splice(i, 1);
        this.setState({ comments: arr });
    }

    updateComment(newText, i) {
        console.log("comment");
        let arr = this.state.comments;
        arr[i] = newText;
        this.setState({ comments: arr });
    }

    eachComment(text, i) {
        return (
            <Fire
                key={i}
                index={i}
                updateCommentText={(newText, i) => this.updateComment(newText, i)}
                deleteFromBoard={i => this.removeComment(i)}
            >
                {text}
            </Fire>
        );
    }

    render() {
        return (
            <div>
                <button onClick={text => this.add("Default Text")}>Add Todo</button>
                {this.state.comments.map((text, i) => this.eachComment(text, i))}
            </div>
        );
    }
}
