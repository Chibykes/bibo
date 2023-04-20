import Head from 'next/head';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import mean from '../hooks/mean';
import mode from '../hooks/mode';
import { get_single_doc, read_database } from '../hooks/firebase';
import checkStatus from '../hooks/checkStatus';


export default function Dashboard({ staffs, checkins, leaves }) {

  const getAge = ( dob ) => ((new Date().getTime() - new Date(dob).getTime())/(1000 * 60 * 60 * 24 * 365)).toFixed();

  return (
    <div>
      <Head>
        <title>Dashboard - Bibo</title>
        <meta name="description" content="Census Mnagement System" />
        <link rel="icon" href="/favicon.png" />
      </Head>
     


      <main className="fixed top-0 left-0 w-full h-full bg-neutral-100 flex justify-center">
        <Sidebar />

        <div className="w-4/5 space-y-8 overflow-auto">

          <Navbar page="Dashboard" />

          <div className="py-8 px-12 space-y-8">
            <div className='grid grid-cols-3 gap-4'>

              <div className='bg-sky-300 text-white p-6 space-y-3'>
                <p className=''>Total Staffs in Database</p>
                <p className='font-bold text-4xl'>{staffs?.length?.toLocaleString() || 0}</p>
              </div>

              <div className='bg-green-400 from-green-300 to-sky-500 text-white p-6 space-y-3'>
                <p className=''>Staff Checked In Today {new Date().toLocaleDateString()}</p>
                <p className='font-bold text-4xl'>{checkins?.checkIns?.length || 0}</p>
              </div>

              <div className='bg-red-400 text-white p-6 space-y-3'>
                <p className=''>Staffs on Leave</p>
                <p className='font-bold text-4xl'>{leaves?.length || 0}</p>
              </div>

            </div>


            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-7 p-8 space-y-8 bg-white'>
                <p className='font-bold'>Latest Leave Request</p>

                <div className='grid grid-cols-12 bg-app-main text-white'>
                  <p className='col-span-2 text-sm p-3 py-4 font-bold'></p>
                  <p className='col-span-4 text-sm p-3 py-4 font-bold'>Name</p>
                  <p className='col-span-3 text-sm p-3 py-4 font-bold'>ID</p>
                  <p className='col-span-3 text-sm p-3 py-4 font-bold'>Status</p>
                </div>

                {leaves?.slice(0,5)?.map(({ staff: { sid, passport, firstname, lastname }, from, to }, index) => (
                  <div key={index} className='grid grid-cols-12 items-center bg-white text-black'>
                    <div className='col-span-2 text-sm p-3 py-4'>
                      <div className='relative h-10 w-10 rounded-full overflow-hidden'>
                        <Image className='object-fill' src={passport} fill/>
                      </div>
                    </div>
                    <p className='col-span-4 text-sm p-3 py-4'>{firstname} {lastname}</p>
                    <p className='col-span-3 text-sm p-3 py-4'>STAFF/{sid}</p>
                    <div className='col-span-3 text-sm p-3 py-4 flex justify-start'>
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

                <div className='flex justify-center'>
                  <Link href="/leave-tracker/" className='px-3 py-1 bg-app-main font-bold text-white rounded-sm'>See full list</Link>
                </div>
              </div>


              <div className='col-span-5 p-8 space-y-8 bg-white'>
                <p className='font-bold'>Latest Recoreded Staffs</p>

                <div className='grid grid-cols-12 bg-app-main text-white'>
                  <p className='col-span-2 text-sm p-3 py-4 font-bold'></p>
                  <p className='col-span-6 text-sm p-3 py-4 font-bold'>Name</p>
                  <p className='col-span-4 text-sm p-3 py-4 font-bold'>ID</p>
                </div>

                {staffs?.slice(0,5)?.map(({ passport, firstname, lastname, sid }, index) => (
                  <div key={index} className='grid grid-cols-12 items-center bg-white text-black'>
                    <div className='col-span-2 text-sm p-3 py-4'>
                      <div className='relative h-10 w-10 rounded-full overflow-hidden'>
                        <Image className='object-fill' src={passport} fill/>
                      </div>
                    </div>
                    <p className='col-span-6 text-sm p-3 py-4'>{firstname} {lastname}</p>
                    <p className='col-span-4 text-sm p-3 py-4'>STAFF/{sid}</p>
                  </div>
                ))}

                <div className='flex justify-center'>
                  <Link href="/staffs/" className='px-3 py-1 bg-app-main font-bold text-white rounded-sm'>See full list</Link>
                </div>
              </div>


            </div>
          </div>

        </div>
      </main>


    </div>
  )
}



export async function getServerSideProps(){

  return {
    props: {
      staffs: await read_database("staffs"),
      leaves: await read_database("leaves"),
      checkins: await get_single_doc("check-ins", (new Date().toLocaleDateString().replace(/\//ig,"-") || null))
    }
  }

}