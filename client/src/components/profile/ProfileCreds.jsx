import React from 'react'
import Moment from 'react-moment'
import isEmpty from '../../validation/isEmpty'
import PropTypes from 'prop-types'

const ProfileCreds = props => {
	const { education, experience } = props
	let educationList, experienceList

	if (experience.length === 0) {
		experienceList = <li className='list-group-item text-center'>No Experiences Listed Yet</li>
	} else {
		experienceList = experience.map((item, index) => (
			<li key={index} className='list-group-item'>
				<h4>{item.company}</h4>
				<p>
					<Moment format='DD/MM/YY'>{item.from}</Moment> - {!item.current ? <Moment format='DD/MM/YY'>{item.to}</Moment> : ' Currently Undergoing'}{' '}
				</p>
				<p>
					{' '}
					<strong>Position:</strong> {item.title}
				</p>
				{!isEmpty(item.description) ? (
					<p>
						<strong>Description:</strong> {item.description}
					</p>
				) : null}
			</li>
		))
	}

	if (education.length === 0) {
		educationList = <li className='list-group-item text-center'>No Education Listed Yet</li>
	} else {
		educationList = education.map((item, index) => (
			<li key={index} className='list-group-item'>
				<h4>{item.school}</h4>
				<p>
					<Moment format='DD/MM/YY'>{item.from}</Moment> - {!item.current ? <Moment format='DD/MM/YY'>{item.to}</Moment> : ' Currently Undergoing'}{' '}
				</p>
				<p>
					{' '}
					<strong>Degree:</strong> {item.degree}
				</p>
				<p>
					<strong>Field Of Study:</strong> {item.fieldofstudy}
				</p>
				{!isEmpty(item.description) ? (
					<p>
						<strong>Description:</strong> {item.description}
					</p>
				) : null}
			</li>
		))
	}
	return (
		<div className='row'>
			<div className='col-md-6'>
				<h3 className='text-center text-info'>Experience</h3>
				<ul className='list-group'>{experienceList}</ul>
			</div>
			<div className='col-md-6'>
				<h3 className='text-center text-info'>Education</h3>
				<ul className='list-group'>{educationList}</ul>
			</div>
		</div>
	)
}

ProfileCreds.propTypes = {
	education: PropTypes.array.isRequired,
	experience: PropTypes.array.isRequired,
}
export default ProfileCreds
