import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';

const api = axios.create({
    baseURL: `${BASE_URL}`,
});

// Quan trọng nhất: luôn lấy token mới nhất TRƯỚC mỗi request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

const useFetch = (url) => {
    const [data, setData] = useState({});
    const [dataTasks, setDataTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.get(url, {
                params: { page, pageSize },
            });
            setData(res.data);
            setDataTasks(res.data.dataTasks || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    }, [url, page, pageSize]);

    // Gọi lại khi url hoặc phân trang thay đổi
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, dataTasks, loading, error, refresh: fetchData, setPage, setPageSize };
};

export default useFetch;
