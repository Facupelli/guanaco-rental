const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postUser(req, res, next) {
  const data = req.body;

  try {
    const upsertUser = await prisma.user.upsert({
      where: {
        email: data.email,
      },
      update: {
        phone: data.phone,
        fullName: data.fullName,
        dni: { dniFront: data.dniFront, dniBack: data.dniBack },
        birthDate: new Date(data.birthDate),
        address: data.address,
        addressLocation: data.addressLocation,
        addressProvince: data.addressProvince,
        occupation: data.occupation,
        student: data.student,
        employee: data.employee,
        company: data.company,
        cuit: data.cuit,
        bussinessName: data.bussinessName,
        bank: data.bank,
        alias: data.alias,
        cbu: data.cbu,
        petitionSent: data.petitionSent,
        customerAproved: data.customerAproved,
      },
      create: {
        email: data.email,
      },
    });

    res.json(upsertUser);
  } catch (e) {
    console.log("postUser error:", e);
    return;
  }
}

async function getUsers(req, res, next) {
  const { newClients, clients } = req.query;

  let users;

  if (newClients) {
    users = await prisma.user.findMany({
      where: { petitionSent: true },
    });
  }

  if (clients) {
    users = await prisma.user.findMany({
      where: { customerAproved: true },
    });
  }

  res.json(users);
}

module.exports = { postUser, getUsers };
