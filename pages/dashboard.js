import Head from 'next/head';
import Input from '../components/Input';
import Button from '../components/Button';

import { IoIosPeople } from 'react-icons/io';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Image from 'next/image';
import Link from 'next/link';
import { MdModeEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';
import mode from '../hooks/mode';
import mean from '../hooks/mean';

export default function Dashboard() {

  const [people, setPeople] = useState([]);
  const [staffs, setStaffs] = useState([]);
  useEffect(() => {
    setPeople(JSON.parse(localStorage.getItem('people')) || []);
    setStaffs(JSON.parse(localStorage.getItem('staffs')) || []);
  }, []);

  const getAge = ( dob ) => ((new Date().getTime() - new Date(dob).getTime())/(1000 * 60 * 60 * 24 * 365)).toFixed();
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    datasets: [{
      label: "Population by sexes",
      data: [
        people.reduce((acc, cv) => cv.gender === "Male" ? acc += 1 : acc ,0),
        people.reduce((acc, cv) => cv.gender === "Female" ? acc += 1 : acc ,0),
      ],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 99, 132)',
      ],
      hoverOffset: 4
    }],

    labels: [
        'Male',
        'Female'
    ]
  }

  return (
    <div>
      <Head>
        <title>Dashboard - Censia.ng</title>
        <meta name="description" content="Census Mnagement System" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      


      <main className="fixed top-0 left-0 w-full h-full bg-neutral-100 flex justify-center">
        <Sidebar />

        <div className="w-4/5 space-y-8 overflow-auto">

          <Navbar page="Dashboard" />

          <div className="py-8 px-12 space-y-8">
            <div className='grid grid-cols-3 gap-4'>

              <div className='bg-green-400 from-green-300 to-sky-500 text-white p-6 space-y-3'>
                <p className=''>Total People Recoreded</p>
                <p className='font-bold text-4xl'>{people.length.toLocaleString()}</p>
              </div>

              <div className='bg-sky-300 text-white p-6 space-y-3'>
                <p className=''>Total Staffs in Database</p>
                <p className='font-bold text-4xl'>{staffs.length.toLocaleString()}</p>
              </div>

              <div className='bg-amber-300 text-white p-6 space-y-3'>
                <p className=''>Total Departments in Database</p>
                <p className='font-bold text-4xl'>5</p>
              </div>

            </div>

            <div className='grid grid-cols-3 gap-4'>
              <div className='p-8 bg-white'>
                <Pie
                  data={data}
                />
              </div>

              <div className='col-span-2 grid grid-cols-3 gap-4'>
                <div className='p-4 space-y-2 bg-white'>
                  <p className='font-bold'>Most Populus State</p>
                  <p className='text-3xl'>{mode(people.map(p => p.state)) || "-"}</p>
                </div>
                <div className='p-4 space-y-2 bg-white'>
                  <p className='font-bold'>Youngest Age Recorded</p>
                  <p className='text-3xl'>{people.map(p => getAge(p.dob)).sort()[0] || "0"} yrs</p>
                </div>
                <div className='p-4 space-y-2 bg-white'>
                  <p className='font-bold'>Oldest Age Recorded</p>
                  <p className='text-3xl'>{people.map(p => getAge(p.dob)).sort().reverse()[0] || "0"} yrs</p>
                </div>
                <div className='p-4 space-y-2 bg-white'>
                  <p className='font-bold'>Average Age</p>
                  <p className='text-3xl'>{mean(people.map(p => getAge(p.dob)).sort()).toFixed(1) || "0"} yrs</p>
                </div>
                <div className='p-4 space-y-2 bg-white'>
                  <p className='font-bold'>Shortest Height Recorded</p>
                  <p className='text-3xl'>{people.map(p => p.height).sort()[0] || "0"} cm</p>
                </div>
                <div className='p-4 space-y-2 bg-white'>
                  <p className='font-bold'>Tallest Height Recorded</p>
                  <p className='text-3xl'>{people.map(p => p.height).sort().reverse()[0] || "0"} cm</p>
                </div>
                <div className='p-4 space-y-2 bg-white'>
                  <p className='font-bold'>Average Height</p>
                  <p className='text-3xl'>{mean(people.map(p => p.height).sort()).toFixed(1) || "0"} cm</p>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-7 p-8 space-y-8 bg-white'>
                <p className='font-bold'>Latest Recoreded Persons</p>

                <div className='grid grid-cols-12 bg-app-main text-white'>
                  <p className='col-span-2 text-sm p-3 py-4 font-bold'></p>
                  <p className='col-span-4 text-sm p-3 py-4 font-bold'>Name</p>
                  <p className='col-span-3 text-sm p-3 py-4 font-bold'>State of Origin</p>
                  <p className='col-span-3 text-sm p-3 py-4 font-bold'>Phone</p>
                </div>

                {people?.slice(0,5)?.map(({ passport, firstname, lastname, state, phone }, index) => (
                  <div key={index} className='grid grid-cols-12 items-center bg-white text-black'>
                    <p className='col-span-2 text-sm p-3 py-4'>
                      <div className='relative h-10 w-10 rounded-full overflow-hidden'>
                        <Image className='object-fill' src={passport} fill/>
                      </div>
                    </p>
                    <p className='col-span-4 text-sm p-3 py-4'>{firstname} {lastname}</p>
                    <p className='col-span-3 text-sm p-3 py-4'>{state}</p>
                    <p className='col-span-3 text-sm p-3 py-4'>{phone}</p>
                  </div>
                ))}

                <div className='flex justify-center'>
                  <Link href="/people/" className='px-3 py-1 bg-app-main font-bold text-white rounded-sm'>See full list</Link>
                </div>
              </div>
              <div className='col-span-5 p-8 space-y-8 bg-white'>
                <p className='font-bold'>Latest Recoreded Staffs</p>

                <div className='grid grid-cols-12 bg-app-main text-white'>
                  <p className='col-span-2 text-sm p-3 py-4 font-bold'></p>
                  <p className='col-span-6 text-sm p-3 py-4 font-bold'>Name</p>
                  <p className='col-span-4 text-sm p-3 py-4 font-bold'>Username</p>
                </div>

                {staffs?.slice(0,5)?.map(({ passport, firstname, lastname, username }, index) => (
                  <div key={index} className='grid grid-cols-12 items-center bg-white text-black'>
                    <p className='col-span-2 text-sm p-3 py-4'>
                      <div className='relative h-10 w-10 rounded-full overflow-hidden'>
                        <Image className='object-fill' src={passport} fill/>
                      </div>
                    </p>
                    <p className='col-span-6 text-sm p-3 py-4'>{firstname} {lastname}</p>
                    <p className='col-span-4 text-sm p-3 py-4'>{username}</p>
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
