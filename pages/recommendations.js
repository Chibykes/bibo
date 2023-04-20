import Head from 'next/head';

import Image from 'next/image';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { add_doc, read_database } from '../hooks/firebase';

import { FaCheck, FaCheckDouble } from 'react-icons/fa'

export default function Dashboard({ staffs, recommendationsList }) {

  const [recommended, setRecommended] = useState(recommendationsList || []);

  const appraiseStaff = (sid) => {
    setRecommended([...recommended, staffs.find(({sid: id}) => id === Number(sid))]);
    add_doc(
      "recommendations",
      staffs.find(({sid: id}) => id === Number(sid))
    );
  }


  return (
    <div>
      <Head>
        <title>Recommendations - Bibo</title>
        <meta name="description" content="Census Mnagement System" />
        <link rel="icon" href="/favicon.png" />
      </Head>


      <main className="fixed top-0 left-0 w-full h-full bg-neutral-100 flex justify-center">
        <Sidebar />

        <div className="w-4/5">

          <Navbar page="Recommendations" />

          <div className='py-8 px-12 space-y-3'>

            <div className='flex items-center px-3 py-4 bg-app-main text-white'>
              <p className='text-sm font-bold'>Staff Recommended for Apprasial</p>

              {/* <div className='ml-auto'>
                <input 
                  className='block border-2 p-2 border-white bg-transparent rounded-lg placeholder:text-white'
                  placeholder='Search for books'
                />
              </div> */}
            </div>

            <div className='grid grid-cols-12 text-app-main bg-white'>
              <p className='col-span-1 text-sm p-3 py-4 font-bold'>S/N</p>
              <p className='col-span-2 text-sm p-3 py-4 font-bold'>Passport</p>
              <p className='col-span-4 text-sm p-3 py-4 font-bold'>Name</p>
              <p className='col-span-3 text-sm p-3 py-4 font-bold'>Staff ID</p>
              <p className='col-span-2 text-sm p-3 py-4 font-bold'>Actions</p>
            </div>

            {staffs?.map(({ sid, passport, firstname, lastname, status }, index) => (
              (!recommended.map(({sid: s}) => s).includes(sid)) &&
              <div key={index} className='grid grid-cols-12 items-center bg-white text-black'>
                <p className='col-span-1 text-sm p-3 py-4'>{index+1}</p>
                <div className='col-span-2 text-sm p-3 py-4'>
                  <div className='relative h-10 w-10 rounded-full overflow-hidden'>
                    <Image  alt="" className='object-fill' src={passport} fill/>
                  </div>
                </div>
                <p className='col-span-4 text-sm p-3 py-4'>{firstname} {lastname}</p>
                <p className='col-span-3 text-sm p-3 py-4'>STAFF/{sid}</p>
                <div className='col-span-2 text-sm p-3 py-4'>
                  <p 
                    className='inline-block bg-app-main px-2 py-1 rounded-md text-white text-xs font-bold'
                    onClick={() => appraiseStaff(sid)}
                  >
                    <FaCheck className />
                  </p>
                </div>
              </div>
            ))}

            {staffs?.map(({ sid, passport, firstname, lastname, status }, index) => (
              (recommended.map(({sid: s}) => s).includes(sid)) &&
              <div key={index} className='grid grid-cols-12 items-center bg-white text-black'>
                <p className='col-span-1 text-sm p-3 py-4'>{index+1}</p>
                <div className='col-span-2 text-sm p-3 py-4'>
                  <div className='relative h-10 w-10 rounded-full overflow-hidden'>
                    <Image  alt="" className='object-fill' src={passport} fill/>
                  </div>
                </div>
                <p className='col-span-4 text-sm p-3 py-4'>{firstname} {lastname}</p>
                <p className='col-span-3 text-sm p-3 py-4'>STAFF/{sid}</p>
                <div className='col-span-2 text-sm p-3 py-4'>
                  <p 
                    className='inline-block bg-green-600 px-2 py-1 rounded-md text-white text-xs font-bold'
                  >
                    <FaCheckDouble />
                  </p>
                </div>
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
      staffs: await read_database("staffs"),
      recommendationsList: await read_database("recommendations") || null,

    }
  }

}