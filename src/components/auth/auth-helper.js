const auth = {

    isAuthenticated() {
    if (typeof window == 'undefined') return false;
    if (sessionStorage.getItem('jwt')) return JSON.parse(JSON.stringify(sessionStorage.getItem('jwt')));
    else return false;
  },

  parseJwtUser(jwt) {
    if (!jwt)  
    return
    if (jwt =='')
    return
    const base64Url = jwt.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    const w =  JSON.parse(window.atob(base64))
    return w.sub;
  }, 

  parseJwt(jwt) {
    if (!jwt)  
    return
    if (jwt =='')
    return
    const base64Url = jwt.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
  }, 

  authenticate(jwt){
    if (typeof window !== 'undefined'){
        sessionStorage.setItem('jwt', jwt)
        sessionStorage.setItem('currentUser', auth.parseJwtUser(jwt))
    }
  }, 


clearJWT(token) {
  if (typeof window != 'undefined'){
    sessionStorage.removeItem('jwt')
    sessionStorage.removeItem('currentUser')
  }
},
getSessionCurrentUser() {
  if (typeof window !== 'undefined'){
return      sessionStorage.getItem('currentUser')
  }
}
};

export default auth;
