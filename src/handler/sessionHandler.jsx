import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useHandleSession = (ref) => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      let user = await fetch(
        `${import.meta.env.VITE_BASE_URL}accounts/profile`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSession(user);
    }

    getUser();

    session != null && session?.status != 200
      ? navigate("../sign-in", { state: { ref: ref } })
      : null;
  });
};

export default useHandleSession;
