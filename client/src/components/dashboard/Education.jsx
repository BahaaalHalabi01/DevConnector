import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileActions'

export const Education = props => {

    
	const education = props.data.map(edu => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td>{edu.degree}</td>
			<td>
				<Moment format='DD/MM/YY'>{edu.from}</Moment> - {!edu.current ? <Moment format='DD/MM/YY'>{edu.to}</Moment>: ' Currently Undergoing'}
			</td>
			<td>
				<button className='btn btn-danger' onClick={()=>props.deleteEducation(edu._id)}>Delete</button>
			</td>
		</tr>
	))
	return (
		<div >
			<h4 className='mb-4'>Education Data</h4>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col'>School</th>
						<th scope='col'>Degree</th>
						<th scope='col'>Years</th>
						<th scope='col'></th>
					</tr>
				</thead>
                <tbody>{education}</tbody>
				
			</table>
		</div>
	)
}

Education.propTypes = {
    deleteEducation:PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education)
