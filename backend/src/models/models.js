import prisma from '../prisma-client.js';

export async function getAllHouses() {
    try {
        const houses = await prisma.casa.findMany()
        return houses;
    } catch (error) {
        console.error('Error fetching houses: ', error);
        throw error;
    }
}

export async function getHouseByParameter(data, page = 1, limit = 10) {
    try {
        const skip = parseInt((page - 1) * limit, 10);
        const houses = await prisma.casa.findMany({
            where: data,
            skip: skip,
            take: limit
        });

        const totalResults = await prisma.casa.count({
            where: data
        });

        return { houses, totalResults };
    } catch (error) {
        console.error('Error fetching houses: ', error);
        throw error;
    }
}

export async function getHouseById(id) {
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

