import React, { PureComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router";


class MyOrders extends PureComponent<RouteComponentProps> {
    state = {};

    render() {
        return (
            <div style={{ marginTop:"72px"}}>orders</div>
        )
    }
}

export const Orders =  withRouter(MyOrders);