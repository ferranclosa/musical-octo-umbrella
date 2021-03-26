import axios from 'axios'
import auth from '../components/auth/auth-helper'

//const URL = process.env.REACT_APP_MENU
//const URL = 'http://localhost:9090/data-server'


// const URL = 'http://localhost:9090/data'

const URL = 'http://localhost:8087'

 let headers ={
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + auth.isAuthenticated('jwt'),
     'Accept': '*/*' 
    

}

const findFunctions = async (data) => {
    let headers ={
        'Content-Type': 'application/json',
        'Accept': '*/*', 
        'Access-Control-Allow-Origin': '*'
    
    }
    return await axios.post(URL + '/open/SMNU01/getAllFunctionGroups', data, {headers: headers})
}

const findGroups = async (data) => {
    const headers = {
         'Content-Type': 'application/json',
         'Authorisation': 'Bearer ' + auth.isAuthenticated('jwt'),
         'Accept': '*/*'

     }
   return axios.post(URL + '/SMNU02/getAllGroups', data, {headers : headers} )
  //  return axios.post(URL + '/SMNU02/getAllGroups', data )
}

const saveAMenuGroup = async (data) => {
    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorisation': 'Bearer ' + auth.isAuthenticated('jwt'),
    //     'Accept': '*/*'

    // }
   // return axios.post(URL + '/SMNU02/getAllGroups', data, {headers : headers} )
    return axios.post(URL + '/SMNU03/createAMenuGroup', data )
}

const deleteAMenuGroup = async (data) =>{
    return axios.post(URL + '/SMNU04/deleteAMenuGroup', data)
}

const updateAMenuGroup = async (data) => {
    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorisation': 'Bearer ' + auth.isAuthenticated('jwt'),
    //     'Accept': '*/*'

    // }
   // return axios.post(URL + '/SMNU02/getAllGroups', data, {headers : headers} )
    return axios.post(URL + '/SMNU06/updateAMenuGroup', data )
}

const getGroupFunctions = async (data, groupId) => {

    data = {...data, groupId: groupId}
    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorisation': 'Bearer ' + auth.isAuthenticated('jwt'),
    //     'Accept': '*/*'

    // }
    return axios.post(URL + '/SMNU07/getAllFunctionsInGroups', data )
}


const findAllFunctions = async (data) => {
    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorisation': 'Bearer ' + auth.isAuthenticated('jwt'),
    //     'Accept': '*/*'

    // }
   
    return axios.post(URL + '/SMNU08/findAllFunctions', data )
}
const findApps = async (data) => {
     const headers = {
         'Content-Type': 'application/json',
         'Authorisation': 'Bearer ' + auth.isAuthenticated('jwt'),
         'Accept': '*/*'

     }
   return axios.post(URL + '/SMNU10/getAllApps', data, {headers : headers} )
  //  return axios.post(URL + '/SMNU02/getAllGroups', data )
}

const findOptions= async (data) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorisation': 'Bearer ' + auth.isAuthenticated('jwt'),
        'Accept': '*/*'

    }
  return axios.post(URL + '/SMNU20/getAllOptions', data, {headers : headers} )
 //  return axios.post(URL + '/SMNU02/getAllGroups', data )
}

const findFunctionOptions= async (data) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorisation': 'Bearer ' + auth.isAuthenticated('jwt'),
        'Accept': '*/*'

    }
  return axios.post(URL + '/SMNU30/getFunctionOptions', data, {headers : headers} )
 //  return axios.post(URL + '/SMNU02/getAllGroups', data )
}

export default
{
    findFunctions,
    findGroups, 
    saveAMenuGroup, 
    deleteAMenuGroup, 
    updateAMenuGroup, 
    getGroupFunctions, 
    findAllFunctions, 
    findApps, 
    findOptions, 
    findFunctionOptions
}