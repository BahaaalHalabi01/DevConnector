import React from 'react'
import isEmpty from '../../validation/isEmpty'
import PropTypes from 'prop-types'

const ProfileHeader = props => {
	const { profile } = props
	const { social } = profile
	let links=(<div></div>)

	if (!isEmpty(social)) {
		 links = (
			<div className='container'>
				<div className='row justify-content-md-center'>
					{!isEmpty(profile.website) ? (
						<div className='col col-1'>
							<a className='text-white p-2' href={`https:${profile.website}`} target='_blank' rel='noopener noreferrer'>
								<i className='fas fa-globe fa-2x'></i>
							</a>
						</div>
					) : null}
					{!isEmpty(social.youtube) ? (
						<div className='col col-1'>
							<a className='text-white p-2' href={`https:${social.youtube}`} target='_blank' rel='noopener noreferrer'>
								<i className='fab fa-youtube fa-2x'></i>
							</a>
						</div>
					) : null}
					{!isEmpty(social.twitter) ? (
						<div className='col col-1'>
							<a className='text-white p-2' href={`https:${social.twitter}`} target='_blank' rel='noopener noreferrer'>
								<i className='fab fa-twitter fa-2x'></i>
							</a>
						</div>
					) : null}

					{!isEmpty(social.facebook) ? (
						<div className='col col-1'>
							<a className='text-white p-2' href={`https:${social.facebook}`} target='_blank' rel='noopener noreferrer'>
								<i className='fab fa-facebook fa-2x'></i>
							</a>
						</div>
					) : null}
					{!isEmpty(social.linkedin) ? (
						<div className='col col-1'>
							<a className='text-white p-2' href={`https:${social.linkedin}`} target='_blank' rel='noopener noreferrer'>
								<i className='fab fa-linkedin fa-2x'></i>
							</a>
						</div>
					) : null}

					{!isEmpty(social.instagram) ? (
						<div className='col col-1'>
							<a className='text-white p-2' href={`https:${social.instagram}`} target='_blank' rel='noopener noreferrer'>
								<i className='fab fa-instagram fa-2x'></i>
							</a>
						</div>
					) : null}
				</div>
			</div>
		)
	}

	return (
		<div className='row'>
			<div className='col-md-12'>
				<div className='card card-body bg-info text-white mb-3'>
					<div className='row'>
						<div className='col-4 col-md-3 m-auto'>
							<img className='rounded-circle' src={profile.user.avatar} alt='' />
						</div>
					</div>
					<div className='text-center'>
						<h1 className='display-4 text-center'>{profile.user.name}</h1>
						<p className='lead text-center'>
							{profile.status} {isEmpty(profile.company) ? null : <span>at {profile.company}</span>}
						</p>
						<p>{isEmpty(profile.location) ? null : <span>{profile.location}</span>}</p>
					</div>
					{links}
				</div>
			</div>
		</div>
	)
}

ProfileHeader.propTypes = {
	profile: PropTypes.object.isRequired,
}

export default ProfileHeader
