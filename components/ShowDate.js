import {useFormatter} from 'next-intl';
 
function ShowDate(date) {
  const format = useFormatter();
  const dateTime = date.date
 
  format.dateTime(dateTime, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
 
  format.dateTime(dateTime, {hour: 'numeric', minute: 'numeric'});
}
export default ShowDate