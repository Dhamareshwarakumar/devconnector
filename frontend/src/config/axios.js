import axios from 'axios';

// TODO: Add exponential retries config for 500 responses
const config = () => {
    axios.defaults.timeout = 2500;
}

export default {
    config
}
