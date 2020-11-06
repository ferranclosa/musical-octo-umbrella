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

const saveAMenuGroup = async (data) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorisation': 'Bearer ' + auth.isAuthenticated('jwt'),
        'Accept': '*/*'

    }
   // return axios.post(URL + '/SMNU02/getAllGroups', data, {headers : headers} )
    return axios.post(URL + '/SMNU03/createAMenuGroup', data )
}

const deleteAMenuGroup = async (data) =>{
    return axios.post(URL + '/SMNU04/deleteAMenuGroup', data)
}

const updateAMenuGroup = async (data) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorisation': 'Bearer ' + auth.isAuthenticated('jwt'),
        'Accept': '*/*'

    }
   // return axios.post(URL + '/SMNU02/getAllGroups', data, {headers : headers} )
    return axios.post(URL + '/SMNU06/updateAMenuGroup', data )
}

const getGroupFunctions = async (data, groupId) => {

    data = {...data, groupId: groupId}
    const headers = {
        'Content-Type': 'application/json',
        'Authorisation': 'Bearer ' + auth.isAuthenticated('jwt'),
        'Accept': '*/*'

    }
    return axios.post(URL + '/SMNU07/getAllFunctionsInGroups', data )
}


const findAllFunctions = async (data) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorisation': 'Bearer ' + auth.isAuthenticated('jwt'),
        'Accept': '*/*'

    }
   
    return axios.post(URL + '/SMNU08/findAllFunctions', data )
}


export default
{
    findFunctions,
    findGroups, 
    saveAMenuGroup, 
    deleteAMenuGroup, 
    updateAMenuGroup, 
    getGroupFunctions, 
    findAllFunctions
}