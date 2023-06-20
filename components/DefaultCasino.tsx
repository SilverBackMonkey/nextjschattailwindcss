import Image from "next/legacy/image";
import ima from "../public/images/nitro.png";
import { BsFillStarFill } from "react-icons/bs";
import Button from "./Button";

const DefaultCasino = (props) => {
  return (
    <div className={props.classs}>
      <Image src={ima} height={300} width={400} alt={"Lapalander"} />
      <span>Planet 7 Casino</span>
      <span className="flex items-center">
        <BsFillStarFill />
        <BsFillStarFill />
        <BsFillStarFill />
        <BsFillStarFill />
        <BsFillStarFill />
        <span className="px-2">4.1</span>
      </span>
      <Button name={"Play Now"} />
      <hr className="w-full border-sky-700 dark:border-white h-0.5" />
      <span>Deposit Bonus</span>
      <span>320% up to $3,200</span>
      <hr className="w-full border-sky-700 dark:border-white h-0.5" />
      <span>No Deposit Bonus</span>
      <span>25 Free Spins</span>
    </div>
  );
};

export default DefaultCasino;
