import React from 'react';
import BestWorker from './BestWorker';
import Testimonial from './Testimonial';
import HeroSection from './HeroSection';

import HowItWorks from './HowItWorks';
import BestDeals from './BestDeals';
import Join from './Join';
import NewRelease from '../DashBoard,jsx/NewRelease';
import Faq from './Faq';



const Home = () => {
  return (
    <div>
     <HeroSection></HeroSection>
     <NewRelease></NewRelease>
     <Join></Join>
     <BestWorker></BestWorker>
     <Testimonial></Testimonial>
    
     
      <HowItWorks></HowItWorks>
     
      <Faq></Faq>
      <BestDeals></BestDeals>

   
  
    
 
    </div>
  );
};

export default Home;