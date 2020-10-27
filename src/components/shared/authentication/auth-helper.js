const auth = {

    isAuthenticated() {
        if (typeof window === undefined)
            return false
        if (sessionStorage.getItem('jwt'))
            return JSON.parse(JSON.stringify(sessionStorage.getItem('jwt')))
        else
            return false
    },
    authenticate(jwt) {
        if (typeof window === undefined) {
            sessionStorage.setItem('jwt', jwt)
            sessionStorage.setItem('currentUser', auth.parseJwtUser(jwt))
        }

    },
    parseJwtUser(token) {
        if (!token) {
            return
        }
        if (token == '') {
            return
        }
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')
        const w = JSON.parse(window.atob(base64))
        return w.sub
    },
    clearJWT() {
        if (typeof window !== undefined) {
            sessionStorage.removeItem('jwt')
            sessionStorage.removeItem('profile')
            sessionStorage.removeItem('currentUser')
        }
    },

    parseJwt(token) {
        if (!token) {
            return
        }
        if (token == '') {
            return
        }
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')
        return JSON.parse(window.atob(base64))

    },
    setSessionProfile(profile){
        if(typeof window !== "undefined"){
            sessionStorage.setItem('profile', profile)
        }
    },
    getSessionProfile(){
        if(typeof window !== "undefined"){
           return  sessionStorage.getItem('profile')
        }
    }


}

export default auth