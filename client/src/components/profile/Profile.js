import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getProfileByHandle } from '../../actions/profileActions';

import ProfileAbouts from './ProfileAbouts';
import ProfileHeader from './ProfileHeader';
import ProfileGithub from './ProfileGithub';
import ProfileCreds from './ProfileCreds';
import { useEffect } from 'react';

const Profile = props => {

    useEffect(() => {
        console.log(props.match.params.handle);
        if (props.match.params.handle) {
            props.getProfileByHandle(props.match.params.handle)
        }
    }, [])

    useEffect(() => {
        if (props.profile.profile === null && props.profile.loading) {
            props.history.push('/not-found');
        }
    }, [props])

    const { profile, loading } = props.profile;
    let profileContent;

    if (profile === null || loading) {
        profileContent = "Loading...";
    } else {
        profileContent = (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/profiles" className="btn btn-light mb-3 float-left">
                            Back to Profiles
                        </Link>
                    </div>
                    <div className="col-md-6"></div>
                </div>
                <ProfileHeader profile={profile} />
                <ProfileAbouts profile={profile} />
                <ProfileCreds education={profile.education} experience={profile.experience} />
                {profile.githubusername && (<ProfileGithub username={profile.githubusername} />)}
            </div>
        )
    }

    return (
        <div className="profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {profileContent}
                    </div>
                </div>
            </div>

        </div>
    )
}

Profile.prototypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile)
