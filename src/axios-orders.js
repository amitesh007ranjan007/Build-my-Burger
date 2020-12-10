import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-build-4455d-default-rtdb.firebaseio.com/'
});

export default instance;