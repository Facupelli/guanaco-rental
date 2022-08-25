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
        dniNumber: data.dniNumber,
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
        contacts: data.contacts,
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

    const response = {
      message: "success",
      user: upsertUser
    }

    res.json(response);
  } catch (e) {
    console.log("postUser error:", e);
    return;
  }
}

async function putUser(req, res, next) {
  const data = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: data.userId },
      data: {
        customerAproved: data.customerAproved,
        customerAprovedAt: new Date(),
      },
    });

    res.json({ message: "success", updatedUser });
  } catch (e) {
    console.log("putUser error:", e);
    return;
  }
}

async function getUsers(req, res, next) {
  const { newClients, clients, search } = req.query;

  try {
    let users;

    if (newClients) {
      users = await prisma.user.findMany({
        where: { petitionSent: true, customerAproved: false },
      });
    }

    if (clients) {
      if (search && search !== "undefined") {
        users = await prisma.user.findMany({
          where: {
            AND: [
              {
                fullName: {
                  search: search,
                },
              },
              { customerAproved: true },
            ],
          },
          include: { orders: true },
        });
      } else {
        users = await prisma.user.findMany({
          where: { customerAproved: true },
          include: { orders: true },
        });
      }
    }

    res.json(users);
  } catch (e) {
    console.log("getUsers error:", e);
  }
}

module.exports = { postUser, getUsers, putUser };
