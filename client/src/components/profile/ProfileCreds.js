import React from 'react';
import Moment from 'react-moment';

const ProfileCreds = ({ experience, education }) => {

    const expItems = experience.map(exp => (
        <li key={exp._id} className="list-group-item">
            <h4>{exp.company}</h4>
            <p>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment>
                {exp.to === null ? ('now') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
            </p>
            <p>
                <strong>Positiom:</strong> {exp.title}
            </p>
            <p>
                {exp.location === null ? null : (<span><strong>Location: </strong>{exp.location}</span>)}
            </p>
            <p>
                {exp.description === null ? null : (<span><strong>Description: </strong>{exp.description}</span>)}
            </p>
        </li>
    ))

    const eduItems = education.map(edu => (
        <li key={edu._id} className="list-group-item">
            <h4>{edu.school}</h4>
            <p>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment>
                {edu.to === null ? ('now') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
            </p>
            <p>
                <strong>Position:</strong> {edu.degree}
            </p>
            <p>
                {edu.fieldofstudy === null ? null : (<span><strong>Field of Study: </strong>{edu.fieldofstudy}</span>)}
            </p>
            <p>
                {edu.description === null ? null : (<span><strong>Description: </strong>{edu.description}</span>)}
            </p>
        </li>
    ))

    return (
        <div className="row">
            <div className="col-md-6">
                <h3 className="text-center text-info">Experience</h3>
                {expItems.length > 0 ? (
                    <ul className="list-group">{expItems}</ul>
                ) : (
                    <p className="text-center">No Experience Listed</p>
                )}
            </div>
            <div className="col-md-6">
                <h3 className="text-center text-info">Education</h3>
                {eduItems.length > 0 ? (
                    <ul className="list-group">{eduItems}</ul>
                ) : (
                    <p className="text-center">No Education Listed</p>
                )}
            </div>
        </div>
    )
}

export default ProfileCreds
