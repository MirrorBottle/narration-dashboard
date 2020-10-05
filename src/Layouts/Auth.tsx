import React, { Component } from 'react'
import { withRouter, Redirect, RouteComponentProps, Switch, Route } from "react-router-dom";
import routes, { Route as RouteType } from "../routes";
import Index from "../Pages/Home/Index";
import {
    Box,
    Text,
    Divider
} from "@chakra-ui/core";

class Auth extends Component<RouteComponentProps> {

    getRoutes = (routes: RouteType[]) => {
        return routes.map((route, key) => {
            if (route.layout === "/auth") {
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
        const { pathname } = this.props.location;
        for (let i = 0; i < thisRoutes.length; i += 1) {
            const menu = thisRoutes[i];
            if (pathname.includes(menu.layout + menu.path)) {
                return menu.name;
            }
        }
        return "Brand";
    };
    render() {
        return (
            <Box px={20} pt={40} bg="teal.500"  minHeight="100vh" d="flex" flexDir="column" justifyContent="top" alignItems="center">
                <Text as="h1" fontSize="4rem" mb={1} color="white">Chakranime</Text>
                <Box w="100px" h="2px" bg="white" />
                <Text as="h1" fontSize="2rem" mb={10} color="white">{this.getBrandText(routes)}</Text>
                <Switch>
                    {this.getRoutes(routes)}
                </Switch>
            </Box>
        )
    }
}
export default withRouter(Auth);
