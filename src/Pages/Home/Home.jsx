import React from 'react';
import BestWorker from './BestWorker';
import Testimonial from './Testimonial';
import HeroSection from './HeroSection';
import FeaturedServices from './FeaturedServices';
import WhyChooseUs from './WhyChooseUs';
import HowItWorks from './HowItWorks';
import BestDeals from './BestDeals';
import Join from './Join';
import NewRelease from '../DashBoard,jsx/NewRelease';


const Home = () => {
  return (
    <div>
     
      <BestDeals></BestDeals>
      <NewRelease></NewRelease>
      <Join></Join>
    <BestWorker></BestWorker>
    <Testimonial></Testimonial>
    {/* <FeaturedServices></FeaturedServices> */}
    {/* <WhyChooseUs></WhyChooseUs> */}
   {/* <HowItWorks></HowItWorks> */}
    </div>
  );
};

export default Home;