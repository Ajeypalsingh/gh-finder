import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Search() {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [errMessage, setErrMessage] = useState();

    const validateUser = async () => {
        try {
            const response = await axios.get(`https://api.github.com/users/${input}`);
            navigate(`/gh-finder/user/${input}`)
            setErrMessage('');
            setInput('');
            return true
        } catch (err) {
            setErrMessage('Invalid user....');
            setInput('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateUser();
    }


    return (
        <section className="search">
            <h1>Github Finder</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search for user" value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="submit" className="search-user">
                    Find user
                </button>
            </form>
            <p className='error'>{errMessage}</p>
        </section>
    );
}

export default Search;