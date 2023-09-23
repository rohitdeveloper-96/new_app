import * as React from 'react';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router"
import Header from "../components/Header";
import { getUserList, postUsersList, deleteUsersList, updateUsersList } from '../api/userApi';
import CircularProgress from '@mui/joy/CircularProgress';
import "../assets/css/Home.css"
import { emailregx } from "../utils/helpers";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import EnhancedTableHead from "../components/TableHead";
import Alert from '@mui/material/Alert';
import CreateDialog from "../components/CreateDialogBox";
import DeleteDialog from "../components/DeleteDialog";
import EditDialog from "../components/EditDialog";
import { Typography } from '@mui/material';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
    const stabilizedThis = Array.isArray(array) ? array.map((el, index) => [el, index]) : [];
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const HomeScreen = () => {
    const navigate = useNavigate();
    const [username, setAdminUsername] = useState([]);
    const [userLists, setUserLists] = useState([]);
    const [loader, setLoader] = useState(false);
    const [variant, setVariant] = useState('solid');
    const { userList, loading } = useSelector(state => state.users);
    const [openModel, setOpenModel] = useState(false);
    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [skills, setPrimarySkills] = useState("");
    const [updateName, setUpdateUsername] = useState("");
    const [updateEmail, setUpdateEmail] = useState("");
    const [updateAge, setUpdateAge] = useState("");
    const [updateSkills, setUpdatePrimarySkills] = useState("");
    const [Validation, setValidation] = useState(false);
    const [UpdateValidation, setUpdateValidation] = useState(false);
    const [validateEmailId, setValidateEmailId] = useState(false);
    const dispatch = useDispatch();
    const [toastbool, setToastbool] = useState(false);
    const [toastmessage, setToastMessage] = useState("")
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [index, setIndexOfUser] = useState();
    const [openEditDialog, setopenEditDialog] = useState(false)
    useEffect(() => {
        if (!localStorage.getItem("email")) {
            navigate("/Login")
        }
        let username = localStorage.getItem("name")
        setAdminUsername(username)
    }, [])
    useEffect(() => {
        if (name !== "" || email !== "" || age !== "" || skills !== "") {
            setValidation(false)
            setValidateEmailId(false)
        }
    }, [name, email, age, skills])
    useEffect(() => {
        if (updateName !== "" || updateEmail !== "" || updateAge !== "" || updateSkills !== "") {
            setUpdateValidation(false)
        }
    }, [updateName, updateEmail, updateAge, updateSkills])

    useEffect(() => {
        getUserList(dispatch)
    }, [dispatch])
    useEffect(() => {
        if (loading === true) {
            setLoader(true)
            setUserLists([])
        } else {
            setLoader(false)
            setUserLists(userList)
        }
    }, [userList, loading])
    const onChangeHandler = (e) => {
        switch (e.target.id) {
            case "name": {
                return setUsername(e.target.value)
            }
            case "email": {
                return setEmail(e.target.value)
            }
            case "age": {
                return setAge(e.target.value)
            }
            case "skills": {
                return setPrimarySkills(e.target.value)
            }
            default:
                return "";
        }
    }
    const onSubmitHandler = () => {
        let validateEmail = userList.find((item) => {
            if (item.email === email) {
                return email;
            }
        })
        if (name !== "" || email !== "" || age !== "" || skills !== "") {
            if (email.match(emailregx)) {
                if (age !== "") {
                    if (skills !== "") {
                        if (!validateEmail) {
                            postUsersList(dispatch, name, email, age, skills)
                            setUsername("")
                            setEmail("")
                            setAge("")
                            setPrimarySkills("")
                            setOpenModel(false)
                            setToastbool(true)
                            setToastMessage("User has been Created")
                        } else {
                            setValidateEmailId(true)
                        }
                    } else {
                        setValidation(true)
                    }
                } else {
                    setValidation(true)
                }
            } else {
                setValidation(true)
            }
        } else {
            setValidation(true)
        }
    }
    const onClickCreateUser = () => {
        setOpenModel(true)
    }
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userLists.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(userLists, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, userLists],
    );
    const onCloseModel = () => {
        setOpenModel(false)
    }
    const onDeleteHandler = (row) => {
        let findIndex = userLists.find(item => item.id === row.id)
        setIndexOfUser(findIndex)
        setOpenDeleteDialog(true)
    }
    const handleDelete = () => {
        let id = index.id;
        deleteUsersList(dispatch, id)
        setToastbool(true)
        setToastMessage("User has been Deleted Successfully")
        setOpenDeleteDialog(false);
    }
    const onUpdateHandler = (row) => {
        let findIndexUser = userLists.find(item => item.id === row.id)
        setopenEditDialog(true)
        if (findIndexUser) {
            setIndexOfUser(findIndexUser)
            setUpdateUsername(findIndexUser.name)
            setUpdateEmail(findIndexUser.email)
            setUpdateAge(findIndexUser.age)
            setUpdatePrimarySkills(findIndexUser.primaryskills)
        } else {
            return "";
        }
    }
    const onChangeUpdateHandler = (e) => {
        switch (e.target.id) {
            case "name": {
                return setUpdateUsername(e.target.value)
            }
            case "email": {
                return setUpdateEmail(e.target.value)
            }
            case "age": {
                return setUpdateAge(e.target.value)
            }
            case "skills": {
                return setUpdatePrimarySkills(e.target.value)
            }
            default:
                return "";
        }
    }
    const onSubmitUpdateHandler = () => {
        let id = index.id;
        if (updateName !== "" || updateEmail !== "" || updateAge !== "" || updateSkills !== "") {
            if (updateEmail.match(emailregx)) {
                if (updateAge !== "") {
                    if (updateSkills !== "") {
                        updateUsersList(dispatch, id, updateName, updateEmail, updateAge, updateSkills)
                        setUpdateUsername("")
                        setUpdateEmail("")
                        setUpdateAge("")
                        setUpdatePrimarySkills("")
                        setopenEditDialog(false)
                        setToastbool(true)
                        setToastMessage("User has been Updated Successfully")
                    } else {
                        setUpdateValidation(true)
                    }
                } else {
                    setUpdateValidation(true)
                }
            } else {
                setUpdateValidation(true)
            }
        } else {
            setUpdateValidation(true)
        }
    }
    const onCloseUpdateModel = () => {
        setopenEditDialog(false)
    }

    const onClickeDetailsHandler = (row) => {
        let findIndexUser = userLists.find(item => item.id === row.id)
        navigate(`/userdetails/${findIndexUser.id}/${findIndexUser.email}`);
    }

    return (
        <div>
            <Header user={username} />
            {toastbool && <Alert severity="success" color="success" onClose={() => { setToastbool(false) }}>
                {toastmessage}
            </Alert>}
            {loader && <div className="loader"><CircularProgress variant={variant} color="success" /></div>}
            <div className="tableContainerStyles">
                <div className="btnContainer"><button className="btnStyles" onClick={onClickCreateUser}>Create User</button></div>
                <Box sx={{ width: '90%', mt: 5, ml: 10 }} className="datagridStyles">
                    <Paper >
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={userLists.length}
                                />
                                <TableBody>
                                    {visibleRows.length !== 0 ? visibleRows.map((row, index) => {
                                        return (
                                            <TableRow hover key={row.id}>
                                                <TableCell
                                                    align="left"
                                                >
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="left">{row.name}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">{row.age}</TableCell>
                                                <TableCell align="left">{row.primaryskills}</TableCell>
                                                <TableCell>
                                                    <Tooltip title="Update">
                                                        <IconButton>
                                                            <ModeEditIcon onClick={() => onUpdateHandler(row)} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton>
                                                            <DeleteIcon onClick={() => onDeleteHandler(row)} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Details">
                                                        <Typography style={{ cursor: "pointer" }} onClick={() => onClickeDetailsHandler(row)}>VIEW DETAILS</Typography>
                                                    </Tooltip>
                                                </TableCell>

                                            </TableRow>
                                        );
                                    }) : <TableCell>No records found!</TableCell>}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={userLists.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box>
            </div>
            {openModel &&
                <CreateDialog
                    onClose={onCloseModel}
                    name={name}
                    email={email}
                    skills={skills}
                    age={age}
                    onChangeHandler={onChangeHandler}
                    Validation={Validation}
                    validateEmailId={validateEmailId}
                    onSubmitHandler={onSubmitHandler}
                    openModel={openModel}
                />
            }
            {
                openDeleteDialog &&
                <DeleteDialog
                    openDialog={openDeleteDialog}
                    onDialogClose={handleCloseDeleteDialog}
                    onClickDeleteHandler={handleDelete}
                />
            }
            {openEditDialog &&
                <EditDialog
                    onClose={onCloseUpdateModel}
                    name={updateName}
                    email={updateEmail}
                    skills={updateSkills}
                    age={updateAge}
                    onChangeHandler={onChangeUpdateHandler}
                    Validation={UpdateValidation}
                    onSubmitHandler={onSubmitUpdateHandler}
                    openModel={openEditDialog}
                />
            }

        </div>
    )
}
export default HomeScreen