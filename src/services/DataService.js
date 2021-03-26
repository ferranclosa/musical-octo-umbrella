import axios from 'axios'
import auth from '../../src/components/auth/auth-helper'

const URL = 'http://localhost:8087'

 let headers ={
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + auth.isAuthenticated('jwt'),
     'Accept': '*/*', 
     'Access-Control-Allow-Origin': '*'

}

const getStatus = async () => {
    return await axios.get(URL + '/SDTA01/getStatus', headers)
}


export default
{
    getStatus
}