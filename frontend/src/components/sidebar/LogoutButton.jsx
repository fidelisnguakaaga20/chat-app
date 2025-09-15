import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const {loading, logout} = useLogout();
  return (
    <button
      type="button"
      className="grid place-items-center p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition"
      title="Logout"
    >
      {!loading ? (
      <BiLogOut className="w-6 h-6" onClick={logout}/>
      ) : ( 
        <span className="loading-spinner"></span>
      )}
    </button>
  );
};

export default LogoutButton;
