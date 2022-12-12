import * as yup from "yup";

export const schema = yup
  .object({
    fullName: yup.string().required(),
    phone: yup.number().typeError("debe ser un número").required(),
    birthDate: yup.date().required(),
    address: yup.string().required(),
    addressLocation: yup.string().required(),
    addressProvince: yup.string().required(),
    dniNumber: yup.number().typeError("debe ser un número").required(),
    occupation: yup.string().required(),
    student: yup.boolean(),
    employee: yup.boolean(),
    company: yup.string(),
    cuit: yup.string(),
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
    cbu: yup.number().typeError("debe ser un número").required(),
  })
  .required();
