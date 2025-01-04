const prisma = require('../prisma-client');

async function getAllHouses () {
    try {
        const houses = await prisma.casa.findMany()
        return houses;
    } catch (error) {
        console.error('Error fetching houses: ', error);
        throw error;
    }
}

async function getHouseByParameter(data){ // precisa montar tipo assim: { dormitorios: 3, banheiros: 3 }

    try {
        const houses = await prisma.casa.findMany({
            where: data
        })
        return houses;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getHouseById(id){
    try {
        const house = await prisma.casa.findUnique({
            where: {
                idcasa: parseInt(id)
            }
        })
        return house;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports = {
    getAllHouses,
    getHouseByParameter,
    getHouseById
}