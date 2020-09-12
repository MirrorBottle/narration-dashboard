import React, {Component, useRef} from 'react'
import {withRouter, RouteComponentProps} from "react-router-dom";
import {
    Box, 
    Flex, 
    Link, 
    Text, 
    Image, 
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    Avatar,
} from "@chakra-ui/core"

import routes, {Route} from "./../../../routes";

interface State {
    isOpen: boolean;
}
interface Props extends RouteComponentProps {
    brandText: string;
}
class Navs extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    onOpen = () => this.setState({isOpen: true});
    onClose = () => this.setState({isOpen: false});
    activeRoute = (routeName: string): string => {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }
    render() {
        const {isOpen} = this.state;
        return (
            <React.Fragment>
                <Flex
                    bg="teal.500"
                    w="100%"
                    px={20}
                    py={4}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Flex flexDirection="row" justifyContent="center" alignItems="center">
                        <Button variantColor="teal"  onClick={this.onOpen}>
                            <Text fontSize="1.5rem" color="white">
                                <i className="fas fa-bars"></i>
                            </Text>
                        </Button>
                        <Text fontSize="1.5rem" pl={4} color="white">
                            Chakra Dash - {this.props.brandText}
                        </Text>
                    </Flex>
                </Flex>
                <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={this.onClose}
                    size="md"
                    scrollBehavior="inside"
                    id="sidebar"
                >
                    <DrawerOverlay />
                    <DrawerContent >
                        <DrawerCloseButton />
                        <DrawerHeader justifyContent="center" color="teal.500">Chakra Dash</DrawerHeader>
                        <DrawerBody pb={10}>
                            <Box mt={3} h="90px" mb={8} w="100%" d="flex" justifyContent="right"
                                alignItems="center">
                                <Avatar name="MirrorBottle" />
                                <Box h="100%" w="100%" pl={5} d="flex" flexDirection="column" justifyContent="center">
                                    <Text color="teal.500" fontSize="1.5rem">
                                        MirrorBottle
                                    </Text>
                                    <Text color="gray.500" fontSize="1rem">
                                        Admin
                                    </Text>
                                </Box>
                            </Box>
                            <Text color="teal.500" fontSize="1.2rem" fontWeight="medium" mb={4}>Shortcut</Text>
                            <Box d="flex" flexDirection="row" w="100%" justifyContent="space-between" h="90px">
                                <Box h="100%" borderWidth="1px" rounded="lg" w="25%" d="flex" flexDirection="column" justifyContent="center" className="short-drawer-menu" bg="teal.500">
                                    <Text color="white" d="flex" flexDirection="column" textAlign="center" alignItems="center" justifyContent="center">
                                        <i className="fas fa-user fa-2x"></i>
                                    </Text>
                                </Box>
                                <Box h="100%" borderWidth="1px" rounded="lg" w="25%" d="flex" flexDirection="column" justifyContent="center" className="short-drawer-menu" bg="teal.500">
                                    <Text color="white" d="flex" flexDirection="column" textAlign="center" alignItems="center" justifyContent="center">
                                        <i className="fas fa-moon fa-2x"></i>
                                    </Text>
                                </Box>
                                <Box h="100%" borderWidth="1px" rounded="lg" w="25%" d="flex" flexDirection="column" justifyContent="center" className="short-drawer-menu" bg="teal.500">
                                    <Text color="white" d="flex" flexDirection="column" textAlign="center" alignItems="center" justifyContent="center">
                                        <i className="fas fa-sign-out-alt fa-2x"></i>
                                    </Text>
                                </Box>
                            </Box>
                            <Text color="teal.500" fontSize="1.2rem" fontWeight="medium" mb={3} mt={6}>Menus</Text>
                            {routes.filter((route) => route.isSidemenu).map((route, key) => (
                                <Box key={key} borderWidth="1px" mt={3} onClick={() => this.props.history.push(`${route.layout}${route.path}`)} className={`drawer-menu ${this.props.location.pathname === route.layout + route.path ? "active" : ""}`} h="90px" rounded="lg" px={10} d="flex" justifyContent="space-between"
                                    alignItems="center">
                                    <Text color="teal.500" d="flex" flexDirection="column" justifyContent="center">
                                        <i className={`${route.icon} fa-2x`}></i>
                                    </Text>
                                    <Box h="100%" w="100%" pl={5} d="flex" flexDirection="column" justifyContent="center">
                                        <Text color="teal.500" fontSize="1.5rem">
                                            {route.name}
                                        </Text>
                                        <Text color="gray.500" fontSize="1rem">
                                            {route.desc}
                                        </Text>
                                    </Box>
                                </Box>
                            ))}
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </React.Fragment>
        );
    }
}

export default withRouter(Navs);