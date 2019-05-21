import React from "react";
export default class Fire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
    }

    remove() {
        console.log("remove");
        this.props.deleteFromBoard(this.props.index);
        this.setState({ editing: false });
    }

    edit() {
        this.setState({ editing: true });
    }

    save() {
        this.props.updateCommentText(this.refs.newText.value, this.props.index);
        this.setState({ editing: false });
    }

    renderNormal() {
        return (
            <div className="commentContainer">
                <div>{this.props.children}</div>
                <button onClick={() => this.edit()}>Edit</button>
                <button onClick={() => this.remove()}>Remove</button>
            </div>
        );
    }

    renderForm() {
        return (
            <div className="commentContainer">
                <textarea ref="newText" defaultValue={this.props.children} />
                <button onClick={() => this.save()}>Save</button>
            </div>
        );
    }

    render() {
        if (this.state.editing) {
            return this.renderForm();
        } else {
            return this.renderNormal();
        }
    }
}
