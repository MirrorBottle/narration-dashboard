import React, { Component } from 'react'
import IndexMenuControl, {SortType} from "./../../Components/Shared/IndexMenuControl";
import {
    Box,
    Text
} from "@chakra-ui/core";
import anime, { Anime } from "./anime";


interface State {
    realData: Anime[];
    showData: Anime[];
    view: "tile" | "list";
}
class AnimeIndex extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            realData: anime,
            showData: anime,
            view: "list",
        }
    }
    componentDidMount() {
        console.log(anime.length);
    }
    setShowData = (data: any[] = []) => {
        this.setState({
            showData: data
        })
    }

    render() {
        const {realData, showData, view} = this.state;
        const sorts: SortType[] = [
            {
                key: "name",
                label: "By Name"
            },
            {
                key: "rate",
                label: "By Rate"
            },
            {
                key: "watchHour",
                label: "By Watch Hour"
            }
        ]
        return (
            <div>
                <IndexMenuControl 
                    onTotalPageChange={(data) => this.setShowData(data)}
                    onViewChange={(view: "list"|"tile") => this.setState({view})}
                    onSortChange={(data) => this.setShowData(data)}
                    sorts={sorts}
                    searchIndex="name"
                    disabledAll={realData.length < 1}
                    onSearchChange={(data) => this.setShowData(data)}
                    data={realData}
                />
                {showData.length > 0 ? (
                    <Box d="flex" mt={10} flexDir={view === "list" ? "column" : "row"} flexWrap="wrap">
                        {showData.map((data, key) => (
                            <Box w={view === "list" ? "100%" : "33%"} mr={view === "list" ? 0 : 1} key={key} borderWidth="1px" mt={3} py={5} rounded="lg" px={10} d="flex" alignContent="left" justifyContent="center" flexDir="column"
                                alignItems="left">
                                <Text color="teal.500" fontSize="1.5rem">
                                    {data.name}
                                </Text>
                                <Text color="gray.500" fontSize="1rem">
                                    {data.desc}
                                </Text>
                                <Text color="gray.500" fontSize="1rem">
                                    {data.watchHour} Hours of watch
                                </Text>
                                <Text color="teal.500" fontSize="1rem">
                                    <i className="fas fa-star"></i>&nbsp;{data.rate}
                                </Text>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Box d="flex" flexDir="column" mt={10} alignItems="center">
                        <Text color="gray.500">
                            <i className="fas fa-times fa-4x"></i>
                        </Text>
                        <Text color="gray.500" fontSize="2rem">No Data Found</Text>
                    </Box>
                )}
            </div>
        )
    }
}
export default AnimeIndex
