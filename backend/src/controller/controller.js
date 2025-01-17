import * as housesModel from '../models/models.js';

export const getAllHouses = async (req, res) => {
    const houses = await housesModel.getAllHouses()
    
    if (houses) {
        res.status(200).json({ data: houses });
    } else{
        res.status(404).json({ msg: 'Ocorreu um erro, recarregue a página' });
    }
}

export const getHouseByParameter = async (req, res) => {
    const { page = 1, limit = 10, ...filters } = req.body;
    try {
        const { houses, totalResults } = await housesModel.getHouseByParameter(filters, page, limit);
        res.status(200).json({
            data: houses,
            totalResults,
            totalPages: Math.ceil(totalResults / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getHouseById = async (req, res) => {
    const id = req.params.id;
    const house = await housesModel.getHouseById(id);
    if (house){
        res.status(200).json({ data: house })
    } else{
        res.status(404).json({ msg: 'Ocorreu um erro, recarregue a página' });
    }
}

