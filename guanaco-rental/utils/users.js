export const getNewClientUsers = async (token) => {
  return await fetch(
    process.env.NODE_ENV === "production"
      ? `https://www.guanacorental.shop/rentalapi/users?newClients=${true}`
      : `http://localhost:3001/users?newClients=${true}`,
    { headers: { authorization: `${token}` } }
  ).then((response) => response.json());
};

export const getClientUsers = async (search, skip, token) => {
  return await fetch(
    process.env.NODE_ENV === "production"
      ? `https://www.guanacorental.shop/rentalapi/users?clients=${true}&skip=${skip}&search=${search}`
      : `http://localhost:3001/users?clients=${true}&skip=${skip}&search=${search}`,
    { headers: { authorization: `${token}` } }
  ).then((response) => response.json());
};
