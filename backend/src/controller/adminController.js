import * as adminModels from '../models/adminModels.js';


export async function getAllRegisters(req, res) {
    try {
        const registers = await adminModels.getAllRegisters();
        console.log(registers);
        res.status(200).json({ data: registers });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export async function createNewRegister(req, res) {
    const { params, table } = req.body;
    const allowedTables = ['casa']; // colocar as outras dps e talvez mover p middleware
    if (!allowedTables.includes(table)) {
        return res.status(400).json({ error: 'Tabela inválida' });
    }
    try {
        const newRegister = await adminModels.createNewRegister(params, table);
        res.status(201).json({ message: 'Registro criado com sucesso', data: newRegister });
    } catch (error) {
        console.error('Erro ao criar registro:', error);
        res.status(500).json({ error: 'Erro interno do servidor', message: error.message });
    }
}

export async function getAllRegistersFromSpecificTable(req, res) {
    const { table } = req.params;
    const allowedTables = ['casa']; // colocar as outras dps
    if (!allowedTables.includes(table)) {
        return res.status(400).json({ error: 'Tabela inválida' });
    }
    try {
        const registers = await adminModels.getAllRegistersFromSpecificTable(table);
        res.status(200).json({ data: registers });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export async function getRegisterById(req, res) {
    const { id, table } = req.params;
    const allowedTables = ['casa']; // replace with your actual table names
    if (!allowedTables.includes(table)) {
        return res.status(400).json({ error: 'Tabela inválida' });
    }
    if (!id) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    try {
        const register = await adminModels.getRegisterById(id, table);
        if (!register) {
            return res.status(404).json({ error: 'Registro não encontrado' });
        }
        res.status(200).json({ data: register });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export async function updateRegister(req, res) {
    const { params } = req.body;
    const { id, table } = req.params;
    const allowedTables = ['casa']; // replace with your actual table names
    if (!allowedTables.includes(table)) {
        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }
    try {
        const updatedRegister = await adminModels.updateRegister(table, id, params)
        res.status(200).json({ message: 'Registro atualizado com sucesso', data: updatedRegister });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor', msg: error.message });
    }
}

export async function deleteRegister(req, res) {
    const { id, table } = req.params;
    const allowedTables = ['casa'];
    if (!allowedTables.includes(table)) {
        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }
    try {
        await adminModels.deleteRegister(id, table);
        res.status(200).json({ message: 'Registro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor', error: error.message });
    }
}

export async function searchRegisters(req, res) {
    const { keyword, table } = req.body;

    if (table) {
        const allowedTables = ['casa'];
        if (!allowedTables.includes(table)) {
            return res.status(400).json({ error: 'Tabela inválida' });
        } else {
            try {
                const registers = await adminModels.searchSpecificRegisters(keyword, table);
                return res.status(200).json({ data: registers });
            } catch (error) {
                return res.status(500).json({ error: 'Erro interno do servidor', error: error.message });
            }
        }
    } else {
        try {
            const registers = await adminModels.searchAllRegisters(keyword);
            return res.status(200).json({ data: registers });
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor', error: error.message });
        }
    }


}