import React from 'react'
import { Eye, EyeOff, Copy, Trash, Pencil, Save, } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
  const notify = () => toast('Wow so easy !');
  const passwordRef = useRef()
  const [eye, seteye] = useState(false)
  const [form, setform] = useState({ url: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])

  const showPassword = () => {
    seteye(!eye)
  }

  const savePassword = () => {
    setpasswordArray([...passwordArray, form])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
    setform({ url: "", username: "", password: "" })
  }

  const deletePassword = (indexToDelete) => {
    let confirms = confirm("Are you sure you want to delete?")
    if(confirms) {
      let newPasswordArray = passwordArray.filter((item,index)=>
        index !== indexToDelete
      )
      setpasswordArray(newPasswordArray)
      localStorage.setItem("passwords", JSON.stringify(newPasswordArray))
    } 
  }

  const editPassword = (indexToEdit) => {
    setform(passwordArray.filter((item,index)=>index===indexToEdit)[0])
    let newPasswordArray = passwordArray.filter((item,index)=>
      index !== indexToEdit
    )
    setpasswordArray(newPasswordArray)
   
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text) => {
    toast('✅ Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />


      
      <main className="flex-1 container mx-auto py-8 px-4 bg-gradient-to-r from-green-0 via-green-100 to-green-0 ">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-1">
            <span className="text-gray-800">&lt;</span>
            <span className="text-gray-800">Pass</span>
            <span className="text-green-500">OP</span>
            <span className="text-gray-800">/&gt;</span>
          </h1>
          <p className="text-gray-600">Your own Password Manager</p>
        </div>

        {/* Input Form */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter website URL"
              className="w-full p-3 border border-gray-300 rounded-full"
              value={form.url}
              onChange={handleChange}
              name='url'
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Enter Username"
              className="flex-1 p-3 border border-gray-300 rounded-full"
              value={form.username}
              onChange={handleChange}
              name='username'
            />
            <div className="flex-1 relative">
              <input
                placeholder="Enter Password"
                className="w-full p-3 border border-gray-300 rounded-full pr-10"
                value={form.password}
                onChange={handleChange}
                name='password'
                ref={passwordRef}
                type={eye ? 'text' : 'password'}
              />
              <button
                className="absolute right-3 top-3"
                onClick={showPassword}

              >
                {eye ? <EyeOff className='cursor-pointer' size={20} /> : <Eye className='cursor-pointer' size={20} />}

              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-green-400 hover:bg-green-500 text-black font-semibold py-2 px-6 rounded-full flex items-center"
              onClick={savePassword}
            >
              <Save className="mr-2 w-5 h-5" />
              Save
            </button>
          </div>
        </div>

        {/* Passwords Table */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Your Passwords</h2>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            {passwordArray.length === 0 && <div>No passwords to show </div>}
            {passwordArray.length !== 0 && <table className="w-full">
              <thead>
                <tr className="bg-green-800 text-white">
                  <th className="py-3 px-4 text-left">Site</th>
                  <th className="py-3 px-4 text-left">Username</th>
                  <th className="py-3 px-4 text-left">Password</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => {
                  return <tr key={index} className="border-t border-gray-200 bg-green-100">
                    <td className="py-3 px-4">
                      <div className="flex items-center ">
                        <a className='underline text-blue-800' target='_blank' href={item.url}> {item.url}</a>
                        <button onClick={() => { copyText(item.url) }} className="ml-2 cursor-pointer">
                          <Copy className='hover:size-4.5' size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {item.username}
                        <button onClick={() => { copyText(item.username) }} className="ml-2 cursor-pointer">
                          <Copy className='hover:size-4.5' size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {item.password}
                        <button onClick={() => { copyText(item.password) }} className="ml-2 cursor-pointer ">
                          <Copy className='hover:size-4.5' size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center space-x-2 ">
                        <button onClick={()=>{editPassword(index)}} className="p-1">
                          <Pencil className='cursor-pointer' size={18} />
                        </button>
                        <button onClick={()=>{deletePassword(index)}} className="p-1">
                          <Trash className='cursor-pointer' size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>

            }
          </div>
        </div>
      </main>

    </>
  )
}

export default Manager
