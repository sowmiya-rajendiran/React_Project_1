import axios from "axios";

const baseURL = `https://www.omdbapi.com/`;

let Instance = axios.create({
    baseURL,
    params: {
        apikey: "a9bc870",
        plot: 'full'
    },
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    timeout: 5000 
})

export default Instance;