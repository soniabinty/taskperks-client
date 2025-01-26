import React from 'react';
import BestWorker from './BestWorker';
import Testimonial from './Testimonial';
import HeroSection from './HeroSection';
import FeaturedServices from './FeaturedServices';
import WhyChooseUs from './WhuChooseUs';
import HowItWorks from './HowItWorks';


const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
    <BestWorker></BestWorker>
    <Testimonial></Testimonial>
    <FeaturedServices></FeaturedServices>
    <WhyChooseUs></WhyChooseUs>
   <HowItWorks></HowItWorks>
    </div>
  );
};

export default Home;