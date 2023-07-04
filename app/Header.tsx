import HeaderClient from "./HeaderClient";
import { CgMenuLeft } from "react-icons/cg";

const Header: React.FC<{}> = () => {
  return <HeaderClient mobileIcon={<CgMenuLeft />} />;
};

export default Header;
