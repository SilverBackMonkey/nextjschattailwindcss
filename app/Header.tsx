import HeaderClient from "./HeaderClient";
import { CgMenuLeft } from "react-icons/cg";
import { fetchUnreadMessages, fetchUnreadMessagesCount } from "./lib/NotificationFetch";

function Header() {

  return <HeaderClient mobileIcon={<CgMenuLeft />} />;
};

export default Header;