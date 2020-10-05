import React, { Component } from 'react'
import {withRouter, RouteComponentProps} from "react-router-dom";
import {
    NoDataView,
    IndexMenuControl,
    IndexMenuControlSortType,
    LoadingLayer
} from "./../../Components/Shared/Shared";
import {ListItem, TileItem} from "./StoryIndexItem";
import FadeIn from "react-fade-in"
import moment from "moment";
import {
    Box,
    Text
} from "@chakra-ui/core";
import { ShortStory } from "./../Models";
import API from "./../../api";
import { AxiosResponse } from "axios";
interface State {
    realData: ShortStory[];
    showData: ShortStory[];
    view: "tile" | "list";
    isLoading: boolean;
}

class StoryIndex extends Component<RouteComponentProps, State> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            realData: [],
            showData: [],
            view: "list",
            isLoading: true,
        }
    }
    setShowData = (data: any[] = []) => {
        this.setState({
            showData: data
        })
    }
    handleDelete = () => {
        this.setState({isLoading: true}, () => {
            this.fetchStoriesData();
        })
    }
    fetchStoriesData = (): void => {
        API().get<{ data: { stories: ShortStory[] } }>("story")
            .then((resp) => {
                const { data } = resp.data;
                this.setState({
                    realData: data.stories,
                    showData: data.stories,
                    isLoading: false
                })
            })
            .catch(err => console.log(err.response))
    }
    componentDidMount() {
        this.fetchStoriesData()
    }
    render() {
        const { realData, showData, view, isLoading } = this.state;
        const sorts: IndexMenuControlSortType[] = [
            {
                key: "title",
                label: "By Title"
            },
            {
                key: "lastUpdated",
                label: "By Last Updated",
                type: "date"
            },
        ]
        return (
            <React.Fragment>
                <FadeIn>
                    <IndexMenuControl
                        onTotalSizePerPageChange={(data) => this.setShowData(data)}
                        onViewChange={(view: "list" | "tile") => this.setState({ view })}
                        onSortChange={(data) => this.setShowData(data)}
                        onCurrentPageChange={(data) => this.setShowData(data)}
                        sorts={sorts}
                        disabledAll={realData.length < 1}
                        searchIndex="title"
                        onSearchChange={(data) => this.setShowData(data)}
                        data={realData}
                        addText="Add New Story"
                        onAddButtonClick={() => this.props.history.push("/admin/story/add")}
                    />
                </FadeIn>
                {isLoading ? <LoadingLayer isLoading={isLoading} /> : showData.length > 0 ? (
                    <Box d="flex" mt={10} flexDir={view === "list" ? "column" : "row"} justifyContent="left" flexWrap="wrap">
                        {showData.map((data, key) => {
                            return view === "list" ? <ListItem key={key} story={data} afterDelete={this.handleDelete} /> : <TileItem story={data} key={key} afterDelete={this.handleDelete} />
                        })}
                    </Box>
                ) : <FadeIn><NoDataView /></FadeIn>}
            </React.Fragment>
        )
    }
}
export default withRouter(StoryIndex)
