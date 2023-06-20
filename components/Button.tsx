import { BsArrowRightCircleFill } from 'react-icons/bs'

const Button = (props) => {
  return (
    <button className='flex items-center bg-sky-600 text-white dark:bg-white dark:text-black py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500 font-medium'>{props.name}<BsArrowRightCircleFill className='mx-4' /></button>
    
  )
}

export default Button