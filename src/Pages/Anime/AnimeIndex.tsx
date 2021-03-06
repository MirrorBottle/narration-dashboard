import React, { Component } from 'react'
import { 
    NoDataView, 
    IndexMenuControl, 
    IndexMenuControlSortType,
    LoadingLayer
} from "./../../Components/Shared/Shared";
import FadeIn from "react-fade-in"
import moment from "moment";
import {
    Box,
    Text
} from "@chakra-ui/core";
import {ShortAnime} from "./../Models";
import {AnimeIndexItemList, AnimeIndexItemTile} from "./AnimeIndexItem";
import AnimeAddModal from "./AnimeAddModal";
import API from "./../../api";
import {AxiosResponse} from "axios";
interface State {
    realData: ShortAnime[];
    showData: ShortAnime[];
    view: "tile" | "list";
    isLoading: boolean;
    isAddModalOpen: boolean;
}
class AnimeIndex extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            realData: [],
            showData: [],
            view: "tile",
            isLoading: true,
            isAddModalOpen: false,
        }
    }
    toggleAddModal = () => {
        this.setState({isAddModalOpen: !this.state.isAddModalOpen})
    }
    setShowData = (data: any[] = []) => {
        this.setState({
            showData: data
        })
    }
    componentDidMount() {
        API().get<{ data: { animes: ShortAnime[]}}>("anime")
            .then((resp) => {
                const {data} = resp.data;
                this.setState({
                    realData: data.animes,
                    showData: data.animes,
                    isLoading: false
                })
            })
            .catch(err => console.log(err.response))
            
    }
    render() {
        const {realData, showData, view, isLoading, isAddModalOpen} = this.state;
        const sorts: IndexMenuControlSortType[] = [
            {
                key: "name",
                label: "By Name"
            },
            {
                key: "knownAs",
                label: "By Known Title"
            },
            {
                key: "lastUpdated",
                label: "By Last Updated",
                type: "date"
            }
        ]
        return (
            <React.Fragment>
                <AnimeAddModal isOpen={isAddModalOpen} onClose={this.toggleAddModal} />
                <FadeIn>
                    <IndexMenuControl
                        onTotalSizePerPageChange={(data) => this.setShowData(data)}
                        onViewChange={(view: "list" | "tile") => this.setState({ view })}
                        onSortChange={(data) => this.setShowData(data)}
                        onCurrentPageChange={(data) => this.setShowData(data)}
                        sorts={sorts}
                        disabledAll={realData.length < 1}
                        searchIndex="name"
                        onSearchChange={(data) => this.setShowData(data)}
                        data={realData}
                        addText="Add New Anime"
                        onAddButtonClick={this.toggleAddModal}
                    />
                </FadeIn>
                {isLoading ? <LoadingLayer isLoading={isLoading} /> : showData.length > 0 ? (
                    <Box d="flex" mt={10} flexDir={view === "list" ? "column" : "row"} ml={{ md: "2%" }} justifyContent="left" flexWrap="wrap">
                        {showData.map((data, key) => {
                            return view === "list" ? (
                                <FadeIn delay={key * 2}>
                                    <AnimeIndexItemList data={data} key={key} />
                                </FadeIn>
                            ) : (
                                    <AnimeIndexItemTile data={data} key={key} />
                                )
                        })}
                    </Box>
                ) : <FadeIn><NoDataView /></FadeIn>}
            </React.Fragment>
        )
    }
}
export default AnimeIndex
