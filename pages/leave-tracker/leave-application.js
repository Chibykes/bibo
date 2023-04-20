import Head from 'next/head';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';

import { useState } from 'react';
import { IoIosPeople } from 'react-icons/io';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Textarea from '../../components/Textarea';
import { add_doc, read_database } from '../../hooks/firebase';

export default function New({ staffs }) {
  
  const [form, setForm] = useState({});

  const handleSubmit = async(e) => {
    e.preventDefault();
    await add_doc("leaves", { ...form, staff: staffs.find(({sid}) => sid === Number(form.staff)) })
    e.target.reset();
    setForm({  });
  }

  return (
    <div>
      <Head>
        <title>Leave Tracker - Bibo</title>
        <meta name="description" content="Census Mnagement System" />
        <link rel="icon" href="/favicon.png" />
      </Head>


      <main className="fixed top-0 left-0 w-full h-full bg-neutral-100 flex justify-center">
        <Sidebar />

        <div className="w-4/5 overflow-auto">

          <Navbar page="Leave Tracker" />

          <div className='p-12 space-y-3'>


            <form onSubmit={handleSubmit} className="bg-white space-y-12 p-20">
              <div className="">
                <p className='flex items-center justify-center gap-2 pb-4 text-2xl font-bold'>
                  <IoIosPeople className="text-black text-4xl" />
                  <span className='text-black text-3xl text-center'>
                    Leave Application
                  </span>
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-8">
                <p className='col-span-3 italics'>
                  Inputs with a <span className="text-red-500">*</span> means they are required
                </p>

                <Select 
                  name="staff"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  label="Staff"
                  placeholder="Enter Firstname"
                  options={staffs.map(({sid, firstname, lastname}) => ({
                    value: sid,
                    label: firstname+" "+lastname
                  }))}
                  required
                />

                <Textarea 
                  name="reason"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  label="Reason for Leave"
                  placeholder="Enter reason for leave"
                  required
                />

                {/* <Input
                  name=""
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  type="number"
                  label="Duration (Days)"
                  placeholder="How long would the leave take?"
                  required
                /> */}

                <div className='flex justify-center gap-4'>
                  <Input
                    name="from"
                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                    type="date"
                    label="Starting Date"
                    placeholder="From"
                    required
                  />

                  <Input
                    name="to"
                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                    type="date"
                    label="Ending Date"
                    placeholder="To"
                    required
                  />
                </div>

                <div className='col-span-3'>
                  <div className='w-1/2 mx-auto'>
                    <Button
                      className="w-1/3 mx-auto"
                      value="Submit"
                    />
                  </div>
                </div>
                


              </div>
            </form>


          </div>

        </div>
      </main>


    </div>
  )
}


export async function getServerSideProps(){
  return{
    props: {
      staffs: await read_database("staffs")
    }
  }
}