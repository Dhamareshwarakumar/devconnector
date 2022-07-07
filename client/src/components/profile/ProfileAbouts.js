import React from 'react';
import PropTypes from 'prop-types'
import isEmpty from '../../validation/isEmpty';

const ProfileAbouts = ({ profile }) => {

    // Get Firstname 
    const firstname = profile.user.name.trim().split(' ')[0];

    // Skills List
    const skills = profile.skills.map((skill, index) => (
        <div key={index} className="p-3">
            <i className="fa fa-check" />{skill}
        </div>
    ))

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-light mb-3">
                    <h3 className="text-center text-info">
                        {firstname}'s bio
                    </h3>
                    <p className="lead">
                        {isEmpty(profile.bio) ? (<span>{firstname} does not have the bio</span>) : (<span>{profile.bio}</span>)}
                    </p>
                    <hr /><h3 className="text-center text-info">Skills</h3>
                    <div className="row">
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {skills}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


ProfileAbouts.prototypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbouts;
