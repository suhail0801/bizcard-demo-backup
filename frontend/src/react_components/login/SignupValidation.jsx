// function Validation(values){
//     let error = {}
//     const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

//     if(values.fullName === ""){
//         error.fullName = "Name should not be empty"
//     }
//     // else if(!email_pattern.test(values.email)){
//     //     error.name = "Email didn't match"
//     // }
//     else{
//         error.fullName = ""
//     }

    
//     if(values.email === ""){
//         error.email = "Email should not be empty"
//     }
//     else if(!email_pattern.test(values.email)){
//         error.email = "Email didn't match"
//     }
//     else{
//         error.email = ""
//     }

//     if(values.password === ""){
//         error.password = "Password should not be empty"
//     }
//     else if(!password_pattern.test(values.password)){
//         error.password = "password should contain atleast 8 characters with atleast 1 uppercase letter and number"
//     }
//     else{
//         error.password = ""
//     }
//     return error
// }

// export default Validation

// function Validation(values) {
//     let error = {};
//     const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-])[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-]{8,}$/;

//     if (values.fullName === "") {
//         error.fullName = "Name should not be empty";
//     } else {
//         error.fullName = "";
//     }

//     if (values.email === "") {
//         error.email = "Email should not be empty";
//     } else if (!email_pattern.test(values.email)) {
//         error.email = "Email format is invalid";
//     } else {
//         error.email = "";
//     }

//     if (values.password === "") {
//         error.password = "Password should not be empty";
//     } else if (!password_pattern.test(values.password)) {
//         error.password = "Password should contain at least 8 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character";
//     } else {
//         error.password = "";
//     }

//     return error;
// }

// export default Validation;

function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-])[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-]{8,}$/;

    if (values.username === "") {
        error.username = "Name should not be empty";
    } else {
        error.username = "";
    }

    if (values.email === "") {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email format is invalid";
    } else {
        error.email = "";
    }

    // if (values.password === "") {
    //     error.password = "Password should not be empty";
    // } else if (!password_pattern.test(values.password)) {
    //     error.password = "Password should contain at least 8 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character";
    // } else {
    //     error.password = "";
    // }

    if (values.reEnterPassword === "") {
        error.reEnterPassword = "Re-enter Password should not be empty";
    } else if (values.password !== values.reEnterPassword) {
        error.reEnterPassword = "Passwords do not match";
    } else {
        error.reEnterPassword = "";
    }

    return error;
}

export default Validation;
