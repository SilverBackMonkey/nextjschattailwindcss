"use client";
import { useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import CasinoDisplayList from "../../components/CasinoDisplayList";

const NoDepositCasinoList = (props: NoDepositCasinoList) => {
  const pageNumber = useRef<number>(1);
  const [casinoData, setCasinoData] = useState<string[]>(props.bonus);
  return (
    <div>
      <CasinoDisplayList data={casinoData} />
      <div
        className="flex justify-center items-center text-xl font-medium md:text-3xl py-2 md:py-6 cursor-pointer"
        onClick={() => {
          fetch(`/api/noDeposit/?pageNumber=${pageNumber.current + 1}`, {
            next: {
              revalidate: 3,
            },
          })
            .then((res) => {
              if (!res.ok) {
                throw res;
              }
              return res.json();
            })
            .then((res) => {
              setCasinoData([...casinoData, ...res.bonus]);
              pageNumber.current = pageNumber.current + 1;
            })
            .catch((err) => {});
        }}
      >
        Show more
        <FaAngleDown className="mx-4 text-lg font-thin md:text-4xl" />
      </div>
    </div>
  );
};
interface NoDepositCasinoList {
  bonus: any;
}
export default NoDepositCasinoList;
