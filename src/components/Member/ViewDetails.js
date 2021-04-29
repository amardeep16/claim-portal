import React, { useState, useEffect} from 'react'
import axios from "axios";
import { Link, useParams} from 'react-router-dom';
export default function ViewDetails() {

    const [user, setUser] = useState({
        nameL: '',
        username: '',
        email: '',
        phone: '',
        website: "",
    });

    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:3003/user/${id}`);
        setUser(result.data);
    }
    return (
        <div>
            <h1>View Page</h1>
        </div>
    )
}
