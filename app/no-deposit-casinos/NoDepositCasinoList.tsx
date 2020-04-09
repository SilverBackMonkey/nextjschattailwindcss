
import { FaAngleDown } from "react-icons/fa";
import CasinoDisplayList from "../../components/CasinoDisplayList";

const NoDepositCasinoList = (props: NoDepositCasinoList) => {

  const casinoData =props.bonus
  return (
    <div>
      <CasinoDisplayList data={casinoData} />
      
    </div>
  );
};
interface NoDepositCasinoList {
  bonus: any;
}
export default NoDepositCasinoList;
