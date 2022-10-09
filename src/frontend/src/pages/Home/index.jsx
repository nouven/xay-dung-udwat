import { Outlet, Link } from 'react-router-dom'
import { AiFillSetting } from 'react-icons/ai'
import { IoCreateOutline } from 'react-icons/io5'
import { BsWallet2 } from 'react-icons/bs'

export default function Home() {
  let sibarItems = [
    {
      id: 1,
      icon: <IoCreateOutline />,
      name: 'New survey',
      link: 'create-survey',
    },
    {
      id: 2,
      icon: <BsWallet2 />,
      name: 'My survey',
      link: 'my-surveys',
    },
    {
      id: 3,
      icon: <AiFillSetting />,
      name: 'Setting',
      link: 'setting',
    },
  ]
  return (
    <div className='flex h-full'>
      <div className='flex flex-col gap-1 border border-black w-[250px] pt-1 select-none '>
        {sibarItems.map((item) => {
          return (
            <Link key={item.id} to={item.link}>
              <div className='flex items-center gap-2 p-2 border text-lg cursor-pointer hover:bg-gray-200'>
                <div className='text-2xl'>{item.icon}</div>
                <div>{item.name}</div>
              </div>
            </Link>
          )
        })}
      </div>
      <div className='flex-1 h-full'>
        <Outlet />
      </div>
    </div>
  )
}
