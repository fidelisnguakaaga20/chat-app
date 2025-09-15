import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from '../../utils/emojis';
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log("CONVERSATIONS:", conversations);
  return (
    <div className='py-2 flex flex-col overflow-y-auto'>
      {conversations.map((conversation, idx) => ( 
        <Conversation 
        // key={conversations._id}
        key={conversation._id ?? idx}
        conversation={conversation}
        emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
  
        />
      ))}
        
      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  );
};

export default Conversations;

