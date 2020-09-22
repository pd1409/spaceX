import React from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { List, ListItem, withStyles, Grid, TextField, Link, TableFooter, TablePagination } from '@material-ui/core';
import { connect } from "react-redux";
import { httpRequest } from "../../../../../../ui-utils/api"
import { mapDispatchToProps } from "../../../../../../ui-utils/commons";
import isEmpty from "lodash/isEmpty";
import TablePaginationActions from "../../../../../../ui-molecules/TablePaginationActions";

const columns = [
    "Id", "Title", "Flight Number", "Date & Time"
]
const styles = {
    root: {
        padding: "0px 70px"
    },
    textField: {
        margin: "16px 0px",
        width: "25%"
    },
    tableCell: {
        color: "white"
    }
}
class History extends React.Component {
    state = {
        open: false,
        rows: [],
        page: 0,
        rowsPerPage: 5
    }
    componentDidMount = async () => {
        const { setAppData } = this.props;
        let response = await httpRequest({
            endPoint: "/history",
            method: "get",
        });
        response = response && response.map(res => { return { ...res, open: false } })
        setAppData(`historyResponse`, response);
        this.prepareTableData(response);

    };
    prepareTableData = (response = [], e) => {
        const { setAppData } = this.props;
        const rows = [];
        let searchText = "";
        if (!isEmpty(e)) {
            searchText = e.target.value;
            searchText = searchText.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        }
        try {
            response.forEach(data => {
                let row = {};
                row.id = data.id;
                row.title = data.title;
                row.flight_number = data.flight_number;
                row.event_date_utc = data.event_date_utc;
                row.links = data.links;
                row.open = data.open;

                (!searchText ||
                    row.id
                        .toString()
                        .toLowerCase()
                        .search(searchText.toLowerCase()) !== -1 ||
                    row.title
                        .toString()
                        .toLowerCase()
                        .search(searchText.toLowerCase()) !== -1 ||
                    (row.flight_number && row.flight_number
                        .toString()
                        .toLowerCase()
                        .search(searchText.toLowerCase()) !== -1)) &&
                    rows.push(row);
            });
        } catch (e) {
            let snackbarObj = {};
            snackbarObj["open"] = true;
            snackbarObj["variant"] = "error";
            snackbarObj["message"] = "Something went wrong";
            setAppData("snackbar", snackbarObj);
        }

        this.setState({ rows })
    };
    toggleCollapse = (index) => {
        let { rows } = this.state;
        rows && rows.forEach((row, idx) => {
            if (idx === index) {
                row.open = !row.open
            }
        })
        this.setState({ rows })
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };
    render() {
        const { historyResponse = [], classes } = this.props;
        const { rows, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        return (
            <Grid item md={12} className={classes.root}>
                <TextField
                    className={classes.textField}
                    onChange={(e) => this.prepareTableData(historyResponse, e)}
                    placeholder="Search by Id, Title or Flight Number"
                />
                <TableContainer component={Paper} style={{ background: "#004F84" }}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell className={classes.tableCell}>{columns[0]}</TableCell>
                                <TableCell className={classes.tableCell} align="center">{columns[1]}</TableCell>
                                <TableCell className={classes.tableCell} align="center">{columns[2]}</TableCell>
                                <TableCell className={classes.tableCell} align="right">{columns[3]}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ opacity: 0.6 }}>
                            {rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <React.Fragment key={row.id}>
                                    <TableRow className={classes.root}>
                                        <TableCell className={classes.tableCell}>
                                            <IconButton className={classes.tableCell} aria-label="expand row" size="small" onClick={() => this.toggleCollapse(index)}>
                                                {row.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell className={classes.tableCell} component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell className={classes.tableCell} align="center">{row.title}</TableCell>
                                        <TableCell className={classes.tableCell} align="center">{row.flight_number || `-`}</TableCell>
                                        <TableCell className={classes.tableCell} align="right">{row.event_date_utc}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCell} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={row.open} timeout="auto" unmountOnExit>
                                                <Box margin={1}>
                                                    <Typography>{row.details}</Typography>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        <em>Want to know more?</em>
                                                    </Typography>
                                                    <List>
                                                        {row.links.article &&
                                                            <ListItem>
                                                                <span style={{ fontSize: 14, fontWeight: 700 }}>Article - &nbsp;</span>
                                                                <Link target="_blank" href={row.links.article} >{row.links.article}</Link>
                                                            </ListItem>
                                                        }
                                                        {row.links.reddit &&
                                                            <ListItem>
                                                                <span style={{ fontSize: 14, fontWeight: 700 }}>Reddit - &nbsp;</span>
                                                                <Link target="_blank" href={row.links.reddit}>{row.links.reddit}</Link>
                                                            </ListItem>
                                                        }
                                                        {row.links.wikipedia &&
                                                            <ListItem>
                                                                <span style={{ fontSize: 14, fontWeight: 700 }}>Wikipedia - &nbsp;</span>
                                                                <Link target="_blank" href={row.links.wikipedia}>{row.links.wikipedia}</Link>
                                                            </ListItem>
                                                        }
                                                    </List>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    style={{ color: "white" }}
                                    colSpan={3}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Grid>
        );
    }
};
const mapStateToProps = ({ screenConfiguration }) => {
    const { preparedFinalObject = {} } = screenConfiguration;
    const {
        historyResponse = []
    } = preparedFinalObject;
    return { historyResponse };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(History));
