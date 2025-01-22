import prisma from "../prisma-client.js";
import { casaSearchQuery, terrenoSearchQuery } from "../utils/adminQueries.js";

// precisa melhorar mto a arquitetura dessa bagaça

export async function createNewRegister(params, table) {
    try {
        const newRegister = await prisma[table].create({ data: params });
        return newRegister;
    } catch (error) {
        throw error;
    }
}

export async function getAllRegistersFromSpecificTable(table) {
    try {
        const registers = await prisma[table].findMany({ where: { ativo: true } });
        return registers;
    } catch (error) {
        throw error;
    }
}

export async function getRegisterById(id, table) {
    try {
        const register = prisma[table].findUnique({ where: { idcasa: Number(id), ativo: true }})
        return register
    } catch (error) {
        throw error;
    }
}

export async function updateRegister(table, id, params){
    try {
        const updatedRegister = await prisma[table].update({ where: { idcasa: Number(id), ativo: true }, data: params });
        return updatedRegister;
    } catch (error) {
        throw error;
    }
}

export async function deleteRegister(id, table){
    try {
        await prisma[table].update({ where: { idcasa: Number(id) }, data: { ativo: false } });
        return true;
    } catch (error) {
        throw error;
    }
}

export async function searchAllRegisters(keyword) {
    try {
        const casaQuery = casaSearchQuery(keyword);
        const casas = await prisma.casa.findMany(casaQuery);

        // const terrenoQuery = terrenoSearchQuery(keyword);
        // const terrenos = await prisma.terrenos.findMany(terrenoQuery);

        // const registers = {
        //     casas: casas ? [casas] : [],
        //     terrenos: terrenos ? [terrenos] : []
        // }

        // return registers;
        return casas;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function searchSpecificRegisters(keyword, table) {

    switch (table) {
        case 'casa':
            try {
                const query = casaSearchQuery(keyword);
                const registers = await prisma[table].findMany(query);
                return registers;
            } catch (error) {
                console.error(error);
                throw error;
            }

        case 'terreno':
            try {
                const query = terrenoSearchQuery(keyword);
                const registers = await prisma[table].findMany(query);
                return registers;
            } catch (error) {
                console.error(error);
                throw error;
            }
        default:
            return searchAllRegisters(keyword);
    }

}