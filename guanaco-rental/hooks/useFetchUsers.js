import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getClientUsers, getNewClientUsers } from "../utils/users";

export const useFetchClients = (clients, skip, token) => {
  const [clientUsers, setClientUsers] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(false);

  const [search, setSearch] = useState("");

  const refetchClients = () => {
    setClientsLoading(true);
    getClientUsers(search, skip, token)
      .then((res) => setClientUsers(res))
      .catch((e) => console.log("fetch error:", e))
      .finally(() => setClientsLoading(false));
  };

  useEffect(() => {
    if (token) {
      refetchClients();
    }
  }, [token, search, skip]);

  return {
    clientUsers: clientUsers?.users,
    totalUsers: clientUsers?.totalUsers,
    clientsLoading,
    search,
    setSearch,
    refetchClients,
  };
};

export const useFetchNewClients = (newClients, token) => {
  const [newClientUsers, setNewClientUsers] = useState([]);
  const [newClientsLoading, setNewClientsLoading] = useState(false);

  const refetchNewClients = () => {
    setNewClientsLoading(true);
    getNewClientUsers(token)
      .then((res) => setNewClientUsers(res))
      .catch((e) => console.log("fetch error:", e))
      .finally(() => setNewClientsLoading(false));
  };

  useEffect(() => {
    if (token) {
      refetchNewClients();
    }
  }, [token]);

  return { newClientUsers, newClientsLoading, refetchNewClients };
};
