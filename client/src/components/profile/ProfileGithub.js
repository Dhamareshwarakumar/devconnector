import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const ProfileGithub = ({ username }) => {

    const [state, setState] = useState({
        cliendId: 'e870c9925c2e909318bb',
        clientSecret: 'ba418f66612281f14d721bc9c5c93e876c5a4917',
        count: 5,
        sort: 'created: asc',
        repos: []
    })

    console.log(state)

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}/repos?per_page=${state.count}&sort=${state.sort}&client_id=${state.cliendId}&client_secret=${state.clientSecret}`)
            .then(res => res.json())
            .then(data => {
                setState({
                    ...state,
                    repos: data
                })
            })
            .catch(err => console.log(err))

    }, []);

    const repoItems = state.repos.map(repo => (
        <div key={repo.id} className="card card-body mb-2">
            <div className="row">
                <div className="col-md-6">
                    <h4>
                        <Link
                            to={repo.html_url}
                            className="text-info"
                            target="_blank"
                        >
                            {repo.name}
                        </Link>
                    </h4>
                    <p>{repo.description}</p>
                </div>
                <div className="col-md-6">
                    <span className="badge badge-info mr-1">
                        Stars: {repo.stargazers_count}
                    </span>
                    <span className="badge badge-secondary mr-1">
                        Watchers: {repo.watchers_count}
                    </span>
                    <span className="badge badge-success">
                        Forks: {repo.forks_count}
                    </span>
                </div>
            </div>
        </div>
    ))

    return (
        <div>
            <hr />
            <h3 className="mb-4">Latest Github repos</h3>
            {repoItems}
        </div>
    )
}


ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired
}

export default ProfileGithub
