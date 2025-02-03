import { api } from "../services/api";

export async function deleteRegister(registerid, table){ // mudar tudo pra promise com .then
    try {
        const response = await api.put(`/admin/deleteRegister/${registerid}/${table}`);
        return response;
    } catch (error) {
        console.log('Erro ao deletar registro:', error);
        throw error;
    }
}

export async function createNewRegister(params, table){
    try {
        const response = api.post(`/admin/createNewRegister/${table}`, params);
        return response;
    } catch (error) {
        console.log('Erro ao criar registro:', error);
        throw error;
    }
}

export async function updateRegister(params, table){
    try {
        const response = api.put(`/admin/updateRegister/${table}`, params);
        return response;
    } catch (error) {
        console.log('Erro ao atualizar registro:', error);
        throw error;
    }
}

export async function getRegister(registerid, table){
    try {
        const response = api.get(`/admin/getRegisterById/${registerid}/${table}`);
        return response;
    } catch (error) {
        console.log('Erro ao buscar registro:', error);
        throw error;
    }
}