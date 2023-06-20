import { BsArrowRightCircleFill } from 'react-icons/bs'

const Buttonlight = (props) => {
  return (
    <button className='flex items-center justify-center text-sky-700 dark:bg-white dark:text-black border-2 border-sky-700 dark:border-white px-6 py-3 rounded-lg font-medium'>{props.name}</button>
    
  )
}

export default Buttonlight