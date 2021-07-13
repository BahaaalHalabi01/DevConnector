import { GET_ERRORS } from '../actions/types'
import { CLEAR_ERRORS } from '../actions/types'

const initialState = {}

const errorReducer = (state = initialState, action) => {
	switch (action.type) {
		case CLEAR_ERRORS:
			return {} 
		case GET_ERRORS:
			return action.payload
		default:
			return state
	}
}

export default errorReducer
