import axios from 'axios'
import auth from '../components/shared/authentication/auth-helper'

const URL = 'http://localhost:8087'

let headers ={
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + auth.isAuthenticated('jwt'),
    'Accept': '*/*'

}

const getStatus = async () => {
    return await axios.get(URL + '/SDTA01/getStatus')
}


export default
{
    getStatus
}