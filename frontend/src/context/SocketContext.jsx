// import { createContext, useEffect, useState, useContext } from "react";
// import { useAuthContext } from "./AuthContext";
// import io from "socket.io-client";

// const SocketContext = createContext(null);

// export const useSocketContext = () => useContext(SocketContext);


// export const SocketContextProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] =useState([]);
//   const {authUser} = useAuthContext();

//   useEffect(() => {
//     if(authUser) {
//       const socket = io("http://localhost:5000", {
//         query: {
//           userId: authUser._id
//         }
//       });
//       setSocket(socket);

//         // socket.on() is used to listen to the events. can be used both on client and server side
//       socket.on("getOnlineUsers", (users) => {
//         setOnlineUsers(users);
//       });

//       return () => socket.close();
//     } else {
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//   },[authUser]);

//   return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>;
// };



// frontend/src/context/SocketContext.jsx
import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext(null);

// FIX: use the actual context in the hook
export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  // allow env override in prod, keep localhost fallback for dev
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

  useEffect(() => {
    if (authUser?._id) {
      const s = io(SOCKET_URL, {
        withCredentials: true, // allow cookies with socket transport
        query: { userId: authUser._id },
      });

      setSocket(s);

      s.on("getOnlineUsers", (users) => setOnlineUsers(users));

      return () => s.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    // re-connect when user logs in/out or when SOCKET_URL changes
  }, [authUser?._id, SOCKET_URL]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
