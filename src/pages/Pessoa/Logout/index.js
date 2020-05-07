import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { logout } from "../../../services/auth";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout() {
        logout()
        this.props.history.push("/login");
    }

    render() {
        return (
            <div>
                {this.handleLogout()}
            </div>
        );
    }
}
export default withRouter(Logout);