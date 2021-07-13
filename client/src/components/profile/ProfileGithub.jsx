import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import isEmpty from '../../validation/isEmpty'

const ProfileGithub = props => {
	const { github } = props

	const [state, setState] = useState({
		clientId: 'b46675043e01deaff97b',
		clientSecret: '7a621f9b5c78e7d37597e92a99eb39b6ead4f531',
		count: 5,
		sort: 'created:asc',
		repos: [],
	})
	const [isLoaded, setIsLoaded] = useState(true)
	const { count, sort, clientId, clientSecret } = state

	const fetchGithub = async () => {
		if (isLoaded) {
			try {
				const response = await fetch(
					`https://api.github.com/users/${github}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
				)
				const json = await response.json()
				setIsLoaded(false)
				setState({ clientId, clientSecret, count, sort, repos: json })
			} catch (err) {
				console.log(err)
			}
		}
	}

	useEffect(() => {
		if (isLoaded) fetchGithub()
		return function cleanup(){
			setIsLoaded(false)
		}
		
	})

	const { repos } = state
	let repoItems
	if(!isEmpty(repos)){
		repoItems= repos.map(item => (
			<div key={item.id} className='card card-body mb-2'>
				<div className='row'>
					<div className='col-md-6'>
						<h4>
							<a href={item.html_url} className='text-info' target='_blank' rel='noopener noreferrer'>
								{item.name}
							</a>
						</h4>
						<p>{item.description}</p>
					</div>
					<div className='col-md-6'>
						<span className='badge badge-info mr-1'>Stars: {item.stargazers_count}</span>
						<span className='badge badge-secondary mr-1'>Watcher: {item.watchers_count}</span>
						<span className='badge badge-success '>Forks: {item.forks_count}</span>
					</div>
				</div>
			</div>
		))
	} 
	
	return (
		<div>
			<hr />
			<h3 className='mb-4'>Latest Github Repositories</h3>
			{repoItems}
		</div>
	)
}

ProfileGithub.propTypes = {
	github: PropTypes.string.isRequired,
}

export default ProfileGithub
