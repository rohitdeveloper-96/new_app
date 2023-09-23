import { useEffect, useState } from 'react';
import TextIput from '../components/TextInput';
import HMLogo from '../assets/img/HM.png';
import { emailregx } from '../utils/helpers'
import Button from '../components/Button';
import "../assets/css/SignUp.css"
import { useNavigate } from 'react-router-dom'
import { getAdminUserList, postAdminUsers } from "../api/adminApi"
import { useDispatch, useSelector } from 'react-redux';
const SignUpScreen = () => {
    const [username, setUsername] = useState("")
    const [email, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [adminUsers, setAdminUsers] = useState([]);
    const [admin, setAdmin] = useState(true)
    const [validateEmailId, setValidateEmailId] = useState(false)
    const adminUserList = useSelector(state => state.admin.adminUserList)
    const [Validation, setValidation] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (username !== "" || email !== "" || password !== "") {
            setValidation(false)
            setValidateEmailId(false)
        }
    }, [username, email, password])

    useEffect(() => {
        getAdminUserList(dispatch)
    }, [])

    useEffect(() => {
        setAdminUsers(adminUserList)
    }, [adminUserList])

    const onChangeHandler = (e) => {
        switch (e.target.id) {
            case "username": {
                return setUsername(e.target.value)
            }
            case "email": {
                return setEmailId(e.target.value)
            }
            case "password": {
                return setPassword(e.target.value)
            }
            default:
                return;
        }
    }

    const onClickHandler = () => {
        navigate('/Login')
    }

    const onSubmitHandler = () => {
        let validateEmail = adminUsers.find((item) => {
            if (item.email === email) {
                return email;
            }
        })
        if (username !== "" || email !== "" || password !== "") {
            if (email.match(emailregx)) {
                if (password !== "") {
                    if (!validateEmail) {
                        setValidateEmailId(false)
                        postAdminUsers(username, email, password, admin)
                        setUsername("")
                        setEmailId("")
                        setPassword("")
                        alert("Account has been Created Successfully")
                    } else {
                        setValidateEmailId(true)
                    }

                } else {
                    setValidation(true)
                }
            } else {
                setValidation(true)
            }
        }
        else {
            setValidation(true)
        }
    }
    return (
        <div className="container">
            <div className="signContainer   ">
                <div>
                    <img src={HMLogo} className="imgStyles" />
                    <h3 className="textStyles">UserName <span>*</span></h3>
                    <TextIput
                        text="text"
                        id="username"
                        Value={username}
                        onChangeHandler={onChangeHandler}
                    />
                    <h3 className="textStyles">Email-id <span>*</span></h3>
                    <TextIput
                        text="text"
                        id="email"
                        Value={email}
                        onChangeHandler={onChangeHandler}
                    />
                    <h3 className="textStyles">Password <span>*</span> </h3>
                    <TextIput
                        id="password"
                        text="password"
                        Value={password}
                        onChangeHandler={onChangeHandler}
                    />
                    <Button
                        buttonText="Submit"
                        onSubmitHandler={onSubmitHandler}
                    />
                    {Validation && <p className='validationTextStyles'>Please Enter the Mandatory Fields and Valid Email-id </p>}
                    {validateEmailId && <p className='validationTextStyles'>This Email-id is already Exsist</p>}
                </div>
                <div className='subtitleContainer'>
                    <h4>Already Have Account ? </h4>
                    <h4 style={{ color: "green", cursor: "pointer" }} onClick={onClickHandler}>SignIn</h4>
                </div>
            </div>
        </div>
    )
}
export default SignUpScreen;