
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
    FormLabel,
    FormControl,
    FormErrorMessage,
    Stack,
    Input,
    Textarea,
    Image,
} from "@chakra-ui/core";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import Select from "react-select";
import { StoryTagForm } from "../../Models";
import API from "../../../api";
import { Alert } from "../../../Components/Shared/Shared";

interface Props {
    isOpen: boolean;
    onClose: any;
    afterSubmit?: () => any;
}
export default class StorySeriesAddModal extends Component<Props> {

    handleSubmit = (values: StoryTagForm, actions: FormikHelpers<StoryTagForm>) => {
        const { description, name } = values;
        const data = {
            description: description === "" ? null : description,
            name,
        }
        console.log(data);
        API().post("story-tags", data)
            .then((res) => {
                Alert("success", "Story Tag", "Success create new tag");
                this.props.afterSubmit && this.props.afterSubmit();
            })
            .catch((err) => {
                console.log(err.response);
                Alert("error", "Story Tag", "failed create new tag");
            })
            .finally(() => {
                this.props.onClose();
                actions.setSubmitting(false);
                actions.resetForm();
            })
    }
    render() {
        const { isOpen, onClose } = this.props;
        const AddNewSerieSchema = Yup.object().shape({
            name: Yup.string().required("At least give the tag a name, OK?"),
        });
        return (
            <Formik
                initialValues={{
                    name: "",
                    description: "",
                }}
                validationSchema={AddNewSerieSchema}
                onSubmit={this.handleSubmit}
            >{({ handleSubmit, handleChange, values, errors, touched, setFieldValue, isSubmitting }) => (
                <Modal isOpen={isOpen} onClose={onClose} size="xl" closeOnOverlayClick={!isSubmitting}>
                    <form onSubmit={handleSubmit}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Create New Tag</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <Stack spacing={4}>
                                    <FormControl isInvalid={errors.name !== undefined && touched.name}>
                                        <FormLabel htmlFor="name">Tag's Name</FormLabel>
                                        <Input isDisabled={isSubmitting} type="text" name="name" id="name" placeholder="Insert Series' Name" onChange={handleChange} />
                                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="description">Tag's Description</FormLabel>
                                        <Textarea isDisabled={isSubmitting} name="description" id="description" placeholder="Insert Series' Description" onChange={handleChange} />
                                    </FormControl>
                                </Stack>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose} isDisabled={isSubmitting}>Cancel</Button>
                                <Button variantColor="teal" ml={3} type="submit" isLoading={isSubmitting}>
                                    Save
                                    </Button>
                            </ModalFooter>
                        </ModalContent>
                    </form>
                </Modal>
            )}
            </Formik>
        )
    }
}
