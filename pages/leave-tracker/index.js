import Head from 'next/head';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { IoIosPeople } from 'react-icons/io';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdModeEdit } from 'react-icons/md';
import checkStatus from '../../hooks/checkStatus';
import { read_database } from '../../hooks/firebase';

export default function Dashboard({ leaves }) {

  return (
    <div>
      <Head>
        <title>Leave Tracker - Bibo</title>
        <meta name="description" content="Census Mnagement System" />
        <link rel="icon" href="/favicon.png" />
      </Head>


      <main className="fixed top-0 left-0 w-full h-full bg-neutral-100 flex justify-center">
        <Sidebar />

        <div className="w-4/5">

          <Navbar page="Leave Tracker" />

          <div className='py-8 px-12 space-y-3'>

            <div className='flex items-center px-3 py-4 bg-app-main text-white'>
              <p className='text-sm font-bold'>All Leave</p>

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
              <p className='col-span-4 text-sm p-3 py-4 font-bold'>Name</p>
              <p className='col-span-2 text-sm p-3 py-4 font-bold'>Leave Starts</p>
              <p className='col-span-2 text-sm p-3 py-4 font-bold'>Leave Ends</p>
              <p className='col-span-2 text-sm p-3 py-4 font-bold'>Status</p>
            </div>

            {leaves?.map(({ staff: { passport, firstname, lastname }, from, to }, index) => (
              <div key={index} className='grid grid-cols-12 items-center bg-white text-black'>
                <p className='col-span-1 text-sm p-3 py-4'>{index+1}</p>
                <div className='col-span-1 text-sm p-3 py-4'>
                  <div className='relative h-10 w-10 rounded-full overflow-hidden'>
                    <Image 
                      className='object-fill'
                      src={passport} 
                      alt=""
                      fill
                    />
                  </div>
                </div>
                <p className='col-span-4 text-sm p-3 py-4'>{firstname} {lastname}</p>
                <p className='col-span-2 text-sm p-3 py-4'>{from}</p>
                <p className='col-span-2 text-sm p-3 py-4'>{to}</p>
                <div className='col-span-2 text-sm p-3 py-4 flex justify-start'>
                  {(checkStatus(from, to) === "ended") && 
                    <p className='inline-block bg-green-600 px-2 py-1 rounded-md text-white text-xs font-bold'>
                      ended
                    </p>
                  }
                  {(checkStatus(from, to) === "active") && 
                    <p className='inline-block bg-yellow-300 px-2 py-1 rounded-md text-white text-xs font-bold'>
                      active
                    </p>
                  }
                  {(checkStatus(from, to) === "not started") && 
                    <p className='inline-block bg-neutral-300 px-2 py-1 rounded-md text-neutral-700 text-xs font-bold'>
                      not started
                    </p>
                  }
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>


    </div>
  )
}



export async function getServerSideProps(){
  return{
    props: {
      leaves: await read_database("leaves")

    }
  }
}