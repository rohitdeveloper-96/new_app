import { userListSuccess, userListFailure, userListStart, getusertSuccess, getuserFailure } from '../store/action'

//get the userslist from the server
export const getUserList = (dispatch) => {
    fetch(' http://localhost:8080/UserList')
        .then((res) => res.json())
        .then((data) => dispatch(userListSuccess(data)))
        .catch((err) => {
            dispatch(userListFailure(err.message))
        });

}

//POST
export const postUsersList = async (dispatch, userName, userEmail, userage, userskills) => {
    dispatch(userListStart())
    await fetch("http://localhost:8080/UserList", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send

        body: JSON.stringify({
            name: userName,
            email: userEmail,
            age: userage,
            primaryskills: userskills,
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

        // Converting to JSON
        .then(response => response.json())

        // Displaying results to console
        .then(json => console.log(json));

    await getUserList(dispatch)

}


//Delete
export const deleteUsersList = async (dispatch, id) => {
    dispatch(userListStart())
    await fetch(`http://localhost:8080/UserList/${id}`, {
        // Adding method type
        method: "DELETE",
    })

        // Converting to JSON
        .then(response => response.json())

        // Displaying results to console
        .then(json => console.log(json));
    await getUserList(dispatch)
}

//PUT
export const updateUsersList = async (dispatch, id, userName, userEmail, age, skill) => {
    dispatch(userListStart())
    await fetch(`http://localhost:8080/UserList/${id}`, {

        // Adding method type
        method: "PUT",

        // Adding body or contents to send
        body: JSON.stringify({
            name: userName,
            email: userEmail,
            age: age,
            primaryskills: skill,
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

        // Converting to JSON
        .then(response => response.json())

        // Displaying results to console
        .then(json => console.log(json));
    await getUserList(dispatch)

}

//Get particular UserList
export  const getUser = async(dispatch, id) => {
    dispatch(userListStart())
    await fetch(`http://localhost:8080/UserList/${id}`)
        .then((res) => res.json())
        .then((data) => dispatch(getusertSuccess(data)))
        .catch((err) => {
            dispatch(getuserFailure(err.message))
        });

}