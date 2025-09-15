// import { useEffect } from "react";
// import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";

// const useListenMessages = () => {
//   const { socket } = useSocketContext();
//   const { messages, setMessages } = useConversation();

//   useEffect(() => {
//     socket?.on("newMessage", (newMessage) => {
//       newMessage.shouldShake = true;
//       new Audio("/sounds/notification.wav").play();

     
//       setMessages([...messages, newMessage]);
//     });

//     return () => socket?.off("newMessage");
//   }, [socket, setMessages, messages]);
// };

// export default useListenMessages;



// src/hooks/useListenMessages.js
import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      newMessage.shouldShake = true;
      new Audio("/sounds/notification.wav").play().catch(() => {});
      setMessages(prev => [...prev, newMessage]);   // ← no stale closure
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, setMessages]);
};

export default useListenMessages;
