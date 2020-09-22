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
import { List, ListItem, withStyles, Grid, TextField, TableFooter, TablePagination } from '@material-ui/core';
import { connect } from "react-redux";
import { httpRequest } from "../../../../../../ui-utils/api"
import { mapDispatchToProps } from "../../../../../../ui-utils/commons";
import isEmpty from "lodash/isEmpty";
import TablePaginationActions from "../../../../../../ui-molecules/TablePaginationActions";

const columns = [
    "Payload Id", "Type", "Orbit", "Nationality", "Manufaturer", "Mass (in kgs)", "Mass (in lbs)",
    "Reused"
]
const styles = {
    root: {
        padding: "0px 70px"
    },
    textField: {
        margin: "16px 0px",
        width: "30%"
    },
    tableCell: {
        color: "white"
    }
}
class Payload extends React.Component {
    state = {
        open: false,
        rows: [],
        page: 0,
        rowsPerPage: 10
    }
    componentDidMount = async () => {
        const { setAppData } = this.props;
        let response = await httpRequest({
            endPoint: "/payloads",
            method: "get",
        });
        response = response && response.map(res => { return { ...res, open: false } })
        setAppData(`payloadResponse`, response);
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
                row.payload_id = data.payload_id;
                row.customers = data.customers;
                row.manufacturer = data.manufacturer;
                row.nationality = data.nationality;
                row.orbit = data.orbit;
                row.open = data.open;
                row.orbit_params = data.orbit_params;
                row.payload_mass_kg = data.payload_mass_kg;
                row.payload_mass_lbs = data.payload_mass_lbs;
                row.payload_type = data.payload_type;
                row.reused = data.reused;

                (!searchText ||
                    row.payload_id
                        .toString()
                        .toLowerCase()
                        .search(searchText.toLowerCase()) !== -1 ||
                    row.payload_type
                        .toString()
                        .toLowerCase()
                        .search(searchText.toLowerCase()) !== -1 ||
                    (row.orbit && row.orbit
                        .toString()
                        .toLowerCase()
                        .search(searchText.toLowerCase()) !== -1) ||
                    (row.nationality && row.nationality
                        .toString()
                        .toLowerCase()
                        .search(searchText.toLowerCase()) !== -1) ||
                    (row.manufacturer && row.manufacturer
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
        const { payloadResponse = [], classes } = this.props;
        const { rows, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        return (
            <Grid item md={12} className={classes.root}>
                <TextField
                    className={classes.textField}
                    onChange={(e) => this.prepareTableData(payloadResponse, e)}
                    placeholder="Search by Id, Type, Orbit, Nationality or Manufacturer"
                />
                <TableContainer component={Paper} style={{ background: "#004F84" }}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell className={classes.tableCell} align="center">{columns[0]}</TableCell>
                                <TableCell className={classes.tableCell} align="center">{columns[1]}</TableCell>
                                <TableCell className={classes.tableCell} align="center">{columns[2]}</TableCell>
                                <TableCell className={classes.tableCell} align="center">{columns[3]}</TableCell>
                                <TableCell className={classes.tableCell} align="center">{columns[4]}</TableCell>
                                <TableCell className={classes.tableCell} align="center">{columns[5]}</TableCell>
                                <TableCell className={classes.tableCell} align="center">{columns[6]}</TableCell>
                                <TableCell className={classes.tableCell} align="center">{columns[7]}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ opacity: 0.6 }}>
                            {rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <React.Fragment key={index}>
                                    <TableRow className={classes.root}>
                                        <TableCell className={classes.tableCell}>
                                            <IconButton className={classes.tableCell} aria-label="expand row" size="small" onClick={() => this.toggleCollapse(index)}>
                                                {row.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell className={classes.tableCell} align="center" component="th" scope="row">
                                            {row.payload_id}
                                        </TableCell>
                                        <TableCell className={classes.tableCell} align="center">{row.payload_type}</TableCell>
                                        <TableCell className={classes.tableCell} align="center">{row.orbit || `-`}</TableCell>
                                        <TableCell className={classes.tableCell} align="center">{row.nationality || `-`}</TableCell>
                                        <TableCell className={classes.tableCell} align="center">{row.manufacturer || `-`}</TableCell>
                                        <TableCell className={classes.tableCell} align="center">{row.payload_mass_kg || `-`}</TableCell>
                                        <TableCell className={classes.tableCell} align="center">{row.payload_mass_lbs || `-`}</TableCell>
                                        <TableCell className={classes.tableCell} align="center">{row.reused ? `Yes` : `No`}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCell} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={row.open} timeout="auto" unmountOnExit>
                                                <Box margin={1}>
                                                    <Typography>{row.details}</Typography>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        <em>Details</em>
                                                    </Typography>
                                                    <List>
                                                        {row.orbit_params.apoapsis_km &&
                                                            <ListItem>
                                                                apoapsis_km - {row.orbit_params.apoapsis_km}
                                                            </ListItem>
                                                        }
                                                        {row.orbit_params.arg_of_pericenter &&
                                                            <ListItem>
                                                                arg_of_pericenter - {row.orbit_params.arg_of_pericenter}
                                                            </ListItem>
                                                        }
                                                        {row.orbit_params.eccentricity &&
                                                            <ListItem>
                                                                eccentricity - {row.orbit_params.eccentricity}
                                                            </ListItem>
                                                        }
                                                        {row.orbit_params.epoch &&
                                                            <ListItem>
                                                                epoch - {row.orbit_params.epoch}
                                                            </ListItem>
                                                        }
                                                        {row.orbit_params.inclination_deg &&
                                                            <ListItem>
                                                                inclination_deg - {row.orbit_params.inclination_deg}
                                                            </ListItem>
                                                        }
                                                        {row.orbit_params.lifespan_years &&
                                                            <ListItem>
                                                                lifespan_years - {row.orbit_params.lifespan_years}
                                                            </ListItem>
                                                        }
                                                        {row.orbit_params.longitude &&
                                                            <ListItem>
                                                                longitude - {row.orbit_params.longitude}
                                                            </ListItem>
                                                        }
                                                        {row.orbit_params.mean_anomaly &&
                                                            <ListItem>
                                                                mean_anomaly - {row.orbit_params.mean_anomaly}
                                                            </ListItem>
                                                        }
                                                        {row.orbit_params.mean_motion &&
                                                            <ListItem>
                                                                mean_motion - {row.orbit_params.mean_motion}
                                                            </ListItem>
                                                        }
                                                        {row.orbit_params.periapsis_km &&
                                                            <ListItem>
                                                                periapsis_km - {row.orbit_params.periapsis_km}
                                                            </ListItem>
                                                        }
                                                        {row.orbit_params.period_min &&
                                                            <ListItem>
                                                                period_min - {row.orbit_params.period_min}
                                                            </ListItem>
                                                        }
                                                        {row.orbit_params.raan &&
                                                            <ListItem>
                                                                raan - {row.orbit_params.raan}
                                                            </ListItem>
                                                        }
                                                        {row.orbit_params.reference_system &&
                                                            <ListItem>
                                                                reference_system - {row.orbit_params.reference_system}
                                                            </ListItem>
                                                        }
                                                        {row.orbit_params.regime &&
                                                            <ListItem>
                                                                regime - {row.orbit_params.regime}
                                                            </ListItem>
                                                        }
                                                        {row.orbit_params.semi_major_axis_km &&
                                                            <ListItem>
                                                                semi_major_axis_km - {row.orbit_params.semi_major_axis_km}
                                                            </ListItem>
                                                        }
                                                        {row.customers && row.customers.map((customer, index) => {
                                                            return (
                                                                <List>
                                                                    <ListItem>Customer {index + 1} - {customer}</ListItem>
                                                                </List>
                                                            )
                                                        })
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
        payloadResponse = []
    } = preparedFinalObject;
    return { payloadResponse };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Payload));
