import React, { PureComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router";


class MyProfile extends PureComponent<RouteComponentProps> {
    state = {};

    render() {
        return (
            <div style={{ marginTop:"72px"}}>my profile</div>
        )
    }
}

export const Profile =  withRouter(MyProfile);