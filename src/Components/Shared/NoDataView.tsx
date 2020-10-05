import React from 'react'
import {Box, Text} from "@chakra-ui/core"

const NoDataView: React.FC = () => {
    return (
        <Box h="50vh" w="100%" d="flex" flexDir="column" justifyContent="center" mt={10} alignItems="center">
            <Text color="gray.500">
                <i className="fas fa-times fa-4x"></i>
            </Text>
            <Text color="gray.500" fontSize="2rem">No Data Found</Text>
        </Box>
    );
}

export default NoDataView;