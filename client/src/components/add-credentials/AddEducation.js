import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';


const AddEducation = props => {
    const [state, setState] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
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

        const eduData = {
            school: state.school,
            degree: state.degree,
            fieldofstudy: state.fieldofstudy,
            from: state.from,
            to: state.to,
            current: state.current,
            description: state.description
        }

        props.addEducation(eduData, props.history);
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
        <div className="add-education">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light">
                            Go Back
                        </Link>
                        <h1 className="display-4 text-center">Add Education</h1>
                        <p className="lead text-center">Add any school, bootcamp, etc that you gave attended</p>
                        <small className="d-block pb-3">* = required</small>
                        <form onSubmit={onSubmit}>
                            <TextFieldGroup
                                placeholder="* School"
                                name="school"
                                value={state.school}
                                onChange={onChange}
                                error={state.errors.school}
                            />
                            <TextFieldGroup
                                placeholder="* Degree or Certification"
                                name="degree"
                                value={state.degree}
                                onChange={onChange}
                                error={state.errors.degree}
                            />
                            <TextFieldGroup
                                placeholder="Field of Study"
                                name="fieldofstudy"
                                value={state.fieldofstudy}
                                onChange={onChange}
                                error={state.errors.fieldofstudy}
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
                                placeholder="Program Description"
                                name="description"
                                value={state.description}
                                onChange={onChange}
                                error={state.errors.description}
                                info="Tell us about the program"
                            />
                            <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

AddEducation.prototypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    addEducation: PropTypes.func.isRequired,
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));



// GSM Architecture
// IEEE 802.11
// wireless application protocol
// DHCP