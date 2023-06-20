function BonusDisplayAll(props) {
    return (
      <div className="flex">
        {props.data.map(function (d, id) {
          return (
            <div
              key={d.id}
              className="flex-initial box-decoration-slice w-40 m-5 p-10 bg-gradient-to-r from-indigo-600 to-green-500 text-white px-2"
            >
              <p>{d.name}</p>
              <p>{d.description}</p>
              <p className={"hideIf${encodeURIComponent(data.button)}"}>No Deposit Bonus ${d.nodeposit}</p>
            </div>
          )
        })}
      </div>
    )
  }
  export default BonusDisplayAll
