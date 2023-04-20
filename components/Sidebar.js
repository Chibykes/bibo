import Link from 'next/link';
import { ImBooks } from 'react-icons/im';
import { IoIosPeople } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri';

export default function Sidebar() {

  const dropdown = (ddf) => {
    let dd = document.querySelector(`div[data-dropdown="${ddf}"]`);

    if(dd.style.maxHeight === "0px" || !dd.style.maxHeight ){
      return dd.style.maxHeight = "10000px";
    }

    dd.style.maxHeight = "0px";
  }

  return (
    <div className='print:hidden w-1/5 py-6 bg-app-main space-y-6 shadow-2xl h-full overflow-auto'>
      <div className=''>
        <p className='flex items-center justify-center gap-2 pb-4 text-2xl font-bold'>
          <IoIosPeople className="text-white text-3xl" />
          <span className='text-white text-2xl'>
            Bibo
          </span>
        </p>
      </div>

      <div className='space-y-2'>
        <Link className="flex gap-3 items-center p-3 text-sm text-white font-bold hover:bg-white hover:text-app-main" href="/dashboard">
          <MdDashboard />
          <span className=''>Dashboard</span>
        </Link>
        
        <div className='space-y-1'>
          <div onClick={() => dropdown("books")} data-dropdown-for="books" className="flex gap-3 items-center p-3 text-sm font-bold bg-gray-900 text-white" href="#">
            <ImBooks />
            <span className=''>Staffs</span>
            <RiArrowDropDownLine className='ml-auto' />
          </div>

          <div className='max-h-0 overflow-hidden space-y-1' data-dropdown="books">
            <Link className="flex gap-3 items-center p-3 text-sm bg-app-light text-white hover:bg-white hover:text-app-main" href="/staffs/">
              <MdDashboard className='invisible' />
              <span className=''>Overview</span>
            </Link>
            <Link className="flex gap-3 items-center p-3 text-sm bg-app-light text-white hover:bg-white hover:text-app-main" href="/staffs/new">
              <MdDashboard className='invisible' />
              <span className=''>New staff</span>
            </Link>
            <Link 
              className="flex gap-3 items-center p-3 text-sm bg-app-light text-white hover:bg-white hover:text-app-main"
              href="/staffs/check-in"
            >
              <MdDashboard className='invisible' />
              <span className=''>Check-In</span>
            </Link>
            <Link 
              className="flex gap-3 items-center p-3 text-sm bg-app-light text-white hover:bg-white hover:text-app-main"
              href="/staffs/check-out"
            >
              <MdDashboard className='invisible' />
              <span className=''>Check-Out</span>
            </Link>
          </div>
        </div>
        
        <div className='space-y-1'>
          <div onClick={() => dropdown("leave")} data-dropdown-for="leave" className="flex gap-3 items-center p-3 text-sm font-bold bg-gray-900 text-white" href="#">
            <ImBooks />
            <span className=''>Leave Tracker</span>
            <RiArrowDropDownLine className='ml-auto' />
          </div>

          <div className='max-h-0 overflow-hidden space-y-1' data-dropdown="leave">
            <Link 
              className="flex gap-3 items-center p-3 text-sm bg-app-light text-white hover:bg-white hover:text-app-main" 
              href="/leave-tracker/"
            >
              <MdDashboard className='invisible' />
              <span className=''>Overview</span>
            </Link>
            <Link 
              className="flex gap-3 items-center p-3 text-sm bg-app-light text-white hover:bg-white hover:text-app-main"
              href="/leave-tracker/leave-application"
            >
              <MdDashboard className='invisible' />
              <span className=''>Apply for Leave</span>
            </Link>
          </div>
        </div>

        <div className='space-y-1'>
          <div onClick={() => dropdown("tasks")} data-dropdown-for="tasks" className="flex gap-3 items-center p-3 text-sm font-bold bg-gray-900 text-white" href="#">
            <ImBooks />
            <span className=''>Tasks</span>
            <RiArrowDropDownLine className='ml-auto' />
          </div>

          <div className='max-h-0 overflow-hidden space-y-1' data-dropdown="tasks">
            <Link className="flex gap-3 items-center p-3 text-sm bg-app-light text-white hover:bg-white hover:text-app-main" href="/tasks/">
              <MdDashboard className='invisible' />
              <span className=''>All Task</span>
            </Link>
            <Link className="flex gap-3 items-center p-3 text-sm bg-app-light text-white hover:bg-white hover:text-app-main" href="/tasks/new">
              <MdDashboard className='invisible' />
              <span className=''>New Task</span>
            </Link>
          </div>
        </div>

        <div className='space-y-1'>
          <div onClick={() => dropdown("apprasial")} data-dropdown-for="apprasial" className="flex gap-3 items-center p-3 text-sm font-bold bg-gray-900 text-white" href="#">
            <ImBooks />
            <span className=''>Apprasial</span>
            <RiArrowDropDownLine className='ml-auto' />
          </div>

          <div className='max-h-0 overflow-hidden space-y-1' data-dropdown="apprasial">
            <Link className="flex gap-3 items-center p-3 text-sm bg-app-light text-white hover:bg-white hover:text-app-main" href="/tasks/">
              <MdDashboard className='invisible' />
              <span className=''>Recommendations</span>
            </Link>
            <Link className="flex gap-3 items-center p-3 text-sm bg-app-light text-white hover:bg-white hover:text-app-main" href="/tasks/new">
              <MdDashboard className='invisible' />
              <span className=''>Appraised Staff</span>
            </Link>
          </div>
        </div>


      </div>
    </div>
  )
}
