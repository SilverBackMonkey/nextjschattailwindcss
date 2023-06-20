const DisplayDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    const d = date.date
    try {
      d.getUTCFullYear();
    } catch (e) {
      return 'error'
    }
    const year = d.getUTCFullYear();
    const month = months[d.getUTCMonth()];
    const day = d.getUTCDay();
    return  month + ", " + day + " " +year ;
  };
  export default DisplayDate;
  