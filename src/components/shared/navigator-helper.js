const navigate = {


  parseJwtPageable(jwt) {
    if (!jwt)  
    return
    if (jwt =='')
    return
    const base64Url = jwt.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    const w =  JSON.parse(window.atob(base64))
    return w.sub;
  }, 

  parsePageable(jwt) {
    if (!jwt)  
    return
    if (jwt =='')
    return
    const base64Url = jwt.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
  }, 

  storePage(jwt){
    if (typeof window !== undefined){
        sessionStorage.setItem('pageable', jwt)
    }
  }, 

  
clearPageable(token) {
  if (typeof window != undefined){
    sessionStorage.removeItem('pageable')
  }
}
};

export default navigate;
