const { PrismaClient } = require("@prisma/client");
const { sendMail } = require("../utils/mailer");
const prisma = new PrismaClient();

async function postUser(req, res, next) {
  const data = req.body;

  try {
    const upsertUser = await prisma.user.upsert({
      where: {
        email: data.email,
      },
      include: {
        orders: { select: { number: true } },
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
    next(e);
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

    const CLIENT_EMAIL = process.env.CLIENT_MAIL;

    const mailOptions = {
      from: `Guanaco Rental <${CLIENT_EMAIL}>`,
      to: `${updatedUser.email}`,
      subject: `ALTA DE CLIENTE`,
      template: "clientApproved",
      context: {
        fullName: `${updatedUser.fullName}`,
      },
    };

    const sendConfirmationMail = await sendMail(mailOptions);

    res.json({ message: "success", updatedUser });
  } catch (e) {
    next(e);
  }
}

async function getUsers(req, res, next) {
  const { newClients, clients, search, admins } = req.query;

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
              { role: "USER" },
            ],
          },
          include: { orders: true },
        });
      } else {
        users = await prisma.user.findMany({
          where: { AND: [{ customerApproved: true }, { role: "USER" }] },
          include: { orders: true },
          orderBy: { customerApprovedAt: "desc" },
        });
      }
    }

    if (admins) {
      users = await prisma.user.findMany({
        where: { OR: [{ role: "ADMIN" }, { role: "EMPLOYEE" }] },
        orderBy: { updatedAt: "desc" },
        include: { orders: true },
      });
    }

    res.json(users);
  } catch (e) {
    next(e);
  }
}

async function getUniqueUser(req, res, next) {
  const { email } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        fullName: true,
        orders: true,
        phone: true,
        dniNumber: true,
        customerApproved: true,
        petitionSent: true,
        addressProvince: true,
      },
    });

    res.json({ user });
  } catch (e) {
    next(e);
  }
}

module.exports = { postUser, getUsers, getUniqueUser, putUser };
