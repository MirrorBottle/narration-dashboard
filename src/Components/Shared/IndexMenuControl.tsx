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
import moment from "moment";

export interface SortType {
    label: string;
    key: string;
    type?: "date"
}

interface State {
    currentTotalSizePerPage: number | "All";
    totalSizePerPages: ("All" | number)[];
    currentSortKey: string;
    currentSortOrder: "asc" | "desc" | "";
    currentPage: number;
    pagedData: any[];
    totalPages: number;
    maxPaginationButton: number;
}

interface Props {
    data: any[];
    processData?: boolean;
    onTotalSizePerPageChange?: (processedData?: any[], totalPage?: number | "All") => any;
    onViewChange?: (view: "list"|"tile") => any;
    onSortChange?: (sortedData?:any[]) => any;
    onSearchChange?: (resultData?:any[]) => any;
    onCurrentPageChange?: (currentData?:any[], pagedData?: any[]) => any;
    onAddButtonClick?: () => any;
    addText?: string;
    addTextIcon?: JSX.Element;
    disabledAll?: boolean;
    sorts?: SortType[];
    
    searchIndex?: string;
}

export default class IndexMenuControl extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentTotalSizePerPage: "All",
            totalSizePerPages: [5, 10, 50, 100, "All"],
            currentSortKey: "",
            currentSortOrder: "",
            pagedData: [],
            currentPage: 0,
            totalPages: 0,
            maxPaginationButton: 15,
        }
    }
    resetPaginationData = () => {
        this.setState({
            pagedData: [],
            currentPage: 0,
            totalPages: 0
        })
    }
    getPagedData = (data: any[], size:number) => {
        let results = [];
        for(let i = 0; i < data.length; i+= size) {
            results.push(data.slice(i, i+size));
        }
        return results;
    }

    onChangeCurrentTotalSizePerPage = (currentTotalSizePerPage:number|"All") => {
        const {data} = this.props;
        this.setState({currentTotalSizePerPage}, () => {
            if(currentTotalSizePerPage !== "All") {
                const pagedData = this.getPagedData(data, currentTotalSizePerPage);
                this.setState({
                    pagedData,
                    totalPages: pagedData.length,
                    currentPage: 0
                })
            }
            const processedData = currentTotalSizePerPage === "All" ? data : data.slice(0, currentTotalSizePerPage);
            console.log(processedData);
            this.props.onTotalSizePerPageChange && this.props.onTotalSizePerPageChange(processedData, currentTotalSizePerPage)
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

    onSortDataDate = (data:any[], sortKey: string, order: "asc"|"desc"|"") => {
        if (order === "asc") {
            return data.sort((a, b) => moment(a[sortKey]).diff(moment(b[sortKey])))
        } else if (order === "desc") {
            return data.sort((a, b) => moment(b[sortKey]).diff(moment(a[sortKey])))
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

    onChangeSortData = (sortKey: string, extraType?: "date") => {
        const {data} = this.props;
        console.log(extraType);
        const currentSortOrder = this.getNextcurrentSortOrder(sortKey); 
        this.setState({currentSortKey: sortKey, currentSortOrder}, () => {
            const sortKeyType = typeof data[0][sortKey];
            let sortedData = [];
            if (sortKeyType === "string") {
                sortedData = this.onSortDataString(data, sortKey, currentSortOrder);
            } else if(sortKeyType === "number") {
                sortedData = this.onSortDataNumber(data, sortKey, currentSortOrder);
            } else if (extraType && extraType === "date") {
                sortedData = this.onSortDataDate(data, sortKey, currentSortOrder);
            }
            this.onChangeCurrentTotalSizePerPage("All");
            this.resetPaginationData();
            this.props.onSortChange && this.props.onSortChange(sortKey === "" ? data : sortedData);
        })
    }

    onChangeView = (view: "list" | "tile") => this.props.onViewChange && this.props.onViewChange(view);

    onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {data, searchIndex = ""} = this.props;
        const resultData = data.filter((d) => d[searchIndex].toUpperCase().includes(e.target.value.toUpperCase()));
        this.resetPaginationData();
        this.props.onSearchChange && this.props.onSearchChange(resultData);
    }

    onChangeCurrentPage = (page:number) => {
        const {pagedData} = this.state;
        console.log(page);
        this.setState({currentPage: page}, () => {
            this.props.onCurrentPageChange && this.props.onCurrentPageChange(pagedData[page], pagedData);
        })
    }
    render() {
        const {
            currentTotalSizePerPage, 
            totalSizePerPages, 
            currentSortKey, 
            currentSortOrder, 
            totalPages,
            currentPage,
            maxPaginationButton
        } = this.state;
        const {sorts, disabledAll, addText, addTextIcon, onAddButtonClick} = this.props;
        return (
            <Box w="100%" borderWidth="1px" p={4} rounded="lg" d="flex" flexDirection="column">
                <Box w="100%" d="flex" flexDirection={{ sm: "column", md: "row" }}>
                    <Box w={{ sm: "100%", md: "80%" }} p={2}>
                        <Input isDisabled={disabledAll} onChange={this.onSearchChange} focusBorderColor="teal.500" placeholder="Search anime by its title" />
                    </Box>
                    <Box w={{ sm: "100%", md: "20%" }} p={2}>
                        <Button onClick={() => onAddButtonClick && onAddButtonClick()} h={{ sm: "40px", md: "100%" }}  w="100%" variantColor="teal">
                            {addTextIcon || <i className="fas fa-plus"></i>}
                            <Text ml={2}>{addText || "Add New Data"}</Text>
                        </Button>
                    </Box>
                </Box>
                <Box w="100%" d="flex" flexDirection={{ sm: "column", md: "row" }}>
                    {sorts && (
                        <Box w={{ sm: "100%", md: "80%" }} p={2}>
                            <Text color="teal.500">Sort : </Text>
                            <Box d="flex" flexDirection="row" flexWrap="wrap">
                                {sorts.map((sort) => (
                                    <Button isDisabled={disabledAll} key={sort.key} size="sm" className={`sort-btn ${currentSortKey === sort.key ? "active" : ""}`} onClick={() => this.onChangeSortData(sort.key, sort.type)} mr={1} mt={1} variantColor="teal">
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
                        <Button isDisabled={disabledAll} h={{ sm: "40px", md: "55px" }} mr={1} w="100%" variantColor="teal" onClick={() => this.onChangeView("list")}>
                            <i className="fas fa-list"></i>
                        </Button>
                        <Button isDisabled={disabledAll} h={{ sm: "40px", md: "55px" }} onClick={() => this.onChangeView("tile")} mr={1} w="100%" variantColor="teal">
                            <i className="fas fa-th"></i>
                        </Button>
                        <Menu>
                            <MenuButton as={Button} h={{ sm: "40px", md: "55px" }} mr={1} w="100%" >
                                {currentTotalSizePerPage}
                            </MenuButton>
                            <MenuList>
                                {totalSizePerPages.map((page, index) => (
                                    <MenuItem isDisabled={disabledAll} key={index} onClick={() => this.onChangeCurrentTotalSizePerPage(page)}>{page}</MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </Box>
                </Box>
                {currentTotalSizePerPage !== "All" && (
                    <Box w="100%" d="flex" mt={4} flexDirection="row" alignItems="center" justifyContent="center">
                        {(totalPages > maxPaginationButton) && (
                            <Button onClick={() => this.onChangeCurrentPage(0)} mx={1} h="40px" isDisabled={disabledAll} w="30px" variantColor="teal">
                                <i className="fas fa-chevron-left"></i>
                            </Button>
                        )}
                        {(currentPage >= 2 && totalPages > maxPaginationButton) && (
                            <Button mx={1} h="40px" isDisabled={disabledAll} w="30px" variantColor="teal">
                                <i className="fas fa-ellipsis-h"></i>
                            </Button>
                        )}
                        {[...Array(totalPages)].map((page, i) => (
                            ((i < maxPaginationButton + currentPage && i >= currentPage || currentPage - i === 1 || (i > maxPaginationButton && currentPage > maxPaginationButton)) || totalPages <= maxPaginationButton) && (
                                <Button className={`pagination-btn ${i === currentPage ? "active" : ""}`} onClick={() => this.onChangeCurrentPage(i)} mx={1} key={i} h="40px" isDisabled={disabledAll} w="30px" variantColor="teal">
                                    <Text>{i + 1}</Text>
                                </Button>
                            )
                        ))}
                        {(currentPage + maxPaginationButton < totalPages && currentPage + maxPaginationButton - totalPages !== 0 && totalPages > maxPaginationButton) && (
                            <Button mx={1} h="40px" isDisabled={disabledAll} w="30px" variantColor="teal">
                                <i className="fas fa-ellipsis-h"></i>
                            </Button>
                        )}
                        {totalPages > maxPaginationButton && (
                            <Button onClick={() => this.onChangeCurrentPage(totalPages - 1)} mx={1} h="40px" isDisabled={disabledAll} w="30px" variantColor="teal">
                                <i className="fas fa-chevron-right"></i>
                            </Button>
                        )}
                    </Box>
                )}
            </Box>  
        )
    }
}
