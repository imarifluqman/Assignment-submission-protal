import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Link, useParams } from 'react-router-dom'

const Table = ({data}) => {
  const {instructorId} = useParams();
  let {assignments,handleGetAssignments} = data
  
  

 
  

  return (
    <div>
      {/* <!-- component --> */}
    <div class="flex  items-center justify-center">
      <div class="overflow-x-visible">
        <h1 className='text-center text-3xl text-green-800  font-bold font-serif h-10 '  >All Assignments</h1>
        <table class="min-w-full bg-white shadow-xl rounded-xl">
          <thead>
            <tr class="bg-blue-gray-100 text-gray-700">
              <th class="py-3 px-4 text-left">Assignment Title</th>
              <th class="py-3 px-4 text-left">Due Date</th>
              <th class="py-3 px-4 text-left">Course</th>
              {/* <th class="py-3 px-4 text-left">Created At</th> */}
              <th class="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody class="text-blue-gray-900 text-center">
            {assignments?assignments.map((e,i)=>{
              return(<tr class="border-b border-blue-gray-200">
                <td class="py-3 px-4">{e.title}</td>
                <td class="py-3 px-4">{e.dueDate}</td>
                <td class="py-3 px-4">{e.course}</td>
                {/* <td class="py-3 px-4">{format(new Date(e.createdAt), 'dd-MM-yyyy')}</td> */}
                <td class="py-3 px-4">
                  <Link to={`/instructor/${instructorId}/assignments/${e._id}`}>
                <button type="button"  class="inline-flex items-center gap-x-2 rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold text-green-400 shadow-sm hover:bg-green-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
    <span class="">
     
    <i class="fa-regular fa-eye"></i>
    </span>
    <span class="">View</span>
    </button>
                  </Link>
  {/* <button type="button" class="inline-flex items-center gap-x-2 rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold text-gray-400 shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
    <span class="">
     
    <i class="fa-regular fa-pen-to-square"></i>
    </span>
    <span class="">Edit</span>
    </button> */}
    {/* <button onClick={()=>{handleDelete(e._id)}}   type="button" class="inline-flex items-center gap-x-2 rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold text-red-400 shadow-sm hover:bg-red-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
    <span class="">
     
    <i class="fa-solid fa-trash"></i>  </span>
    <span class="">Delete</span>
    </button> */}
                </td>
              </tr>)

            })
           :
          //  <!-- component -->
          <tr class="border-b text-center flex justify-center items-center border-blue-gray-200">
            <td></td>
            <td class="py-3 px-4"></td>
           <div class="flex  text-center items-center justify-center w-full h-full text-gray-900 dark:text-gray-100 dark:bg-gray-950">
             <div>
               <h1 class="text-xl text-center md:text-5xl font-bold flex items-center">L<svg stroke="currentColor" fill="currentColor" stroke-width="0"
                   viewBox="0 0 24 24" class="animate-spin" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                   <path
                     d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z">
                   </path>
                 </svg> ading . . .</h1>
             </div>
           </div>
           </tr>}
          </tbody>
        </table>
      </div>
    </div></div>
  )
}

export default Table