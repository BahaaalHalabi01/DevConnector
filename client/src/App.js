import './App.css'

import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './components/common/PrivateRoute'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
//Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import setAuthToken from './utils/setAuthToken'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/add-credentials/AddExperience'
import AddEducation from './components/add-credentials/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import NotFound from './components/common/NotFound'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
//Actions
import { logoutUser, setCurrentUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'

function App() {
	//Check for token
	if (localStorage.jwtToken) {
		//set auth token header auth
		setAuthToken(localStorage.jwtToken)
		//decode token and get user info and exp
		const decoded = jwt_decode(localStorage.jwtToken)
		//set user and is authenticated
		store.dispatch(setCurrentUser(decoded))

		//check for expired token
		const currentTime = Date.now() / 1000
		if (decoded.exp < currentTime) {
			//logout user
			store.dispatch(logoutUser())
			//clear current profile
			store.dispatch(clearCurrentProfile())
			//redirect to login
			return <Redirect to='/login' />
		}
	}

	return (
		<Provider store={store}>
			<Router>
				<div className='App'>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<div className='container'>
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
						<Switch>
							<PrivateRoute exact path='/dashboard' component={Dashboard} />
						</Switch>
						<Switch>
							<PrivateRoute exact path='/create-profile' component={CreateProfile} />
						</Switch>
						<Switch>
							<PrivateRoute exact path='/edit-profile' component={EditProfile} />
						</Switch>
						<Switch>
							<PrivateRoute exact path='/add-experience' component={AddExperience} />
						</Switch>
						<Switch>
							<PrivateRoute exact path='/add-education' component={AddEducation} />
						</Switch>
						<Switch>
							<PrivateRoute exact path='/profiles' component={Profiles} />
						</Switch>
						<Switch>
							<PrivateRoute exact path='/profile/:handle' component={Profile} />
						</Switch>
						<Switch>
							<PrivateRoute exact path='/feed' component={Posts} />
						</Switch>
						<Switch>
							<PrivateRoute exact path='/post/:id' component={Post} />
						</Switch>
						<Route exact path='/not-found' component={NotFound} />

					</div>
					<Footer />
				</div>
			</Router>
		</Provider>
	)
}

export default App
