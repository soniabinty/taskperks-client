import React from 'react';
import BestWorker from './BestWorker';
import Testimonial from './Testimonial';
import HeroSection from './HeroSection';
import FeaturedServices from './FeaturedServices';
import WhyChooseUs from './WhuChooseUs';


const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
    <BestWorker></BestWorker>
    <Testimonial></Testimonial>
    <FeaturedServices></FeaturedServices>
    <WhyChooseUs></WhyChooseUs>
   
    </div>
  );
};

export default Home;