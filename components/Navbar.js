import Link from 'next/link';
import { BsFillBellFill } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';

export default function Navbar({ page }) {

  return (
    <div className='print:hidden flex items-center justify-end p-6 gap-6 bg-white border-none border-neutral-200'>
      <p className='mr-auto font-bold text-2xl'>{page}</p>

      <Link className="flex flex-col items-center gap-1 text-app-primary" href="#">
        <BsFillBellFill className='text-xl' />
        {/* <span className='text-xs font-bold'>Notifications</span> */}
      </Link>
      <Link className="flex flex-col items-center gap-1 text-app-primary" href="#">
        <HiUserCircle className='text-xl' />
        {/* <span className='text-xs font-bold'>Profile</span> */}
      </Link>

    </div>
  )
}
