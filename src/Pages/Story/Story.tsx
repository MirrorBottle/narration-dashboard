import React, { Component } from 'react'
import {
    Box,
    Text,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Badge,
    Stack,
    Image,
    Collapse,
    Skeleton
} from "@chakra-ui/core"
import {RouteComponentProps, withRouter} from "react-router-dom"
import {StoryStatusWithColor, FullStory, EmptyFullStory} from "../Models"
import API from "../../api";
interface State {
    isCoverShown: boolean;
    isLoading: boolean;
    story: FullStory
}
class Story extends Component<RouteComponentProps<{id: string}>, State> {
    constructor(props: RouteComponentProps<{id:string}>) {
        super(props);
        this.state = {
            isCoverShown: false,
            isLoading: true,
            story: EmptyFullStory
        }
    }
    toggleCover = () => {
        this.setState({isCoverShown: !this.state.isCoverShown})
    }
    componentDidMount() {
        console.log(StoryStatusWithColor)
        API().get(`story/${this.props.match.params.id}`)
            .then((res) => {
                console.log(res)
                this.setState({
                    story: res.data.data.story,
                    isLoading: false
                })
            })
            .catch((err) => console.log(err.response))
    }
    render() {
        const {isCoverShown, isLoading, story} = this.state;
        return (
            <React.Fragment>
                <Box d="flex" justifyContent="left" flexDirection={{ sm: "column", md: "row" }} borderWidth="1px" p={6} rounded="lg">
                    <Box w={{ md: "70%", sm: "100%" }}>
                        <Text color="teal.500" fontSize="3rem" fontWeight="bold">{isLoading ? <Skeleton height="3rem" w="90%" /> : story.title}</Text>
                        {isLoading ? <Skeleton height="1.2rem" w="60%" mt={2} /> : StoryStatusWithColor.filter((status) => status.value === story.status).map((status) => (
                            <Badge d="inline" variantColor={status.color} px={5} mb={3} fontSize="1.2rem" fontWeight="bold" ml={1}>{status.label}</Badge>
                        ))}
                        <br/>
                        {isLoading ? <Skeleton height="1rem" w="40%" mt={2} /> : story.serie ? <Badge variantColor="teal" fontSize="1rem" my={2} variant="solid" ml={1} px={2} py={1} rounded="sm">{story.serie}</Badge> : <Text ml={1}><i>Not in a serie</i></Text>}
                        <Stack isInline>
                            {isLoading ? (
                                <React.Fragment>
                                    <Skeleton height=".8rem" w="10%" mt={2} mr={2} />
                                    <Skeleton height=".8rem" w="10%" mt={2} />
                                </React.Fragment>
                            ): (
                                story.tags.map((tag, key) => (
                                    <Badge key={key} variantColor="teal" fontSize=".8rem" mt={2} ml={1} mb={2} px={2} py={1} >{tag}</Badge>
                                ))
                            )}
                        </Stack>
                    </Box>
                    <Box d="flex" w={{ md: "30%", sm: "100%" }} flexDirection={{ sm: "row", md: "column" }} justifyContent={{ md: "center", sm: "flex-start" }} mt={{ sm: 3 }}>
                        <Button mr={{ sm: 3, md: 0 }} isDisabled={isLoading} size="lg" mt={{ sm: 0, md: 3 }} variantColor="yellow" onClick={() => this.props.history.push(`/admin/story/edit/${story.id}`)}>
                            <i className="fas fa-pen"></i>
                            <Text ml={2}>Edit</Text>
                        </Button>
                        <Menu>
                            <MenuButton as={Button} size="lg" mt={{ sm: 0, md: 3 }} background="teal.700" backgroundColor="teal.500" _hover={{ bg: "teal.700" }} color="white" mr={{ sm: 3, md: 0 }} >
                                <i className="fas fa-file"></i>
                                <Text ml={2}>Change Status</Text>
                            </MenuButton>
                            <MenuList>
                                {StoryStatusWithColor.map((status, index) => (
                                    <MenuItem isDisabled={isLoading} key={index}>{status.label}</MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                        <Button isDisabled={isLoading} variantColor="red" size="lg" mt={{ sm: 0, md: 3 }} mr={{ sm: 3, md: 0 }}>
                            <i className="fas fa-trash-alt"></i>
                            <Text ml={2}>Delete</Text>
                        </Button>
                        <Button isDisabled={isLoading} variantColor="blue" size="lg" mt={{ sm: 0, md: 3 }} onClick={this.toggleCover}>
                            <i className="fas fa-image"></i>
                            <Text ml={2}>{isCoverShown ? "Hide" : "Show"} Cover</Text>
                        </Button>
                    </Box>
                </Box>
                <Collapse mt={10} borderWidth="1px" p={6} rounded="lg" isOpen={isCoverShown}>
                    {story.cover ? <Image src={story.cover} w="100%" h={{ md: "25rem", sm: "15rem" }} objectFit="cover" rounded="lg" /> : <Text><i>Cover hasn't provided</i></Text>}
                </Collapse>
                <Box mt={10} borderWidth="1px" p={6} rounded="lg">
                    <Text color="teal.500" fontSize="2.3rem">Plot</Text>
                    {isLoading ? <Skeleton height="8rem" w="100%" /> : (
                        <Text dangerouslySetInnerHTML={{ __html: `${story.plot ? story.plot : "<i>Plot hasn't provided</i>"}` }}></Text>
                    )}
                    <Text color="teal.500" fontSize="2.3rem" mt={2}>Content</Text>
                    {isLoading ? <Skeleton height="12rem" w="100%" /> : (
                        <Text dangerouslySetInnerHTML={{ __html: story.content }}></Text>
                    )}
                </Box>
            </React.Fragment>
        )
    }
}
export default withRouter(Story)
