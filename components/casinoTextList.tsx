const CasinoText = ({data}) => {
  console.log(data)
  return (
    <div >
      {data?.map((c, index) => (
        <div className ="flex " key={index}>
          <span className="w-20">ID: {c.id}</span>
         <span className="w-30">{c.casino}</span>
         <span className="w-15">{c.nodeposit}</span>
         <span className="w-15">{c.deposit}</span>
         <span className="w-10">{c.hot}</span>
         <span className="w-10">{c.new}</span>
        </div>
      ))}
    </div>
  );
};

export default CasinoText;
