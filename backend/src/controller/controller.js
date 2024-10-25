const housesModel = require('../models/models');

const getAllHouses = async (req, res) => {
    const houses = await housesModel.getAllHouses()
    
    if (houses) {
        res.status(200).json({ data: houses });
    } else{
        res.status(404).json({ msg: 'Ocorreu um erro, recarregue a página' })
    }
}

module.exports = {
    getAllHouses,
    
}