import React, { Component } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel,
    Box,
    Stack,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Text,
    FormControl,
    FormErrorMessage,
    Image,
    Textarea
} from "@chakra-ui/core";
import {Formik} from "formik";
import * as Yup from "yup";
interface Props {
    isOpen: boolean;
    onClose: any
}
interface State {
    isFormOneComplete: boolean;
    isFormTwoComplete: boolean;
    currentIndex: 0 | 1 | 2;
}
export default class AnimeAddModal extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            currentIndex: 0,
            isFormOneComplete: false,
            isFormTwoComplete: false,
        }
    }

    changeCurrentTab = () => {

    }
    render() {
        const {isOpen, onClose} = this.props;
        const {isFormOneComplete, isFormTwoComplete, currentIndex} = this.state;
        const isOneFormComplete = isFormOneComplete || isFormTwoComplete;
        return (
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <Formik
                        initialValues={{
                            imageUrl: "",
                            title: "",
                            desc: "",
                        }}
                        onSubmit={(values) => console.log(values)}
                    >{({ handleSubmit, errors, touched, status, isSubmitting, handleChange }) => (
                        <React.Fragment>
                            <ModalHeader>Add New Anime</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Tabs index={currentIndex} variant="solid-rounded" align="center" variantColor="teal">
                                    <TabList mb="1em">
                                        <Tab mx={5}>1</Tab>
                                        <Tab mx={5} disabled={!isFormOneComplete}>2</Tab>
                                        <Tab mx={5} disabled={!isFormTwoComplete}>3</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            <form onSubmit={handleSubmit}>
                                                <Box w="100%" d="flex" justifyContent="left" flexDirection={{ sm: "column", md: "row" }}>
                                                    <Box d="flex" w={{ sm: "100%", md: "30%" }} flexDir="column" alignItems="center" justifyContent="center">
                                                        <Image objectFit="cover" h="240px" w="100%" src="" />
                                                    </Box>
                                                    <Box d="flex" flexDir="column" ml={{ sm: 0, md: 4 }} mt={{ sm: 2, md: 0 }} w={{ sm: "100%", md: "70%" }}>
                                                        <Stack spacing={4}>
                                                            <FormControl isInvalid={errors.title !== undefined && touched.title}>
                                                                <InputGroup>
                                                                    <Input isDisabled={isSubmitting} type="text" name="title" onChange={handleChange} placeholder="Insert Anime's Title" />
                                                                </InputGroup>
                                                                <FormErrorMessage>{errors.title}</FormErrorMessage>
                                                            </FormControl>
                                                            <FormControl isInvalid={errors.imageUrl !== undefined && touched.imageUrl}>
                                                                <InputGroup>
                                                                    <Input isDisabled={isSubmitting} placeholder="Insert Image URL" type="text" name="imageUrl" onChange={handleChange} />
                                                                </InputGroup>
                                                                <FormErrorMessage>{errors.imageUrl}</FormErrorMessage>
                                                            </FormControl>
                                                            <FormControl isInvalid={errors.desc !== undefined && touched.desc}>
                                                                <InputGroup>
                                                                    <Textarea isDisabled={isSubmitting} type="textarea" name="desc" onChange={handleChange} placeholder="Insert Anime's Description" />
                                                                </InputGroup>
                                                                <FormErrorMessage>{errors.desc}</FormErrorMessage>
                                                            </FormControl>
                                                        </Stack>
                                                    </Box>
                                                </Box>
                                            </form>
                                        </TabPanel>
                                        <TabPanel>
                                            <p>two!</p>
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant={isOneFormComplete ? "solid" : "ghost"} mr={3} onClick={() => isOneFormComplete ? this.changeCurrentTab() : onClose()}>
                                    {isOneFormComplete ? "Back" : "Close"}
                                </Button>
                                <Button variantColor="teal" isDisabled>Next</Button>
                            </ModalFooter>
                        </React.Fragment>
                    )}</Formik>
                </ModalContent>
            </Modal>
        )
    }
}
