const autho = {

}
///Creación de token
autho.createToken = (token)=>{
    localStorage.setItem('RappiDeliciasKey',token);//Se almacena token en LocalStorage
    localStorage.setItem('user', atob(token.split('.')[1]));//Almacena la información del usuario   
}
//Obtener Token
autho.getToken = ()=>{
    return localStorage.getItem('RappiDeliciasKey');
}
//Verificación token
autho.isToken = ()=>{
    if(localStorage.getItem('RappiDeliciasKey')==null){
        //this.$router.push({name: 'login'});
        return false;
    }else{
        return true;
    }
}

autho.limpiar = ()=>{
    localStorage.clear();
}

module.exports = autho;