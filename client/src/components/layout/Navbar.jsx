import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'

const Navbar = props => {
	const { isAuthenticated, user } = props.auth

	const onLogoutClick = event => {
		event.preventDefault()
		props.clearCurrentProfile()
		props.logoutUser()
	}

	const authLinks = (
		<ul className='navbar-nav ml-auto'>
			<li className='nav-item'>
				<Link className='nav-link' to='/feed'>
					Post Feed
				</Link>
			</li>
			<li className='nav-item'>
				<Link className='nav-link' to='/dashboard'>
					Dashboard
				</Link>
			</li>
			<li className='nav-item'>
				<img
					className='rounded-circle'
					src={user.avatar}
					alt={user.name}
					title='You must have a gravatar connected to your email to display an image'
					style={{ width: '25px', marginRight:'5px'}}
				/>
				<button type='button' onClick={onLogoutClick} className='btn btn-outline-secondary'>
					Logout
				</button>
			</li>
		</ul>
	)

	const guestLinks = (
		<ul className='navbar-nav ml-auto'>
			<li className='nav-item'>
				<Link className='nav-link' to='/register'>
					Sign Up
				</Link>
			</li>
			<li className='nav-item'>
				<Link className='nav-link' to='/login'>
					Login
				</Link>
			</li>
		</ul>
	)

	return (
		<nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
			<div className='container'>
				<Link className='navbar-brand' to='/'>
					DevConnector
				</Link>
				<button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#mobile-nav'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='mobile-nav'>
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item'>
							<Link className='nav-link' to='/profiles'>
								{' '}
								Developers
							</Link>
						</li>
					</ul>
					{isAuthenticated ? authLinks : guestLinks}
				</div>
			</div>
		</nav>
	)
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	clearCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logoutUser: () => dispatch(logoutUser()),
		clearCurrentProfile: () => dispatch(clearCurrentProfile()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
