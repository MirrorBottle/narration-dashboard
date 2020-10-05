import React, { Component } from 'react'
import {
    Box, 
    Text, 
    Image,
    Button
} from "@chakra-ui/core";
import {ShortAnime} from "./../Models";
import moment from "moment";

export class AnimeIndexItemList extends Component<{data: ShortAnime}> {
    render() {
        const {data}  =this.props;
        return (
            <Box w="100%" borderWidth="1px" mt={3} py={5} rounded="lg" px={10} d="flex" justifyContent="left" flexDirection={{ sm: "column", md: "row" }}>
                <Box d="flex" w={{ sm: "100%", md: "10%" }} flexDir="column" alignItems="center" justifyContent="center">
                    <Image objectFit="cover" size="120px" src={data.cover} />
                </Box>
                <Box d="flex" flexDir="column" ml={{ sm: 0, md: 4 }} mt={{ sm: 2, md: 0 }} w={{ sm: "100%", md: "50%" }}>
                    <Text color="teal.500" fontSize="1.5rem" textAlign={{ sm: "center", md: "left" }}>
                        {data.name}
                    </Text>
                    <Text color="gray.500" fontSize="1rem" textAlign={{ sm: "center", md: "left" }}>
                        {data.knownAs}
                    </Text>
                    <Text display={{ sm: "none", md: "block"}} color="gray.700" mt={2} fontSize="1rem" textAlign={{sm: "center", md:"left"}}>
                        {data.description.length > 90 ? `${data.description.substring(0, 90)}...` : data.description}
                    </Text>
                </Box>
                <Box d="flex" w={{ sm: "100%", md: "40%" }} mt={{ sm: 4, md: 0 }} flexDir="row" alignItems="center" justifyContent={{ sm: "center", md: "flex-end"}}>
                    <Button variantColor="red" mr={1}>
                        <i className="fas fa-trash-alt"></i>
                        <Text ml={2}>Delete</Text>
                    </Button>
                    <Button variantColor="yellow" mr={1}>
                        <i className="fas fa-pen"></i>
                        <Text ml={2}>Edit</Text>
                    </Button>
                    <Button variantColor="teal">
                        <i className="fas fa-eye"></i>
                        <Text ml={2}>Detail</Text>
                    </Button>
                </Box>
            </Box>
        )
    }
}

export class AnimeIndexItemTile extends Component<{ data: ShortAnime }> {
    render() {
        const {data} = this.props;
        return (
            <Box width={{sm: "100%", md: "21rem"}} mx={3} bg="red" borderWidth="1px" mt={{sm: 4, md: 3}} rounded="lg" overflow="hidden" d="flex" flexDir="column" >
                <Image src={data.cover} alt={data.name} height="19rem" w="100%" objectFit="cover" />
                <Box p={6}>
                    <Text color="teal.500" fontSize="1.5rem" textAlign={{ sm: "center", md: "left" }}>
                        {data.name}
                    </Text>
                    <Text color="gray.500" fontSize="1rem" textAlign={{ sm: "center", md: "left" }}>
                        {data.knownAs}
                    </Text>
                    <Text color="gray.700" mt={2} fontSize="1rem" textAlign={{ sm: "center", md: "left" }}>
                        {data.description.length > 90 ? `${data.description.substring(0, 90)}...` : data.description}
                    </Text>
                    
                </Box>
                <Box d="flex" w="100%" height="100%" p={6} mt={{ sm: 4, md: 0 }} flexDir="row" alignItems="flex-end" justifyContent="center">
                    <Button variantColor="red" mr={1}>
                        <i className="fas fa-trash-alt"></i>
                        <Text ml={2}>Delete</Text>
                    </Button>
                    <Button variantColor="yellow" mr={1}>
                        <i className="fas fa-pen"></i>
                        <Text ml={2}>Edit</Text>
                    </Button>
                    <Button variantColor="teal">
                        <i className="fas fa-eye"></i>
                        <Text ml={2}>Detail</Text>
                    </Button>
                </Box>
            </Box>
        )
    }
}
