import React from "react";

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }

    handleChecked(checked) {
        this.setState({ checked: !this.state.checked });
    }

    render() {
        let message;
        if (this.state.checked) {
            message = "checked";
        } else {
            message = "unchecked";
        }
        return (
            <div>
                <h1>Checkbox</h1>
                <input onChange={() => this.handleChecked()} type="checkbox" />
                <p>{message}</p>
            </div>
        );
    }
}
