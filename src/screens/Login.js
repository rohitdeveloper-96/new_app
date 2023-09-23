import { useEffect, useState } from 'react';
import TextIput from '../components/TextInput';
import HMLogo from '../assets/img/HM.png';
import { emailregx } from '../utils/helpers'
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom'
import "../assets/css/Login.css"
import { useDispatch, useSelector } from 'react-redux';
import { getAdminUserList } from '../api/adminApi'
const LoginScreen = () => {
    const [email, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [adminUsers, setAdminUsers] = useState([])
    const [Validation, setValidation] = useState(false);
    const [validateEmailId, setValidateEmailId] = useState(false)
    const adminUserList = useSelector(state => state.admin.adminUserList)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (email !== "" || password !== "") {
            setValidation(false)
            setValidateEmailId(false)
        }
    }, [email, password])

    useEffect(() => {
        getAdminUserList(dispatch)
    }, [])

    useEffect(() => {
        if (localStorage.getItem("email")) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        setAdminUsers(adminUserList)
    }, [adminUserList])

    const onChangeHandler = (e) => {
        switch (e.target.id) {
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
        navigate('/SignUp')
    }

    const onSubmitHandler = () => {
        let validateEmail = adminUsers.find((item) => {
            if (item.email === email && item.password === password) {
                return email;
            }
        })
        if (email !== "" || password !== "") {
            if (email.match(emailregx)) {
                if (password !== "") {
                    if (validateEmail) {
                        setValidateEmailId(false)
                        setEmailId("")
                        setPassword("")
                        localStorage.setItem("email", email)
                        localStorage.setItem("name", validateEmail.name)
                        navigate("/")
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
    }
    return (
        <div className="container">
            <div className="loginContainer">
                <div>
                    <img src={HMLogo} className="imgStyles" />
                    <h3 className="textStyles">Email-id :</h3>
                    <TextIput
                        text="text"
                        id="email"
                        placeholder ="Enter Your Email-id"
                        Value={email}
                        onChangeHandler={onChangeHandler}
                    />
                    <h3 className="textStyles">Password :</h3>
                    <TextIput
                        id="password"
                        text="password"
                        placeholder="Enter your Password"
                        Value={password}
                        onChangeHandler={onChangeHandler}
                    />
                    <Button
                        buttonText="SignIn"
                        onSubmitHandler={onSubmitHandler}
                    />
                    {Validation && <p className='validationTextStyles'>Please enter the valid Email-id and Password!</p>}
                    {validateEmailId && <p className='validationTextStyles'>Incorrect Email-id or Password</p>}
                </div>
                <div className='subtitleContainer'>
                    <h4>New to this App ? </h4>
                    <h4 style={{ color: "green", cursor: "pointer" }} onClick={onClickHandler}>SignUp</h4>
                </div>
            </div>
        </div>
    )
}
export default LoginScreen;