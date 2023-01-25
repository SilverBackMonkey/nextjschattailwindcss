import HeaderClient from "./HeaderClient";

interface props {
  getData : (type: number, key: string, firstPageIndex: number) => any,
  getCount: (type: number, key: string) => any
}

const Header: React.FC<props> = ({getData, getCount}) => {
  return <HeaderClient getData={getData} getCount={getCount}/>;
};

export default Header;
