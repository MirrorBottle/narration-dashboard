import React, { Component } from 'react'
import {
    Box,
    Text,
    Stack,
    FormControl,
    FormLabel,
    FormErrorMessage,
    InputGroup,
    Input,
    Button,
    Tooltip,
    Checkbox,
} from "@chakra-ui/core";
import Select from "react-select";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import slugify from "react-slugify";
import { StoryStatus, StoryForm, FullStory, EmptyFullStory } from "../Models";
import { RouteComponentProps, withRouter } from "react-router-dom";
import FadeIn from "react-fade-in";
import API from "../../api";
import axios from "axios";
import { Confirm, Alert } from "../../Components/Shared/Shared";
import StorySeriesAddModal from "./StorySeries/StorySeriesAddModal";
import StoryTagAddModal from "./StoryTag/StoryTagAddModal";
import user from "../../user";
interface State {
    isLoading: boolean;
    tags: { value: number, label: string }[],
    series: { value: number, label: string }[],
    isSerieModalOpen: boolean,
    isTagModalOpen: boolean,
    story: FullStory,
}

class StoryEdit extends Component<RouteComponentProps<{id:string}>, State> {
    constructor(props: RouteComponentProps<{id:string}>) {
        super(props);
        this.state = {
            isLoading: true,
            tags: [],
            series: [],
            isSerieModalOpen: false,
            isTagModalOpen: false,
            story:EmptyFullStory
        }
    }
    toggleSerieModal = () => this.setState({ isSerieModalOpen: !this.state.isSerieModalOpen })
    toggleTagModal = () => this.setState({ isTagModalOpen: !this.state.isTagModalOpen })
    getSeriesData = () => {
        API().get("story-series")
            .then(res => {
                this.setState({
                    series: res.data.data.series.map((serie: { id: number, name: string }) => ({
                        label: serie.name,
                        value: serie.id
                    }))
                })
            })
            .catch((err) => console.log(err.response))
    }
    getTagsData = () => {
        API().get("story-tags")
            .then(res => {
                this.setState({
                    tags: res.data.data.tags.map((tag: { id: number, name: string }) => ({
                        label: tag.name,
                        value: tag.id
                    }))
                })
            })
            .catch((err) => console.log(err.response))
    }
    handleSubmit = (values: StoryForm, actions: FormikHelpers<StoryForm>) => {
        Object.keys(values).forEach(key => values[key] = values[key] === '' ? null : values[key])
        API().put(`story/${this.props.match.params.id}`, values)
            .then(res => {
                Alert("success", "Nice!", "You've updated a story!")
            })
            .catch(err => {
                console.log(err.response);
                Alert("error", "Oops!", err.response.data.message)
            })
            .finally(() => {
                actions.setSubmitting(false);
                actions.resetForm();
                this.props.history.push("/admin/story")
            })
    }
    componentDidMount() {
        const storyQuery = API().get(`story/${this.props.match.params.id}`)
        const tagsQuery = API().get("story-tags");
        const seriesQuery = API().get("story-series");
        axios.all([tagsQuery, seriesQuery, storyQuery]).then(
            axios.spread((...responses) => {
                console.log(responses);
                const tags = responses[0].data.data.tags.map((tag: { id: number, name: string }) => ({
                    label: tag.name,
                    value: tag.id
                }));
                const series = responses[1].data.data.series.map((serie: { id: number, name: string }) => ({
                    label: serie.name,
                    value: serie.id,
                }));
                this.setState({ isLoading: false, tags, series, story: responses[2].data.data.story })
            })
        )
    }
    render() {
        const StoryEditSchema = Yup.object().shape({
            title: Yup.string().required("Story title is a must!"),
            content: Yup.string().required("Are you forgetting something? The story!"),
            tags: Yup.array().of(Yup.number()).required("Please select at least one tag, OK?"),
            status: Yup.number().min(1, "The story's current status?")
        });
        const { isLoading, tags, series, isSerieModalOpen, isTagModalOpen, story } = this.state;
        const initialValues: StoryForm = {...story, tags: story.tagIds, serie: story.serieId, cover: story.cover || ""}
        return (
            <Box>
                <Text color="teal.500" fontSize="3rem" fontWeight="bold">{isLoading ? "Loading..." : `[EDIT] ${story.title}`}</Text>
                <StorySeriesAddModal isOpen={isSerieModalOpen} onClose={this.toggleSerieModal} afterSubmit={this.getSeriesData} />
                <StoryTagAddModal isOpen={isTagModalOpen} onClose={this.toggleTagModal} afterSubmit={this.getTagsData} />
                {!isLoading && (
                    <FadeIn>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={StoryEditSchema}
                            onSubmit={this.handleSubmit}
                            enableReinitialize
                        >{({ handleSubmit, handleChange, isSubmitting, errors, touched, status, values, setFieldValue }) => (
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={4} mt={8}>
                                    <FormControl isInvalid={errors.title !== undefined && touched.title}>
                                        <FormLabel htmlFor="title">Title</FormLabel>
                                        <Input value={values.title} isDisabled={isSubmitting} type="text" name="title" id="title" placeholder="Insert title" onChange={handleChange} />
                                        <FormErrorMessage>{errors.title}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="slug">Slug</FormLabel>
                                        <Input isDisabled background="teal" onChange={handleChange} color="white" type="text" name="slug" id="slug" placeholder="Your story link" value={slugify(values.title || "")} />
                                    </FormControl>
                                    <FormControl isInvalid={errors.status !== undefined && touched.status}>
                                        <FormLabel htmlFor="slug">Status</FormLabel>
                                        <Select
                                            name="status"
                                            isClearable
                                            defaultValue={StoryStatus.filter((status) => status.value === values.status)[0]}
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
                                    <FormControl>
                                        <FormLabel htmlFor="tags">Tags</FormLabel>
                                        <Box d="flex" flexDir="row">
                                            <Box w="95%">
                                                <Select
                                                    isDisabled={isSubmitting}
                                                    isMulti
                                                    placeholder="Please select at least one tag"
                                                    name="tags"
                                                    defaultValue={tags.filter((tag) => values.tags.includes(tag.value))}
                                                    options={tags}
                                                    className="react-select"
                                                    classNamePrefix="select"
                                                    onChange={(value: any): void => {
                                                        setFieldValue("tags", value === null ? [] : value.map((val: any) => val.value));
                                                    }}
                                                />
                                            </Box>
                                            <Tooltip aria-label="Add New Tag" label="Add New Tag" placement="top">
                                                <Button isDisabled={isSubmitting} variantColor="teal" ml={3} w="5%" onClick={this.toggleTagModal}>
                                                    <i className="fas fa-plus"></i>
                                                </Button>
                                            </Tooltip>
                                        </Box>
                                        <FormErrorMessage>{errors.tags}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="tags">Serie</FormLabel>
                                        <Box d="flex" flexDir="row">
                                            <Box w="95%">
                                                <Select
                                                    isDisabled={isSubmitting}
                                                    placeholder="Select serie if you want it in a serie"
                                                    name="serie"
                                                    isClearable
                                                    defaultValue={series.filter((serie) => serie.value === values.serie)[0]}
                                                    isSearchable
                                                    options={series}
                                                    className="react-select"
                                                    classNamePrefix="select"
                                                    onChange={(value: any): void => {
                                                        setFieldValue("serie", value === null ? 0 : value.value);
                                                        setFieldValue("useSerieCover", false);
                                                    }}
                                                />
                                            </Box>
                                            <Tooltip aria-label="Add New Serie" label="Add New Serie" placement="top">
                                                <Button isDisabled={isSubmitting} variantColor="teal" ml={3} w="5%" onClick={this.toggleSerieModal}>
                                                    <i className="fas fa-plus"></i>
                                                </Button>
                                            </Tooltip>
                                        </Box>
                                        <FormErrorMessage>{errors.tags}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.cover !== undefined && touched.cover}>
                                        <FormLabel htmlFor="cover">Cover</FormLabel>
                                        {values.serie !== 0 && (
                                            <Box mb={3}>
                                                <Checkbox isChecked={values.useSerieCover} isDisabled={isSubmitting} variantColor="teal" onChange={() => setFieldValue("useSerieCover", !values.useSerieCover)}>Use Serie's Cover</Checkbox>
                                            </Box>
                                        )}
                                        <Input type="text" isDisabled={values.useSerieCover || isSubmitting} name="cover" value={values.cover} id="cover" placeholder="Insert cover URL" onChange={handleChange} />
                                        <FormErrorMessage>{errors.cover}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="plot">Plot</FormLabel>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={values.plot}
                                            onChange={(event: any, editor: any) => {
                                                setFieldValue("plot", editor.getData());
                                            }}
                                            disabled={isSubmitting}
                                        />
                                        <FormErrorMessage>{errors.content}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.content !== undefined && touched.content}>
                                        <FormLabel htmlFor="content">Story</FormLabel>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={values.content}
                                            onChange={(event: any, editor: any) => {
                                                setFieldValue("content", editor.getData());
                                            }}
                                            disabled={isSubmitting}
                                        />
                                        <FormErrorMessage>{errors.content}</FormErrorMessage>
                                    </FormControl>

                                    <Button variantColor="teal" type="submit" isLoading={isSubmitting} mt={4}>Publish!</Button>
                                </Stack>
                            </form>
                        )}</Formik>
                    </FadeIn>
                )}
            </Box>
        )
    }
}
export default withRouter(StoryEdit)
