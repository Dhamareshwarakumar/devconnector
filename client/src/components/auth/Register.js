
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';

import { useState, useEffect } from 'react';
import TextFieldGroup from '../../components/common/TextFieldGroup';

const Register = (props) => {


    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push('/dashboard')
        }
    }, [props.auth.isAuthenticated, props.history])

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    })

    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: state.name,
            email: state.email,
            password: state.password,
            password2: state.password2,
        };
        props.registerUser(newUser, props.history);
    }

    useEffect(() => {
        if (props.errors) {
            setState({ ...state, errors: props.errors })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.errors])


    const { errors } = state;

    return (
        <div>
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form noValidate onSubmit={onSubmit}>
                                <TextFieldGroup
                                    placeholder="Name"
                                    name="name"
                                    type="text"
                                    value={state.name}
                                    onChange={onChange}
                                    error={errors.name}
                                />

                                <TextFieldGroup
                                    placeholder="Email Address"
                                    name="email"
                                    type="email"
                                    value={state.email}
                                    onChange={onChange}
                                    error={errors.email}
                                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                />

                                <TextFieldGroup
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={state.password}
                                    onChange={onChange}
                                    error={errors.password}
                                />

                                <TextFieldGroup
                                    placeholder="Confirm Password"
                                    name="password2"
                                    type="password"
                                    value={state.password2}
                                    onChange={onChange}
                                    error={errors.password2}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Register.protoTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});


export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
































// class Register extends Component {
//     constructor() {
//         super();
//         this.state = {
//             name: '',
//             email: '',
//             password: '',
//             password2: '',
//             errors: {}
//         };

//         // this.onChange = this.onChange.bind(this);
//         // this.onSubmit = this.onSubmit.bind(this);
//     }

//     onChange = (e) => {
//         this.setState({ [e.target.name]: e.target.value })
//     }

//     onSubmit = (e) => {
//         e.preventDefault();

//         const newUser = {
//             name: this.state.name,
//             email: this.state.email,
//             password: this.state.password,
//             password2: this.state.password2,
//         };
//         // axios.post('/api/users/register', newUser)
//         //     .then(res => console.log(res.data))
//         //     .catch(err => this.setState({ errors: err.response.data }));

//         this.props.registerUser(newUser);
//     }

//     render() {

//         const { errors } = this.state;
//         return (
//             <div>
//                 <div className="register">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-md-8 m-auto">
//                                 <h1 className="display-4 text-center">Sign Up</h1>
//                                 <p className="lead text-center">Create your DevConnector account</p>
//                                 <form noValidate onSubmit={this.onSubmit}>
//                                     <div className="form-group">
//                                         <input
//                                             type="text"
//                                             className={classnames(
//                                                 'form-control form-control-lg',
//                                                 {
//                                                     'is-invalid': errors.name
//                                                 }
//                                             )}
//                                             placeholder="Name"
//                                             name="name"
//                                             value={this.state.name}
//                                             onChange={this.onChange}
//                                         />
//                                         {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
//                                     </div>
//                                     <div className="form-group">
//                                         <input
//                                             type="email"
//                                             className={classnames(
//                                                 'form-control form-control-lg',
//                                                 {
//                                                     'is-invalid': errors.email
//                                                 }
//                                             )}
//                                             placeholder="Email Address"
//                                             name="email"
//                                             value={this.state.email}
//                                             onChange={this.onChange}
//                                         />
//                                         {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
//                                         <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
//                                     </div>
//                                     <div className="form-group">
//                                         <input
//                                             type="password"
//                                             className={classnames(
//                                                 'form-control form-control-lg',
//                                                 {
//                                                     'is-invalid': errors.password
//                                                 }
//                                             )}
//                                             placeholder="Password"
//                                             name="password"
//                                             value={this.state.password}
//                                             onChange={this.onChange}
//                                         />
//                                         {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
//                                     </div>
//                                     <div className="form-group">
//                                         <input
//                                             type="password"
//                                             className={classnames(
//                                                 'form-control form-control-lg',
//                                                 {
//                                                     'is-invalid': errors.password2
//                                                 }
//                                             )}
//                                             placeholder="Confirm Password"
//                                             name="password2"
//                                             value={this.state.password2}
//                                             onChange={this.onChange}
//                                         />
//                                         {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
//                                     </div>
//                                     <input type="submit" className="btn btn-info btn-block mt-4" />
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }