import Image from 'next/image';
import Link from 'next/link';
import { HiUsers } from 'react-icons/hi';
import { ImBooks } from 'react-icons/im';
import { IoIosPeople } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';
import { RiArrowDropDownLine, RiExchangeFill, RiFileUserFill } from 'react-icons/ri';

export default function Sidebar() {

  const dropdown = (ddf) => {
    let dd = document.querySelector(`div[data-dropdown="${ddf}"]`);

    if(dd.style.maxHeight === "0px" || !dd.style.maxHeight ){
      return dd.style.maxHeight = "10000px";
    }

    dd.style.maxHeight = "0px";
  }

  return (
    <div className='print:hidden w-1/5 py-6 px-4 bg-app-main space-y-6 shadow-2xl h-full'>
      <div className=''>
        <p className='flex items-center justify-center gap-2 pb-4 text-2xl font-bold'>
          <IoIosPeople className="text-white text-3xl" />
          <span className='text-white text-2xl'>
            Censia.ng
          </span>
        </p>
      </div>

      <div className='space-y-2'>
        <Link className="flex gap-3 items-center p-3 text-sm text-white font-bold hover:bg-white hover:text-app-main rounded-md" href="/dashboard">
          <MdDashboard />
          <span className=''>Dashboard</span>
        </Link>
        
        <div className='space-y-1'>
          <div onClick={() => dropdown("books")} data-dropdown-for="books" className="flex gap-3 items-center p-3 text-sm font-bold bg-white text-app-main rounded-md" href="#">
            <ImBooks />
            <span className=''>Staffs</span>
            <RiArrowDropDownLine className='ml-auto' />
          </div>

          <div className='max-h-full overflow-hidden space-y-1' data-dropdown="books">
            <Link className="flex gap-3 items-center p-3 text-sm bg-app-light text-white hover:bg-white hover:text-app-main rounded-md" href="/staffs/">
              <MdDashboard className='invisible' />
              <span className=''>Overview</span>
            </Link>
            <Link className="flex gap-3 items-center p-3 text-sm bg-app-light text-white hover:bg-white hover:text-app-main rounded-md" href="/staffs/new">
              <MdDashboard className='invisible' />
              <span className=''>New staff</span>
            </Link>
          </div>
        </div>

        {/* <div className='space-y-1'>
          <div onClick={() => dropdown("users")} data-dropdown-for="users" className="flex gap-3 items-center p-3 text-sm fake:text-white font-bold bg-white text-app-main rounded-md" href="#">
            <HiUsers />
            <span className=''>Departments</span>
            <RiArrowDropDownLine className='ml-auto' />
          </div>

          <div className='max-h-full overflow-hidden space-y-1' data-dropdown="users">
            <Link className="flex gap-3 items-center p-3 text-sm bg-app-light text-white hover:bg-white hover:text-app-main rounded-md" href="/departments/">
              <MdDashboard className='invisible' />
              <span className=''>Overview</span>
            </Link>
            <Link className="flex gap-3 items-center p-3 text-sm bg-app-light text-white hover:bg-white hover:text-app-main rounded-md" href="/departments/new">
              <MdDashboard className='invisible' />
              <span className=''>Add New department</span>
            </Link>
          </div>
        </div> */}
        
        
        <div className='space-y-1'>
          <div onClick={() => dropdown("loan")} data-dropdown-for="loan" className="flex gap-3 items-center p-3 text-sm fake:text-white font-bold bg-white text-app-main rounded-md" href="#">
            <RiExchangeFill />
            <span className=''>People</span>
            <RiArrowDropDownLine className='ml-auto' />
          </div>

          <div className='max-h-full overflow-hidden space-y-1' data-dropdown="loan">
            <Link className="flex gap-3 items-center p-3 bg-app-light text-sm text-white hover:bg-white hover:text-app-main rounded-md" href="/people">
              <MdDashboard className='invisible' />
              <span className=''>Overview</span>
            </Link>
            <Link className="flex gap-3 items-center p-3 bg-app-light text-sm text-white hover:bg-white hover:text-app-main rounded-md" href="/people/new">
              <MdDashboard className='invisible' />
              <span className=''>Add person</span>
            </Link>
            {/* <Link className="flex gap-3 items-center p-3 bg-app-light text-sm text-white hover:bg-white hover:text-app-main rounded-md" href="/people/statistics">
              <MdDashboard className='invisible' />
              <span className=''>Statistics</span>
            </Link> */}
          </div>
        </div>

      </div>
    </div>
  )
}
