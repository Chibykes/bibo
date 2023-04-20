import Head from 'next/head';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { IoIosPeople } from 'react-icons/io';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { MdModeEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';

export default function People() {

  const [people, setPeople] = useState([]);
  useEffect(() => {
    setPeople(JSON.parse(localStorage.getItem('people')) || []);
  }, []);

  return (
    <div>
      <Head>
        <title>People - Bibo</title>
        <meta name="description" content="Census Mnagement System" />
        <link rel="icon" href="/favicon.png" />
      </Head>


      <main className="fixed top-0 left-0 w-full h-full bg-neutral-100 flex justify-center">
        <Sidebar />

        <div className="w-4/5">

          <Navbar page="People" />

          <div className='py-8 px-12 space-y-3'>

            <div className='flex items-center px-3 py-4 bg-app-main text-white'>
              <p className='text-sm font-bold'>All Persons Records</p>

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
              <p className='col-span-2 text-sm p-3 py-4 font-bold'>State of Origin</p>
              <p className='col-span-2 text-sm p-3 py-4 font-bold'>Email</p>
              <p className='col-span-2 text-sm p-3 py-4 font-bold'>Phone</p>
              <p className='col-span-1 text-sm p-3 py-4 font-bold'>Actions</p>
            </div>

            {people?.map(({ passport, firstname, lastname, state, email, phone }, index) => (
              <div key={index} className='grid grid-cols-12 items-center bg-white text-black'>
                <p className='col-span-1 text-sm p-3 py-4'>{index+1}</p>
                <p className='col-span-1 text-sm p-3 py-4'>
                  <div className='relative h-10 w-10 rounded-full overflow-hidden'>
                    <Image className='object-fill' src={passport} fill/>
                  </div>
                </p>
                <p className='col-span-3 text-sm p-3 py-4'>{firstname} {lastname}</p>
                <p className='col-span-2 text-sm p-3 py-4'>{state}</p>
                <p className='col-span-2 text-sm p-3 py-4'>{email}</p>
                <p className='col-span-2 text-sm p-3 py-4'>{phone}</p>
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
