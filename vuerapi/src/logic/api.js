import axios from "axios";

const API = "https://api-rappidelicias.herokuapp.com";

export default {

    obtenerTodo(subdir,tok){
        const axi1 = `${API}/${subdir}`
        return axios.post(axi1,{token:tok});
    },

    obtenerUno(subdir, tok){
        const axi1 = `${API}/${subdir}`
        return axios.post(axi1,{token:tok});
    },

    crear(subdir, obj){
        const axi1 = `${API}/${subdir}`
        return axios.post(axi1, obj);
    },

    actualizar(subdir, dato){
        const axi1 = `${API}/${subdir}`
        return axios.put(axi1, dato);
    },

    borrar(subdir, tok){
        const axi1 = `${API}/${subdir}`
        return axios.delete(axi1, {token:tok});
    }
}