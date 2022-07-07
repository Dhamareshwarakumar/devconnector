import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';


const CreateProfile = (props) => {
    const [state, setState] = useState({
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    });

    useEffect(() => {
        props.getCurrentProfile();
        if (props.profile.profile) {
            const profile = props.profile.profile;

            // Bring Skills array back to CSV
            const skillsCSV = profile.skills.join(',');

            // If profile field doesnt exist, make empty string
            profile.company = !isEmpty(profile.compnay) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {}

            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

            // set component state fields
            setState({
                ...state,
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube
            });
            console.log(state.company);
        }
    }, [])

    console.log('hahaha')


    const onSubmit = e => {
        e.preventDefault();

        props.createProfile(state, props.history)

    }

    const onChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    // Select options for status
    const options = [
        { label: '* Select Professional Status', value: 0 },
        { label: 'Developer', value: 'Developer' },
        { label: 'Junior Developer', value: 'Junior Developer' },
        { label: 'Senior Developer', value: 'Senior Developer' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Student or Learning', value: 'Student or Learning' },
        { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Other', value: 'Other' }
    ];

    let socialInputs;
    if (state.displaySocialInputs) {
        socialInputs = (
            <div>
                <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={state.twitter}
                    onChange={onChange}
                    error={props.errors.twitter}
                />
                <InputGroup
                    placeholder="Facebook Page URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={state.facebook}
                    onChange={onChange}
                    error={props.errors.facebook}
                />
                <InputGroup
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={state.linkedin}
                    onChange={onChange}
                    error={props.errors.linkedin}
                />

                <InputGroup
                    placeholder="Youtube Channel URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={state.youtube}
                    onChange={onChange}
                    error={props.errors.youtube}
                />

                <InputGroup
                    placeholder="Instagram Profile URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={state.instagram}
                    onChange={onChange}
                    error={props.errors.instagram}
                />
            </div>
        )
    }


    return (
        <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light">
                            Go Back
                        </Link>
                        <h1 className="display-4 text-center">Edit Your Profile</h1>
                        <small className="d-block pb-3">* = required fields</small>
                        <form onSubmit={onSubmit}>
                            <TextFieldGroup
                                placeholder="* Profile Handle"
                                name="handle"
                                value={state.handle}
                                onChange={onChange}
                                error={props.errors.handle}
                                info="A unique handle for your profile URL. Your fullname, companyname, nickname"
                            />
                            <SelectListGroup
                                placeholder="Status"
                                name="status"
                                value={state.status}
                                onChange={onChange}
                                options={options}
                                error={props.errors.status}
                                info="Give us an idea of where you at in your career"
                            />
                            <TextFieldGroup
                                placeholder="Company"
                                name="company"
                                value={state.company}
                                onChange={onChange}
                                error={props.errors.company}
                                info="Could be your own company or one you work for"
                            />
                            <TextFieldGroup
                                placeholder="Website"
                                name="website"
                                value={state.website}
                                onChange={onChange}
                                error={props.errors.website}
                                info="Could be your own website or a company one"
                            />
                            <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={state.location}
                                onChange={onChange}
                                error={props.errors.location}
                                info="City or city & state suggested (eg. Boston, MA)"
                            />
                            <TextFieldGroup
                                placeholder="* Skills"
                                name="skills"
                                value={state.skills}
                                onChange={onChange}
                                error={props.errors.skills}
                                info="Please use comma seperated values (eg. HTML,CSS,Javascript,PHP)"
                            />
                            <TextFieldGroup
                                placeholder="Github Username"
                                name="githubusername"
                                value={state.githubusername}
                                onChange={onChange}
                                error={props.errors.githubusername}
                                info="If you want your latest repos and a Github link, include ypur username"
                            />
                            <TextAreaFieldGroup
                                placeholder="Short Bio"
                                name="bio"
                                value={state.bio}
                                onChange={onChange}
                                error={props.errors.bio}
                                info="Tell us a little about yourself"
                            />

                            <div className="mb-3">
                                <button onClick={e => {
                                    e.preventDefault();
                                    setState({ ...state, displaySocialInputs: !state.displaySocialInputs })
                                }} className="btn btn-light">
                                    Add Social Network Links
                                </button>
                                <span className="text-muted">Optional</span>
                            </div>
                            {socialInputs}
                            <input type="submit" value="Submit" className="btn btn-info btn-block" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

CreateProfile.prototypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(CreateProfile))
