// import axios from "axios";




// POUR LES IMAGES DU BACK END
export const publicFile = 'http://localhost:5000/images/';



export const baseURL = 'http://localhost:5000/api';



// const TOKEN = localStorage.getItem("persist:root") ? (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken:"") : "";
// console.log(TOKEN);


// if(localStorage.getItem("persist:root")){
//     console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken);
// }


// export const publicRequest = axios.create({
//     baseURL: baseURL,
// });

// export const userRequest = axios.create({
//     baseURL: baseURL,
//     headers:{token:`Bearer ${TOKEN}`}
// });