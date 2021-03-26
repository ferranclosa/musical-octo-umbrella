import axios from 'axios'
import auth from '../components/auth/auth-helper'


//const URL = "http://localhost:9090/authentication"
 const URL = "http://localhost:8686"

let headers ={
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + auth.isAuthenticated('jwt'),
    'Accept': '*/*' 

}
const getRoles = async () => {
    return await axios.get(URL + '/auth/roles')
}

const signOut = async (data) => {
    return await axios.post(URL + '/auth/signout', data, {headers: headers})
}

const signIn = async (data) => {
    //return await axios.post(URL + '/auth/authenticate', data, {headers: headers})
    return await axios.post(URL + '/auth/authenticate', data)
}
const register = async (data) => {
    return await axios.post(URL + '/auth/register', data)
}
export default
{
    signOut, 
    signIn, 
    register, 
    getRoles
}