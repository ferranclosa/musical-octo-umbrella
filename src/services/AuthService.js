import axios from 'axios'
import auth from '../components/shared/authentication/auth-helper'

const URL = process.env.REACT_APP_AUTH

let headers ={
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + auth.isAuthenticated('jwt'),
    'Accept': '*/*'

}

const signOut = async (data) => {
    return await axios.post(URL + '/signout', data, {headers: headers})
}

export default
{
    signOut
}