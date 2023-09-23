import { useEffect, useState } from "react";
import Header from "../components/Header";
import '../assets/css/userDetails.css'
import { CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../api/userApi'
import { useNavigate, useParams } from "react-router";
const UserDetailsPage = () => {
    const [userdata, setUserdata] = useState([]);
    const [adminUserName, setAdminUsername] = useState("")
    const { id, userEmail } = useParams();
    const [loader, setLoader] = useState(false)
    const { getUserData, loading } = useSelector(state => state.users);
    const [variant, setVariant] = useState('solid');
    const dispatch = useDispatch()
    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [skills, setPrimarySkills] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        let username = localStorage.getItem("name")
        setAdminUsername(username)
        getUser(dispatch, id)
    }, [])
    useEffect(() => {
        if (loading === true) {
            setLoader(true)
        } else {
            setLoader(false)
            setUserdata(getUserData)
            setUsername(getUserData.name)
            setEmail(getUserData.email)
            setAge(getUserData.age)
            setPrimarySkills(getUserData.primaryskills)
        }
    }, [getUserData, loading])
    const onClickHandler = () => {
        navigate('/')
    }
    return (
        <>
            <Header user={adminUserName} />
            {loader && <div className="loader"><CircularProgress variant={variant} color="success" /></div>}
            <div className="mainContainer">
                <div className="detailsContainer">
                    <Typography mt={2} align="center" variant="h6" color={"green"}>UserDetails</Typography>
                    <hr style={{ width: "90%" }} />
                    <div style={{ display: "flex", marginTop: "30px" }}>
                        <Typography align="center" sx={{ width: "50%" }} variant="h6">Name</Typography>
                        <Typography variant="h6" sx={{ width: "10%" }}>:</Typography>
                        <Typography variant="h6" align="center" sx={{ width: "50%" }}>{name}</Typography>
                    </div>
                    <hr style={{ width: "90%" }} />
                    <div style={{ display: "flex", marginTop: "30px" }}>
                        <Typography variant="h6" align="center" sx={{ width: "50%" }}>Email-id</Typography>
                        <Typography variant="h6" sx={{ width: "10%" }}>:</Typography>
                        <Typography variant="h6" align="center" sx={{ width: "50%" }}>{email}</Typography>
                    </div>
                    <hr style={{ width: "90%" }} />
                    <div style={{ display: "flex", marginTop: "30px" }}>
                        <Typography variant="h6" align="center" sx={{ width: "50%" }}>Age</Typography>
                        <Typography variant="h6" sx={{ width: "10%" }}>:</Typography>
                        <Typography variant="h6" align="center" sx={{ width: "50%" }}>{age}</Typography>
                    </div>
                    <hr style={{ width: "90%" }} />
                    <div style={{ display: "flex", marginTop: "30px" }}>
                        <Typography variant="h6" align="center" sx={{ width: "50%" }}>PrimarySkills</Typography>
                        <Typography variant="h6" sx={{ width: "10%" }}>:</Typography>
                        <Typography variant="h6" align="center" sx={{ width: "50%" }}>{skills}</Typography>
                    </div>
                    <hr style={{ width: "90%" }} />
                    <button className="backbuttonStyles" onClick={onClickHandler}>Back</button>
                </div>
            </div>
        </>

    )
}
export default UserDetailsPage;