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
        customerApproved: data.customerApproved,
      },
      create: {
        email: data.email,
      },
    });

    const response = {
      message: "success",
      user: upsertUser,
    };

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
        customerApproved: data.customerApproved,
        customerApprovedAt: new Date(),
        petitionSent: data.petitionSent,
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
        where: { petitionSent: "PENDING", customerApproved: false },
        orderBy: { updatedAt: "desc" },
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
              { customerApproved: true },
            ],
          },
          include: { orders: true },
        });
      } else {
        users = await prisma.user.findMany({
          where: { customerApproved: true },
          include: { orders: true },
          orderBy: { customerApprovedAt: "desc" },
        });
      }
    }

    res.json(users);
  } catch (e) {
    console.log("getUsers error:", e);
  }
}

async function getUniqueUser(req, res, next) {
  const { email } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    res.json(user);
  } catch (e) {
    console.log("getUniqueUser error:", e);
    return;
  }
}

module.exports = { postUser, getUsers, getUniqueUser, putUser };
