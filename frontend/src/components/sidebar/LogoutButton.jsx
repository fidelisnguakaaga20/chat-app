// import { BiLogOut } from "react-icons/bi";

// const LogoutButton = () => {
//   return (
//     <div className="mt-auto">
//         <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
//     </div>
//   );
// };

// export default LogoutButton;



import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  return (
    <button
      type="button"
      className="grid place-items-center p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition"
      title="Logout"
    >
      <BiLogOut className="w-6 h-6" />
    </button>
  );
};

export default LogoutButton;
