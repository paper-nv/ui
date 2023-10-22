import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import accountServices from "../services/account/accountServices";
// import PageLoader from "../components/loaders/pageLoader";
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState();

  useQuery(["fetchUserDetails"], accountServices.profile, {
    retry: 0,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.log("context error", error);
    },
    onSuccess: (response) => {
      if (response.status === 200) {
        setUserDetails(response?.data);
      } else {
        console.log("Error occurred");
      }
    },
  });

  // if (query.isLoading) return <PageLoader />;

  return (
    <UserContext.Provider value={{ userDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
