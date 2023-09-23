import { adminListSuccess, adminListFailure } from "../store/action";

export const getAdminUserList = (dispatch) => {
    fetch('http://localhost:8080/adminList')
        .then((res) => res.json())
        .then((data) => dispatch(adminListSuccess(data)))
        .catch((err) => {
            dispatch(adminListFailure(err.message))
        });

}

//POST
export const postAdminUsers = (userName, userEmail, password, admin) => {
    fetch("http://localhost:8080/adminList", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send

        body: JSON.stringify({
            name: userName,
            email: userEmail,
            password: password,
            isAdmin: admin,
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

}


