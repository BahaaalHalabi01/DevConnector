import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileActions'

export const Experience = props => {
	const experience = props.data.map(exp => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td>{exp.title}</td>
			<td>
				<Moment format='DD/MM/YY'>{exp.from}</Moment> - {!exp.current ? <Moment format='DD/MM/YY'>{exp.to}</Moment>: ' Currently Undergoing'}
			</td>
			<td>
				<button className='btn btn-danger' onClick={()=>props.deleteExperience(exp._id)}>Delete</button>
			</td>
		</tr>
	))
	return (
		<div >
			<h4 className='mb-4'>Experience Data</h4>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col'>Company</th>
						<th scope='col'>Title</th>
						<th scope='col'>Years</th>
						<th scope='col'></th>
					</tr>
				</thead>
                <tbody>{experience}</tbody>
				
			</table>
		</div>
	)
}

Experience.propTypes = {
    deleteExperience:PropTypes.func.isRequired
}

export default connect(null, {deleteExperience})(Experience)
