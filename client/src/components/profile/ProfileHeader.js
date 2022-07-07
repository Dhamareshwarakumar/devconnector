import React from 'react';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/isEmpty';

const ProfileHeader = ({ profile }) => {

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-info text-white mb-3">
                    <div className="row">
                        <div className="col-4 col-md-3 m-auto">
                            <img src={profile.user.avatar} alt="avatar" className="rounded-circle" />
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="display-4 text-center">{profile.user.name}</h1>
                        <p className="lead text-center">
                            {profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}
                        </p>
                        <p>{isEmpty(profile.location) ? null : (<span>at {profile.location}</span>)}</p>
                        <p>
                            {isEmpty(profile.website) ? null : (
                                <Link
                                    to={profile.website}
                                    target="_blank"
                                    className="text-white p-2"
                                >
                                    <i className="fas fa-globe fa-2x"></i>
                                </Link>

                            )}
                            {isEmpty(profile.social && profile.social.twitter) ? null : (
                                <Link
                                    to="#"
                                    className="text-white p-2"
                                    target="_blank"
                                >
                                    <i className="fab fa-twitter fa-2x"></i>
                                </Link>
                            )}

                            {isEmpty(profile.social && profile.social.facebook) ? null : (
                                <Link
                                    to={profile.social.facebook}
                                    className="text-white p-2"
                                    target="_blank"
                                >
                                    <i className="fab fa-facebook fa-2x"></i>
                                </Link>
                            )}

                            {isEmpty(profile.social && profile.social.linkedin) ? null : (
                                <Link
                                    to={profile.social.linkedin}
                                    className="text-white p-2"
                                    target="_blank"
                                >
                                    <i className="fab fa-linkedin fa-2x"></i>
                                </Link>
                            )}

                            {isEmpty(profile.social && profile.social.instagram) ? null : (
                                <Link
                                    to={profile.social.instagram}
                                    className="text-white p-2"
                                    target="_blank"
                                >
                                    <i className="fab fa-instagram fa-2x"></i>
                                </Link>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
