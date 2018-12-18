import axios from 'axios';

const serverUrl = 'http://138.68.107.2:3000/api/';
const localUrl = 'http://localhost:3000/api/'

export default
    axios.create({
        baseURL: serverUrl
    });