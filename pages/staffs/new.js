import Head from 'next/head';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { IoIosPeople } from 'react-icons/io';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function New() {
  
  const [form, setForm] = useState({});

  const uploadPassport = () => document.querySelector('[name="passport"]').click();

  const showImage = (e) => {
    var reader = new FileReader();
    reader.onload = (e) => setForm({...form, passport: reader.result});
    reader.readAsDataURL(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      localStorage.setItem('staffs', JSON.stringify([...JSON.parse(localStorage.getItem('staffs') || `[]`), form]));
    } catch(e){
      return toast('❌ Passport size too large max (512kb)');
    }
    e.target.reset();
    setForm({  });

    toast('✅ Staff Added Successfully')
  }

  return (
    <div>
      <Head>
        <title>New Staff - Censia.ng</title>
        <meta name="description" content="Census Mnagement System" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={true}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>


      <main className="fixed top-0 left-0 w-full h-full bg-neutral-100 flex justify-center">
        <Sidebar />

        <div className="w-4/5 overflow-auto">

          <Navbar page="Staffs" />

          <div className='p-12 space-y-3'>


            <form onSubmit={handleSubmit} className="bg-white space-y-12 p-20">
              <div className="flex">
                <p className='flex items-center justify-start gap-2 pb-4 text-2xl font-bold'>
                  <IoIosPeople className="text-black text-4xl" />
                  <span className='text-black text-3xl'>
                    New Staff Registration
                  </span>
                </p>

                <div style={{ backgroundImage: `url(${form.passport})` }} onClick={uploadPassport} className='ml-auto grid place-content-center border border-black border-dashed w-52 h-52 bg-neutral-100 bg-no-repeat bg-contain bg-center'>
                  {!form.passport && <div className="inline-flex justify-center items-center gap-2 p-2 bg-white rounded-md font-bold">
                    <BsFillCloudUploadFill className="" />
                    <span className=''>Passport</span>
                  </div>}
                </div>
                <input name="passport" className="hidden"  type="file" accept="image/*" onChange={showImage} />
              </div>

              <div className="grid grid-cols-3 gap-8">
                <p className='col-span-3 italics'>
                  Inputs with a <span className="text-red-500">*</span> means they are required
                </p>

                <Input
                  name="firstname"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  label="Firstname"
                  placeholder="Enter Firstname"
                  required
                />
                
                <Input
                  name="lastname"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  label="Lastname"
                  placeholder="Enter Lastname"
                  required
                />
                
                <Input
                  name="othernames"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  label="Other names"
                  placeholder="Enter Middle name"
                />
                
                <Input
                  name="email"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  type="email"
                  label="Email"
                  placeholder="Enter Email"
                  required
                />
                
                <Input
                  name="phone"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                  required
                />
                
                <Input
                  name="department"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  label="Department"
                  placeholder="Enter Census Staff Department"
                  required
                />
                
                <Input
                  name="dob"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  type="date"
                  label="Date of Birth"
                  placeholder="Enter Date of Birth"
                  required
                />

                <Input
                  name="state"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  label="State of Origin"
                  placeholder="Enter State of Origin"
                  required
                />
                
                <Input
                  name="lga"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  label="LGA of Origin"
                  placeholder="Enter LGA of Origin"
                  required
                />
                
                <div className='col-span-3'>
                  <Input
                    name="address"
                    value={form[this]}
                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                    label="Residential Address"
                    placeholder="Enter Residential Address"
                    required
                  />
                </div>
                
                <Input
                  name="username"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  label="Username"
                  placeholder="Enter Username"
                  required
                />
                
                <Input
                  name="password"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                  required
                />
                
                <Input
                  name="confirm_password"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
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