import Head from 'next/head';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import { IoIosPeople } from 'react-icons/io';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Textarea from '../../components/Textarea';

export default function New() {
  
  const [form, setForm] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      localStorage.setItem('staffs', JSON.stringify([...JSON.parse(localStorage.getItem('staffs') || `[]`), form]));
    } catch(e){
      return toast.error('Passport size too large max (512kb)');
    }
    e.target.reset();
    setForm({  });

    toast.success('Staff Added Successfully')
  }

  return (
    <div>
      <Head>
        <title>New Staff - Bibo</title>
        <meta name="description" content="Census Mnagement System" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      


      <main className="fixed top-0 left-0 w-full h-full bg-neutral-100 flex justify-center">
        <Sidebar />

        <div className="w-4/5 overflow-auto">

          <Navbar page="Staffs" />

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
                  options={[
                    {
                      value: 23461,
                      label: 'Chibykes Chiabuotu',
                    },
                    {
                      value: 23462,
                      label: 'Michael Chiabuotu',
                    },
                    {
                      value: 23463,
                      label: 'James Chiabuotu',
                    },
                  ]}
                  required
                />

                <Textarea 
                  name="reason"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  label="Reason for Leave"
                  placeholder="Enter reason for leave"
                  required
                />

                <Input
                  name="duration"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  type="number"
                  label="Duration (Days)"
                  placeholder="How long would the leave take?"
                  required
                />

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
