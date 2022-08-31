import * as yup from "yup";

export const schema = yup
  .object({
    fullName: yup.string().required(),
    phone: yup.string().required(),
    birthDate: yup.date().required(),
    address: yup.string().required(),
    addressLocation: yup.string().required(),
    addressProvince: yup.string().required(),
    dniNumber: yup.string().required(),
    occupation: yup.string().required(),
    student: yup.boolean(),
    employee: yup.boolean(),
    company: yup.string(),
    cuit: yup.string().required(),
    bussinessName: yup.string(),
    contacts: yup.object({
      contact1: yup.string().required(),
      bond1: yup.string().required(),
      contact2: yup.string().required(),
      bond2: yup.string().required(),
      contact3: yup.string(),
      bond3: yup.string(),
    }),
    bank: yup.string().required(),
    alias: yup.string().required(),
    cbu: yup.string().required(),
  })
  .required();
