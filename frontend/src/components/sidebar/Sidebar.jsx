import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-[80vh] w-80 border-r border-slate-500 px-4">
      <SearchInput />
      <div className="divider px-3" />
      <Conversations />
      {/* push logout to bottom */}
      <div className="mt-auto">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;


// STARTER CODE SNIPET
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";

// const Sidebar = () => {
//   return (
//     <div className="flex flex-col h-[80vh] w-80 border-r border-slate-500 px-4">
//       <SearchInput />
//       <div className="divider px-3" />
//       <Conversations />
//       {/* push logout to bottom */}
//       <div className="mt-auto">
//         <LogoutButton />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
