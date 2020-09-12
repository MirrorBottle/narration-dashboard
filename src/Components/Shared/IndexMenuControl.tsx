import React, { Component } from 'react'
import {
    Box,
    Input,
    Button,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/core";

export interface SortType {
    label: string;
    key: string;
}

interface State {
    currentTotalPage: number | "All";
    totalPages: ("All" | number)[];
    currentSortKey: string;
    currentSortOrder: "asc" | "desc" | "";
}

interface Props {
    data: any[];
    processData?: boolean;
    onTotalPageChange?: (processedData?: any[], totalPage?: number | "All") => any;
    onViewChange?: (view: "list"|"tile") => any;
    onSortChange?: (sortedData?:any[]) => any;
    onSearchChange?: (resultData?:any[]) => any;
    disabledAll?: boolean;
    sorts?: SortType[];
    searchIndex?: string;
}

export default class IndexMenuControl extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentTotalPage: "All",
            totalPages: [10, 50, 100, "All"],
            currentSortKey: "",
            currentSortOrder: "",
        }
    }

    changeCurrentTotalPage = (currentTotalPage:number|"All") => {
        const {data} = this.props;
        this.setState({currentTotalPage}, () => {
            console.log(currentTotalPage);
            const processedData = currentTotalPage === "All" ? data : data.slice(0, currentTotalPage);
            this.props.onTotalPageChange && this.props.onTotalPageChange(processedData, currentTotalPage)
        });
    }

    onSortDataString = (data: any[], sortKey: string, order: "asc" | "desc" | "") => {
        if (order === "asc") {
            return data.sort((a, b) => a[sortKey].toUpperCase() > b[sortKey].toUpperCase() ? 1 : -1)
        } else if (order === "desc") {
            return data.sort((a, b) => a[sortKey].toUpperCase() < b[sortKey].toUpperCase() ? 1 : -1)
        }
        return data;
    }

    onSortDataNumber = (data:any[], sortKey:string, order:"asc"|"desc"|"") => {
        if(order === "asc") {
            return data.sort((a, b) => a[sortKey] - b[sortKey])
        } else if(order === "desc" ) {
            return data.sort((a, b) => b[sortKey] - a[sortKey])
        }
        return data;
    }

    getNextcurrentSortOrder = (sortKey: string) => {
        const {currentSortOrder, currentSortKey} = this.state;
        if(currentSortOrder === "asc" && currentSortKey === sortKey) {
            return "desc";
        } else if (currentSortOrder === "desc" && currentSortKey === sortKey) {
            return "";
        }
        return "asc";
    }
    changeSortData = (sortKey: string) => {
        const {data} = this.props;
        const currentSortOrder = this.getNextcurrentSortOrder(sortKey);
        this.setState({currentSortKey: sortKey, currentSortOrder}, () => {
            const sortKeyType = typeof data[0][sortKey];
            let sortedData = [];
            if (sortKeyType === "string") {
                sortedData = this.onSortDataString(data, sortKey, currentSortOrder);
            } else if(sortKeyType === "number") {
                sortedData = this.onSortDataNumber(data, sortKey, currentSortOrder);
            }
            this.changeCurrentTotalPage("All");
            this.props.onSortChange && this.props.onSortChange(sortKey === "" ? data : sortedData);
        })
    }

    changeView = (view: "list" | "tile") => this.props.onViewChange && this.props.onViewChange(view);
    onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {data, searchIndex = ""} = this.props;
        const resultData = data.filter((d) => d[searchIndex].toUpperCase().includes(e.target.value.toUpperCase()));
        this.props.onSearchChange && this.props.onSearchChange(resultData);
    }
    render() {
        const {currentTotalPage, totalPages, currentSortKey, currentSortOrder,} = this.state;
        const {sorts, disabledAll} = this.props;
        return (
            <Box w="100%" borderWidth="1px" p={4} rounded="lg" d="flex" flexDirection="column">
                <Box w="100%" d="flex" flexDirection={{ sm: "column", md: "row" }}>
                    <Box w={{ sm: "100%", md: "80%" }} p={2}>
                        <Input isDisabled={disabledAll} onChange={this.onSearchChange} focusBorderColor="teal.500" placeholder="Search anime by its title" />
                    </Box>
                    <Box w={{ sm: "100%", md: "20%" }} p={2}>
                        <Button h={{ sm: "40px", md: "100%" }} isDisabled={disabledAll} w="100%" variantColor="teal">
                            <i className="fas fa-plus"></i>
                            <Text ml={2}>Add New Anime</Text>
                        </Button>
                    </Box>
                </Box>
                <Box w="100%" d="flex" flexDirection={{ sm: "column", md: "row" }}>
                    {sorts && (
                        <Box w={{ sm: "100%", md: "80%" }} p={2}>
                            <Text color="teal.500">Sort : </Text>
                            <Box d="flex" flexDirection="row" flexWrap="wrap">
                                {sorts.map((sort) => (
                                    <Button isDisabled={disabledAll} key={sort.key} size="sm" className={`sort-btn ${currentSortKey === sort.key ? "active" : ""}`} onClick={() => this.changeSortData(sort.key)} mr={1} mt={1} variantColor="teal">
                                        {currentSortOrder !== "" && currentSortKey === sort.key ? (
                                            <i className={`${currentSortOrder === "asc" ? "fas fa-caret-down" : "fas fa-caret-up"}`}></i>
                                        ) : null}
                                        <Text ml={currentSortOrder !== "" && currentSortKey ? 2 : 0}>{sort.label}</Text>
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    )}
                    <Box w={{ sm: "100%", md: "30%" }} p={2} d="flex" flexDirection="row" alignItems="center">
                        <Button isDisabled={disabledAll} h={{ sm: "40px", md: "55px" }} mr={1} w="100%" variantColor="teal" onClick={() => this.changeView("list")}>
                            <i className="fas fa-list"></i>
                        </Button>
                        <Button isDisabled={disabledAll} h={{ sm: "40px", md: "55px" }} onClick={() => this.changeView("tile")} mr={1} w="100%" variantColor="teal">
                            <i className="fas fa-th"></i>
                        </Button>
                        <Menu>
                            <MenuButton as={Button} h={{ sm: "40px", md: "55px" }} mr={1} w="100%" >
                                {currentTotalPage}
                            </MenuButton>
                            <MenuList>
                                {totalPages.map((page, index) => (
                                    <MenuItem isDisabled={disabledAll} key={index} onClick={() => this.changeCurrentTotalPage(page)}>{page}</MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </Box>
                </Box>
            </Box>  
        )
    }
}
