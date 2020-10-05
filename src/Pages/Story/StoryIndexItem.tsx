import React, {Component} from 'react'
import {
    Box,
    Text,
    Badge,
    Stack,
    Button,
} from "@chakra-ui/core";
import {ShortStory} from "../Models";
import FadeIn from "react-fade-in"
import {Alert, Confirm} from "../../Components/Shared/Shared";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import API from "../../api";

interface Props {
    story: ShortStory;
    afterDelete: Function;
}
const handleDelete = (id: number, callback: Function): void => {
    Confirm("Yeah, hope you won't regret it.")
        .then(() => {
            API().delete(`story/${id}`)
                .then(res => Alert("success", "Delete Story", res.data.message))
                .catch(err => Alert("error", "Oops..", err.response.data.message))
                .finally(() => callback())
        })
}
class TileItemClass extends Component<Props & RouteComponentProps> {
    render() {
        const {story, afterDelete} = this.props;
        return (
            <FadeIn className="fade-in-tile">
                <Box w={{ sm: "100%", md: "21rem" }} mx={{ md: 4 }} h="100%" borderWidth="1px" mt={{ sm: 4, md: 3 }} overflow="hidden" d="flex" flexDir="column" justifyContent="center" alignItems="center" rounded="lg" p={6}>
                    <Text color="teal.500" mb={3} fontSize="2rem" textAlign="center"  >
                        {story.title}
                    </Text>
                    <Stack isInline mb={3}>
                        {story.tags.map((tag, key) => <Badge key={key} variantColor="teal" p={1}>{tag}</Badge>)}
                    </Stack>
                    {story.serie ? <Badge variant="solid" variantColor="teal" p={1}>{story.serie}</Badge> : <Text><i>Not in a serie</i></Text>}
                    <Box d="flex" w="100%" mt={8} flexDir="row" alignItems="center" justifyContent={{ sm: "center", md: "flex-end" }}>
                        <Button variantColor="red" mr={1} onClick={() => handleDelete(story.id, afterDelete)}>
                            <i className="fas fa-trash-alt"></i>
                            <Text ml={2}>Delete</Text>
                        </Button>
                        <Button variantColor="yellow" mr={1} onClick={() => this.props.history.push(`/admin/story/edit/${story.id}`)}>
                            <i className="fas fa-pen"></i>
                            <Text ml={2}>Edit</Text>
                        </Button>
                        <Button variantColor="teal" onClick={() => this.props.history.push(`/admin/story/${story.id}`)}>
                            <i className="fas fa-eye"></i>
                            <Text ml={2}>Detail</Text>
                        </Button>
                    </Box>
                </Box>
            </FadeIn>
        )
    }
}

class ListItemClass extends Component<Props & RouteComponentProps> {
    render() {
        const {story, afterDelete} = this.props;
        return (
            <FadeIn>
                <Box w="100%" borderWidth="1px" mt={3} py={5} rounded="lg" px={10} d="flex" justifyContent="left" flexDirection={{ sm: "column", md: "row" }}>
                    <Box d="flex" flexDir="column" ml={{ sm: 0, md: 4 }} mt={{ sm: 2, md: 0 }} w={{ sm: "100%", md: "70%" }}>
                        <Text color="teal.500" fontSize="2.4rem" textAlign="left">
                            {story.title}
                        </Text>
                        <Stack isInline mb={2} mt={3}>
                            <Text fontSize="1rem" textAlign="left">
                                <b>Tags :</b>
                            </Text>
                            {story.tags.map((tag, key) => <Badge key={key} variantColor="teal" p={1}>{tag}</Badge>)}
                        </Stack>
                        <Stack isInline mb={4}>
                            <Text fontSize="1rem" textAlign={{ sm: "center", md: "left" }}>
                                <b>Serie :</b>
                            </Text>
                            {story.serie ? <Badge variantColor="teal" variant="solid" p={1}>{story.serie}</Badge> : <Text><i>Not in a serie</i></Text>}
                        </Stack>
                        <Text display={{ sm: "none", md: "block" }} color="gray.700" mt={2} fontSize="1rem" textAlign={{ sm: "center", md: "left" }} dangerouslySetInnerHTML={{ __html: `${story.plot ? story.plot.length > 90 ? `${story.plot.substring(0, 90)}...` : story.plot : "<i>Plot hasn't provided</i>"}` }}>
                        </Text>
                    </Box>
                    <Box d="flex" w={{ sm: "100%", md: "30%" }} mt={{ sm: 4, md: 0 }} flexDir="row" alignItems="center" justifyContent={{ sm: "flex-start", md: "flex-end" }}>
                        <Button variantColor="red" mr={1} onClick={() => handleDelete(story.id, afterDelete)}>
                            <i className="fas fa-trash-alt"></i>
                            <Text ml={2}>Delete</Text>
                        </Button>
                        <Button variantColor="yellow" mr={1} onClick={() => this.props.history.push(`/admin/story/edit/${story.id}`)}>
                            <i className="fas fa-pen"></i>
                            <Text ml={2}>Edit</Text>
                        </Button>
                        <Button variantColor="teal" onClick={() => this.props.history.push(`/admin/story/${story.id}`)}>
                            <i className="fas fa-eye"></i>
                            <Text ml={2}>Detail</Text>
                        </Button>
                    </Box>
                </Box>
            </FadeIn>
        )
    }
}

export const ListItem = withRouter(ListItemClass);
export const TileItem = withRouter(TileItemClass);