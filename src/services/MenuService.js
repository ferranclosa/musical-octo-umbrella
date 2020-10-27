import axios from 'axios'
import auth from '../components/shared/authentication/auth-helper'

//const URL = process.env.REACT_APP_MENU
const URL = 'http://localhost:8087'

let headers ={
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + auth.isAuthenticated('jwt'),
    'Accept': '*/*'

}

const findFunctions = async (data) => {
    return await axios.post(URL + '/open/SMNU01/getAllFunctionGroups', data)
}

const findGroups = async (data) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorisation': 'Bearer ' + auth.isAuthenticated('jwt'),
        'Accept': '*/*'

    }
   // return axios.post(URL + '/SMNU02/getAllGroups', data, {headers : headers} )
    return axios.post(URL + '/SMNU02/getAllGroups', data )
}

export default
{
    findFunctions,
    findGroups
}