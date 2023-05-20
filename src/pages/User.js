import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import axios from 'axios';


function User() {
    const navigate = useNavigate();
    const { username } = useParams();
    const [user, setUser] = useState('');
    const [repos, setRepos] = useState([]);

    const goToHome = () => {
        navigate('/gh-finder')
    }


    const userUrl = `https://api.github.com/users/${username}`;
    const repoUrl = `https://api.github.com/users/${username}/repos`;

    useEffect(() => {
        const getUserData = async () => {
            const response = await axios.get(userUrl);
            setUser(response.data);
        };
        const getUserRepo = async () => {
            const response = await axios.get(repoUrl);
            setRepos(response.data);
        };

        getUserData();
        getUserRepo();
    }, [username]);


    const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }
    const formatDate = (date) => {
        const newDate = new Date(date).toLocaleDateString('en-CA', options);
        return newDate;
    }


    return (
        <main className='container'>
            <div className='profile'>
                <figure>
                    <img src={`${user.avatar_url}`} alt='avatar' />
                </figure>

                <div className='username'>
                    <p>{`${user.login}`}</p>
                </div>
                <div className='userStats'>
                    <div className='stats'>
                        <span className='count'>{user.public_repos}</span>
                        <p>Repositories</p>
                    </div>
                    <div className='stats'>
                        <span className='count'>{user.followers}</span>
                        <p>Follower</p>
                    </div>
                    <div className='stats'>
                        <span className='count'>{user.following}</span>
                        <p>Following</p>
                    </div>
                </div>
                <div className='btn'>
                    <button className='buttn'
                        onClick={() => window.location.href = `https://github.com/${username}`}>
                        Go to Github
                    </button>
                </div>
            </div>


            <section className='repo-section'>
                <h2>{(user.public_repos > 0) ? "My Repositories" : "No Repositories"}</h2>
                {repos.map((repo) =>

                    <div className='repos' key={repo.id}>
                        <div className='repoInfo'>
                            <p className='repoName'>
                                <a href={`https://github.com/${repo.owner.login}/${repo.name}`}>
                                    {repo.name}
                                </a>
                            </p>
                            <p className='date'>updated at {formatDate(repo.updated_at)}</p>
                        </div>
                        <div className='description'>
                            {(repo.description) ? repo.description : "No description"}
                        </div>
                    </div>
                )}

            </section>
            <button className='back-to-home'
                onClick={goToHome}>
                home
            </button>
        </main>
    )
}

export default User