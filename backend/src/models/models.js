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

async function getHouseByParameter(data){

    try {
        const house = await prisma.casa.findMany({
            where: data
        })
        console.log(house);
    } catch (error) {
        console.error(error);
    }
}

getHouseByParameter();

module.exports = {
    getAllHouses,

}