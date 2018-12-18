import axios from 'axios';

const serverUrl = 'http://138.68.107.2/api/';
const localUrl = 'http://localhost/api/'

export default
    axios.create({
        baseURL: serverUrl
    });