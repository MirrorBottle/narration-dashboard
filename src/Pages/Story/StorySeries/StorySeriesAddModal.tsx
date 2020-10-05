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
import { StoryStatus, StorySeriesForm } from "../../Models";
import API from "../../../api";
import { Alert } from "../../../Components/Shared/Shared";

interface Props {
    isOpen: boolean;
    onClose: any;
    afterSubmit?: () => any;
}
export default class StoryTagAddModal extends Component<Props> {

    handleSubmit = (values: StorySeriesForm, actions: FormikHelpers<StorySeriesForm>) => {
        const { description, name, series_cover, status } = values;
        const data = {
            description: description === "" ? null : description,
            series_cover: series_cover === "" ? null : series_cover,
            name,
            status
        }
        console.log(data);
        API().post("story-series", data)
            .then((res) => {
                Alert("success", "Story Series", "Success create new series");
                this.props.afterSubmit && this.props.afterSubmit();
            })
            .catch((err) => {
                console.log(err.response);
                Alert("error", "Story Series", "failed create new series");
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
            name: Yup.string().required("A Serie without name, seriously?"),
            series_cover: Yup.string().required("This is a must!"),
            status: Yup.number().min(1, "The serie's current status?")
        });
        return (
            <Formik
                initialValues={{
                    name: "",
                    description: "",
                    series_cover: "",
                    status: 0
                }}
                validationSchema={AddNewSerieSchema}
                onSubmit={this.handleSubmit}
            >{({ handleSubmit, handleChange, values, errors, touched, setFieldValue, isSubmitting }) => (
                <Modal isOpen={isOpen} onClose={onClose} size="xl" closeOnOverlayClick={!isSubmitting}>
                    <form onSubmit={handleSubmit}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Create New Series</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <Stack spacing={4}>
                                    <FormControl isInvalid={errors.name !== undefined && touched.name}>
                                        <FormLabel htmlFor="name">Series' Name</FormLabel>
                                        <Input isDisabled={isSubmitting} type="text" name="name" id="name" placeholder="Insert Series' Name" onChange={handleChange} />
                                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.series_cover !== undefined && touched.series_cover}>
                                        <FormLabel htmlFor="series_cover">Series' Cover Image</FormLabel>
                                        <Input isDisabled={isSubmitting} type="text" name="series_cover" id="series_cover" placeholder="Insert Series' Cover Image" onChange={handleChange} />
                                        <FormErrorMessage>{errors.series_cover}</FormErrorMessage>
                                    </FormControl>
                                    {values.series_cover !== "" && (
                                        <Image
                                            w="100%"
                                            h="150px"
                                            src={values.series_cover}
                                            objectFit="cover"
                                            alt={`${values.name} cover image`}
                                        />
                                    )}
                                    <FormControl>
                                        <FormLabel htmlFor="description">Series' Description</FormLabel>
                                        <Textarea isDisabled={isSubmitting} name="description" id="description" placeholder="Insert Series' Description" onChange={handleChange} />
                                    </FormControl>
                                    <FormControl isInvalid={errors.status !== undefined && touched.status}>
                                        <FormLabel htmlFor="slug">Status</FormLabel>
                                        <Select
                                            name="status"
                                            isClearable
                                            placeholder="Select story current status"
                                            isSearchable
                                            options={StoryStatus}
                                            className="react-select"
                                            classNamePrefix="select"
                                            onChange={(value: any): void => {
                                                setFieldValue("status", value === null ? 0 : value.value);
                                            }}
                                            isDisabled={isSubmitting}
                                        />
                                        <FormErrorMessage>{errors.status}</FormErrorMessage>
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