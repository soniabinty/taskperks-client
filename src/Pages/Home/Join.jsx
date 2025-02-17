import React from 'react';
import img from '../../assets/business-woman-working-laptop.jpg'

import { LuUserRound } from 'react-icons/lu';
import { FaPlusCircle } from 'react-icons/fa';
import { MdLaptopChromebook } from 'react-icons/md';
const Join = () => {
  return (
    <div className='flex '>

      <div className='flex-1 border-b border-[#014c57]'>

      <div className='  '>

<div className='p-8 text-center space-y-4 w-11/12 mx-auto pt-[90px]'>

<MdLaptopChromebook className='text-4xl mx-auto mt-12 text-[#014c57]' />
<h3 className='text-3xl font-bold'>I'M A BUYER</h3>
<h5 className='text-[#014c57]'>__  ________</h5>
<p>Post tasks, review submissions, and manage workers efficiently with a seamless experience.</p>

<button className='btn  hover:bg-[#014c57] hover:text-white bg-[#014c57] text-white flex  justify-center mx-auto'> <FaPlusCircle /> REGISTER AS BUYER</button>


</div>

</div>

      </div>

      <div
      className=' flex-1 h-[600px] relative' style={{
            backgroundImage: `url('${img}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
      
          }}
       >

        <div className='bg-[#014c57] bg-opacity-80 absolute inset-0 mx-auto text-white  '>

          <div className='p-8 text-center space-y-4 w-11/12 mx-auto pt-[90px]'>

          <LuUserRound className='text-4xl mx-auto mt-12' />
<h3 className='text-3xl font-bold'>I'M A WORKER</h3>
<h5>__  ________</h5>
<p>Earn rewards by completing tasks, submitting them for approval, and tracking your progress.</p>

<button className='bg-white text-[#014c57] btn flex mx-auto hover:bg-[#014c57] hover:text-white'>  <FaPlusCircle /> REGISTER AS WORKER</button>


          </div>

        </div>



      </div>

      


      
    </div>
  );
};

export default Join;