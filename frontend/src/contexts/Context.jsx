/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// Creamos el contexto
export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [pass, setPass] = useState(null);
  const [tokenData, setTokenData] = useState(localStorage.getItem("token"));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleToken = (updateToken) => setToken(updateToken);
  const handleUser = (updateUser) => setUser(updateUser);
  const handlePass = (updatePass) => setPass(updatePass);
  const handleTokenData = (updateTokenData) => setTokenData(updateTokenData);

  const logOut = () => {
    handleToken(null);
    handleUser(null);
    setTokenData(null);
    localStorage.removeItem("token");
  };

  // Función para validar el usuario
  const validateUser = async (url, user, pass) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user,
          password: pass,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al conectar con la url ${url}: ${errorMessage}`);
      }

      const data = await response.json();
      setData(data);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setError(error.message);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch de los datos del usuario cuando el token cambia
  // useEffect(() => {
  //   if (tokenData) {
  //     const fetchUserData = async () => {
  //       try {
  //         const response = await fetch("http://localhost:3000/usuario", {
  //           headers: {
  //             Authorization: `Bearer ${tokenData}`,
  //           },
  //         });

  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }

  //         const userData = await response.json();
  //         setUser(userData);
  //       } catch (error) {
  //         console.error("Failed to fetch user data:", error);
  //       }
  //     };

  //     fetchUserData();
  //   }
  // }, [tokenData]);

  return (
    <Context.Provider
      value={{
        token,
        handleToken,
        user,
        handleUser,
        pass,
        handlePass,
        tokenData,
        handleTokenData,
        logOut,
        data,
        loading,
        error,
        validateUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
