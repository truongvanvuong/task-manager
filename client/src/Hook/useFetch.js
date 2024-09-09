import { useEffect, useState } from 'react';
import axios from 'axios';
const useFetch = (url) => {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);

        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: ` Bearer ${token}`,
                },
            });
            const result = res.data;
            setData(result.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url, token]);

    return { data, loading, error, refresh: fetchData };
};

export default useFetch;
