import axios from 'axios';

export default
    axios.create({
        baseURL: 'http://http://138.68.107.2:3000/api/'
    });