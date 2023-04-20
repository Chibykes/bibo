import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { MdModeEdit } from 'react-icons/md';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { read_database } from '../../hooks/firebase';



export default function Staffs({ staffs }) {

  console.table(staffs);

  return (
    <div>
      <Head>
        <title>Staffs - Bibo</title>
        <meta name="description" content="Census Mnagement System" />
        <link rel="icon" href="/favicon.png" />
      </Head>


      <main className="fixed top-0 left-0 w-full h-full bg-neutral-100 flex justify-center">
        <Sidebar />

        <div className="w-4/5">

          <Navbar page="Staffs" />

          <div className='py-8 px-12 space-y-3'>

            <div className='flex items-center px-3 py-4 bg-app-main text-white'>
              <p className='text-sm font-bold'>All Staff Records</p>

              {/* <div className='ml-auto'>
                <input 
                  className='block border-2 p-2 border-white bg-transparent rounded-lg placeholder:text-white'
                  placeholder='Search for books'
                />
              </div> */}
            </div>

            <div className='grid grid-cols-12 text-app-main bg-white'>
              <p className='col-span-1 text-sm p-3 py-4 font-bold'>S/N</p>
              <p className='col-span-1 text-sm p-3 py-4 font-bold'>Passport</p>
              <p className='col-span-3 text-sm p-3 py-4 font-bold'>Name</p>
              <p className='col-span-2 text-sm p-3 py-4 font-bold'>Department</p>
              <p className='col-span-2 text-sm p-3 py-4 font-bold'>Email</p>
              <p className='col-span-2 text-sm p-3 py-4 font-bold'>Username</p>
              <p className='col-span-1 text-sm p-3 py-4 font-bold'>Actions</p>
            </div>

            {staffs?.map(({ passport, firstname, lastname, department, email, username }, index) => (
              <div key={index} className='grid grid-cols-12 items-center bg-white text-black'>
                <p className='col-span-1 text-sm p-3 py-4'>{index+1}</p>
                <div className='col-span-1 text-sm p-3 py-4'>
                  <div className='relative h-10 w-10 rounded-full overflow-hidden'>
                    <Image className='object-fill' src={passport} fill/>
                  </div>
                </div>
                <p className='col-span-3 text-sm p-3 py-4'>{firstname} {lastname}</p>
                <p className='col-span-2 text-sm p-3 py-4'>{department}</p>
                <p className='col-span-2 text-sm p-3 py-4'>{email}</p>
                <p className='col-span-2 text-sm p-3 py-4'>{username}</p>
                <p className='col-span-1 text-sm p-3 py-4 flex justify-center'>
                  <Link href="#">
                    <MdModeEdit className="text-sky-600 text-xl" />
                  </Link>
                </p>
              </div>
            ))}
          </div>

        </div>
      </main>


    </div>
  )
}



export async function getServerSideProps(context){

  return {
    props: {
      staffs: await read_database("staffs")
    }
  }

}