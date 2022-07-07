import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';


const AddExperience = props => {
    const [state, setState] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false
    });

    useEffect(() => {
        setState({ ...state, errors: props.errors })
        console.log(state.errors)
    }, [props])

    const onSubmit = e => {
        e.preventDefault();

        const expData = {
            company: state.company,
            title: state.title,
            location: state.location,
            from: state.from,
            to: state.to,
            current: state.current,
            description: state.description
        }

        props.addExperience(expData, props.history);
    }

    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const onCheck = e => {
        setState({
            ...state,
            disabled: !state.disabled,
            current: !state.current
        });
    }



    return (
        <div className="add-experience">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light">
                            Go Back
                        </Link>
                        <h1 className="display-4 text-center">Add Experience</h1>
                        <p className="lead text-center">Add any job or position that you have had in the past or current</p>
                        <small className="d-block pb-3">* = required</small>
                        <form onSubmit={onSubmit}>
                            <TextFieldGroup
                                placeholder="* Company"
                                name="company"
                                value={state.company}
                                onChange={onChange}
                                error={state.errors.company}
                            />
                            <TextFieldGroup
                                placeholder="* Job Title"
                                name="title"
                                value={state.title}
                                onChange={onChange}
                                error={state.errors.title}
                            />
                            <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={state.location}
                                onChange={onChange}
                                error={state.errors.location}
                            />
                            <h6>From Date</h6>
                            <TextFieldGroup
                                name="from"
                                type="date"
                                value={state.form}
                                onChange={onChange}
                                error={state.errors.form}
                            />
                            <h6>To Date</h6>
                            <TextFieldGroup
                                name="to"
                                type="date"
                                value={state.to}
                                onChange={onChange}
                                error={state.errors.to}
                                disabled={state.disabled ? 'disabled' : ''}
                            />
                            <div className="form-check mb-4">
                                <input
                                    type="checkbox"
                                    name="current"
                                    className="form-check-input"
                                    value={state.current}
                                    checked={state.current}
                                    onChange={onCheck}
                                    id="current"
                                />
                                <label htmlFor="current" className="form-check-label">
                                    Current Job
                                </label>
                            </div>
                            <TextAreaFieldGroup
                                placeholder="Job Description"
                                name="description"
                                value={state.description}
                                onChange={onChange}
                                error={state.errors.description}
                                info="Tell us about the position"
                            />
                            <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

AddExperience.prototypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    addExperience: PropTypes.func.isRequired,
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));
