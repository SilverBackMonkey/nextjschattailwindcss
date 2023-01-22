import Image from "next/image";
const BankOptions = (props) => {
  const banks = props.data.bankListItems;
  const casino = props.data.casinoData.casinoname;
  return (
    <div className="flex flex-col">
      <div className="flex justify-between md:justify-start md:space-x-4 p-4 items-center select-none cursor-pointer">
        <h4>Payment methods at {casino}</h4>
      </div>
      <hr className="m-4" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-8">
        {banks.map(function (d, id) {
          return (
            <div key={id} className="flex items-center flex-col justify-end ">
              <div className="flex justify-center">
                <Image
                  unoptimized // avoids getting charged
                  width={d.bank_data.tw}
                  height={d.bank_data.th}
                  alt={d.bank_data.name}
                  src={`https://www.allfreechips.com/image/banks/${encodeURIComponent(
                    d.bank_data.image
                  )}`}
                />
              </div>
              <div className="space-x-2 flex justify-center">
                {d.bank_data.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BankOptions;
