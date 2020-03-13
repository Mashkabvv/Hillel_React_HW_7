import axios from 'axios';

export default axios.create({
    baseURL: 'http://5e68ae39d426c00016b7e3c5.mockapi.io/',
    headers: { 'Content-Type': 'application/json' }
});
