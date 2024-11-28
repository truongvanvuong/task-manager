import { useEffect, useState } from 'react';
import axios from 'axios';
const useFetch = (url) => {
    const token = localStorage.getItem('token');
    const [data, setData] = useState({});
    const [dataTasks, setDataTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const fetchData = async () => {
        setLoading(true);

        try {
            const res = await axios.get(url, {
                params: {
                    page,
                    pageSize,
                },
                headers: {
                    Authorization: token ? ` Bearer ${token}` : '',
                },
            });
            setData(res.data);
            setDataTasks(res.data.dataTasks);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url, token, page, pageSize]);

    return { data, dataTasks, loading, error, refresh: fetchData, setPage, setPageSize };
};

export default useFetch;
