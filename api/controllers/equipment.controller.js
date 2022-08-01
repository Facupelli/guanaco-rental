const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getEquipment(req, res, next) {
    const equipment = await prisma.equipment.findMany({});
    res.json(equipment);
}

module.exports = { getEquipment };
