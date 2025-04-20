import { IoCheckmarkDoneSharp, IoShieldCheckmark } from 'react-icons/io5';
import img from '../../../src/assets/two-young-friends-using-laptop-outdoors.jpg'
import { PiCoinsLight } from 'react-icons/pi';
import { IoMdNotifications } from 'react-icons/io';
import { FaMoneyCheck } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';

const BestDeals = () => {


  return (
    <div
    className='h-[700px] relative' style={{
      backgroundImage: `url('${img}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",

    }}>

      <div className='bg-[#014c57] bg-opacity-80 absolute inset-0 mx-auto md:backdrop:px-12 pt-4 text-white ' >


        <div className='my-12 text-center'>
        <h2 className='text-3xl font-semibold  text-center'>Offering the Best Deals</h2>
        <h5>__  ___________</h5>
        </div>

        <div className='grid mt-5 grid-cols-1 md:grid-cols-3 gap-8 lg:mx-12 '>

          <div className='p-8 space-y-3  hover:bg-white hover:text-[#014c57] border-b'>
          <IoShieldCheckmark className='text-3xl' />
          <h4 className='text-2xl'> Submit Tasks</h4>
          <p>Easily submit tasks and track your progress in real time.</p>

          </div>

          <div className='p-8 space-y-3   hover:bg-white hover:text-[#014c57] border-b'>
          <IoCheckmarkDoneSharp className='text-3xl' />
          <h4 className='text-2xl'> Task Approval</h4>
          <p>Get your tasks reviewed and approved quickly by administrators.</p>

          </div>



          <div className='p-8 space-y-3 hidden md:flex flex-col   hover:bg-white hover:text-[#014c57] border-b'>
          <PiCoinsLight className='text-3xl' />
          <h4 className='text-2xl'> Earn Rewards</h4>
          <p>Complete tasks and earn coins that can be redeemed for rewards.</p>

          </div>



          <div className='p-8 space-y-3 hidden md:flex flex-col   hover:bg-white hover:text-[#014c57] border-b'>
          <IoMdNotifications  className='text-3xl' />
          <h4 className='text-2xl'> Task Notifications</h4>
          <p>Receive instant updates about your task status and approvals.</p>

          </div>


          <div className='p-8 space-y-3 hidden md:flex flex-col   hover:bg-white hover:text-[#014c57] border-b'>
          <FaMoneyCheck  className='text-3xl' />
          <h4 className='text-2xl'> Secure Payments</h4>
          <p>Withdraw your earned rewards with a safe and fast transaction process.</p>

          </div>


          <div className='p-8 hidden md:flex flex-col space-y-3  hover:bg-white hover:text-[#014c57] border-b'>
          <BiSupport  className='text-3xl' />
          <h4 className='text-2xl'>24/7 Support</h4>
          <p>Get help anytime with our dedicated customer support team.</p>

          </div>

        


        </div>

      </div>
      oulkj
    </div>
  );
};

export default BestDeals;