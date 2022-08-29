export const getOrCreateUser = async (user) => {
  const data = JSON.stringify({ email: user.email });

  const upsertUser = await fetch("http://localhost:3001/users", {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());

  return upsertUser;
};

export const getUniqueUser = async (email) => {
  const user = await fetch(`http://localhost:3001/users/${email}`)
    .then((response) => response.json())
    .catch((e) => console.log("fecth error:", e));

  return user;
};
