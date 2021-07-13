import React, { useRef,useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import { getProfiles } from '../../actions/profileActions'
import isEmpty from '../../validation/isEmpty'
import ProfileItem from './ProfileItem'

export const Profiles = props => {
	const isLoaded = useRef(false)
    const getProfiles = props.getProfiles
	useEffect(() => {
		if (!isLoaded.current) getProfiles()
		isLoaded.current = true
	}, [getProfiles])

	const { profiles, loading } = props.profile
	let profileItems
	if (profiles === null || loading) profileItems = <Spinner />
	else {
		if (isEmpty(profiles)) {
			profileItems = <h4>No profiles found...</h4>
		} else {
			profileItems = profiles.map(profile=>(
				<ProfileItem key={profile._id} profile={profile}/>
			))
		}
	}

	return <div className='profiles'>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Developer Profiles</h1>
                    <p className="lead text-center">Browse and Connect with developers</p>
                    {profileItems}
                </div>
            </div>
        </div>

    </div>
}

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	profile: state.profile,
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
