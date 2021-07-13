import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile,deleteAccount } from '../../actions/profileActions'
import ProfileActions from './ProfileActions'
import Experience from './Experience'
import Education from './Education'
import Spinner from '../common/Spinner'
import isEmpty from '../../validation/isEmpty'

export const Dashboard = props => {
	const { user } = props.auth
	const { profile, loading } = props.profile
	const getCurrentProfile = props.getCurrentProfile
	
	const isLoaded = useRef(false)
	useEffect(() => {
		if (!isLoaded.current) getCurrentProfile()
		isLoaded.current = true
	}, [getCurrentProfile])

	const onDeleteClick = (event)=>{
		props.deleteAccount()
	}

	let dashboardContent
	if (profile === null || loading) {
		dashboardContent = <Spinner />
	} else {
		//Check if logged in user has profile data
		if (!isEmpty(profile)) {
			const {experience,education} = profile
			dashboardContent = (
				<div>
					<p className='lead text-muted'>Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
					<ProfileActions/>
					<Experience data={experience}/>
					<Education data={education}/>
					<div style={{marginBottom: '60px'}}> </div>
					<button onClick={onDeleteClick} className="btn btn-danger">Delete My Account</button>
				</div>
			)
		} else {
			//User logged in with no profile
			dashboardContent = (
				<div>
					<p className='lead text-muted'>Welcome {user.name}</p>
					<p>You have not yet setup a profile,please add some info</p>
					<Link to='/create-profile' className='btn btn-lg btn-info'>
						Create Profile
					</Link>
				</div>
			)
		}
	}

	return (
		<div className='dashboard'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-12'>
						<h1 className='display-4'>Dashboard</h1>
						{dashboardContent}
					</div>
				</div>
			</div>
		</div>
	)
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
})

const mapDispatchToProps = dispatch => {
	return {
		getCurrentProfile: () => dispatch(getCurrentProfile()),
		deleteAccount:()=>dispatch(deleteAccount())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
