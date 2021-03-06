import axios from 'axios'
import { GET_PROFILES, GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from './types'

//Profile Loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING,
	}
}
//Get current profile
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading())
	axios
		.get('/api/profile')
		.then(res => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		})
		.catch(() =>
			dispatch({
				type: GET_PROFILE,
				payload: {},
			})
		)
}
//Create Profile
export const createProfile = (profileData, history) => dispatch => {
	console.log(profileData)
	axios
		.post('/api/profile', profileData)
		.then(res => history.push('/'))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}
//Add experience
export const addExperience = (experienceData, history) => dispatch => {
	axios
		.post('/api/profile/experience', experienceData)
		.then(() => history.push('/dashboard'))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}
//Add education
export const addEducation = (educationData, history) => dispatch => {
	axios
		.post('/api/profile/education', educationData)
		.then(() => history.push('/'))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}
//Clear profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE,
	}
}
//Delete Experience
export const deleteExperience = id => dispatch => {
	axios
		.delete(`/api/profile/experience/${id}`)
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}
//Delete Education
export const deleteEducation = id => dispatch => {
	axios
		.delete(`/api/profile/education/${id}`)
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}
//Get Profiles
export const getProfiles = () => dispatch => {
	axios
		.get('/api/profile/all')
		.then(res =>
			dispatch({
				type: GET_PROFILES,
				payload: res.data,
			})
		)
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}
//Get profile by handle
export const getProfileByHandle = handle => dispatch => {
	dispatch(setProfileLoading())
	axios
		.get(`/api/profile/handle/${handle}`)
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

//Delete account
export const deleteAccount = () => dispatch => {
	if (window.confirm('Are you sure? This can NOT be undone!')) {
		axios
			.delete('/api/profile')
			.then(res =>
				dispatch({
					type: SET_CURRENT_USER,
					payload: {},
				})
			)
			.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
	}
}
