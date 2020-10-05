import React, { Component } from 'react'
import Navs from "../Components/Layouts/Admin/Navs";
import {withRouter, Redirect, RouteComponentProps, Switch, Route} from "react-router-dom";
import routes, {Route as RouteType} from "../routes";
import Index from "../Pages/Home/Index";
import {
    Box,
    Text
} from "@chakra-ui/core";

class Admin extends Component<RouteComponentProps> {

    getRoutes = (routes: RouteType[]) => {
        return routes.map((route, key) => {
            if(route.layout === "/admin") {
                return (
                    <Route
                        exact
                        path={route.layout + route.path}
                        component={() => <route.component />}
                        key={1}
                    />
                )
            }
            return null;
        })
    }
    getBrandText = (thisRoutes: RouteType[]): string => {
        const {pathname} = this.props.location;
        for (let i = 0; i < thisRoutes.length; i += 1) {
            const menu = thisRoutes[i];
            if (pathname.includes(menu.layout + menu.path)) {
                return menu.name;
            }
        }
        return "Brand";
    };
    render() {
        return sessionStorage.getItem("chakranime") ? (
            <div className="Admin">
                <Navs brandText={this.getBrandText(routes)} />
                <Box px={{sm: 5, md: 20}} py={10}>
                    <Switch>
                        {this.getRoutes(routes)}
                    </Switch>
                </Box>
            </div>
        ) : (
            <Redirect to="/auth/login" />
        )
    }
}
export default withRouter(Admin);
