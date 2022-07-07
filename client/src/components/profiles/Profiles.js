import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';


const Profiles = props => {

    useEffect(() => {
        props.getProfiles();
    })

    const { profiles, loading } = props.profile;

    let profileItems;

    if (profiles === null || loading) {
        profileItems = 'Loading...';
    } else {
        if (profiles.length > 0) {
            profileItems = profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
            ))
        } else {
            profileItems = <h4>No Profiles Found...</h4>
        }
    }

    return (
        <div className="profiles">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">
                            Developer Profiles
                        </h1>
                        <p className="lead text-center">
                            Browse and connect with developers
                        </p>
                        {profileItems}
                    </div>
                </div>
            </div>

        </div>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
