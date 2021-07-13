import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProfileHeader from './ProfileHeader'
import ProfileCreds from './ProfileCreds'
import ProfileGithub from './ProfileGithub'
import ProfileAbout from './ProfileAbout'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'
import { getProfileByHandle } from '../../actions/profileActions'
import isEmpty from '../../validation/isEmpty'

export const Profile = props => {
	const { handle } = props.match.params
	const { getProfileByHandle, history,errors } = props
	const { profile, loading } = props.profile
	let profileContent

	if (profile === null || loading) {
		profileContent = <Spinner />
	} else {
		profileContent = (
			<div>
				<div className='row'>
					<div className='col-md-6'>
						<Link to='/profiles' className='btn btn-light mb-3 float-left'>
							Back To profiles
						</Link>
					</div>
					<div className='col-md-6'></div>
				</div>
				<ProfileHeader profile={profile} />
				<ProfileAbout profile={profile} />

				<ProfileCreds education={profile.education} experience={profile.experience} />
				{isEmpty(profile.githubusername) ? null : <ProfileGithub github={profile.githubusername} />}
			</div>
		)
	}



	useEffect(() => {
		if (handle) getProfileByHandle(handle)
	}, [handle, getProfileByHandle])


	useEffect(() => {
		if (profile === null && loading && errors.noprofile) {
			history.push('/not-found')
		}
	},[profile,loading,history,errors])


	return (
		<div className='profile'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-12'>{profileContent}</div>
				</div>
			</div>
		</div>
	)
}

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile)
