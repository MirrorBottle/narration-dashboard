import React from 'react'
import {Box, Spinner} from "@chakra-ui/core";
interface Props {
    isLoading: boolean;
}

const LoadingLayer: React.FC<Props> = ({isLoading}) => {
    return (
        <Box h="50vh" w="100%" d="flex" flexDir="column" justifyContent="center" mt={10} alignItems="center">
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="teal.500"
                size="xl"
            />
        </Box>
    );
}

export default LoadingLayer