import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [msg, setMsg] = useState('');

    useEffect(() => {
        axios.get('/api')
            .then(res => setMsg(res.data.msg))
            .catch(err => console.error(err));
    }, []);

    return (
        msg ? (
            <h1 className='text-center text-primary'>{msg}</h1>
        ) : (
            <h3 className='text-center text-primary'>Loading...</h3>
        )
    );
};

export default App;