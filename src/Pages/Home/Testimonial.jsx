
import { Swiper, SwiperSlide } from "swiper/react";
import img from '../../assets/business-meeting-office.jpg'
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const testimonials = [

    {
      name: "John Doe",
      photo: "https://i.ibb.co.com/4PgfG7k/1-intro-photo-final.jpg",
      quote: "This platform has revolutionized the way I work. Highly recommend it! The tools and features make task management seamless and efficient.",
      post: "Youtuber"
    },
    {
      name: "Jane Smith",
      photo: "https://i.ibb.co.com/fYThFST/michael-dam-m-EZ3-Po-FGs-k-unsplash.jpg",
      quote: "An amazing experience! The tools and support are top-notch. I’ve never felt more confident in handling my digital workflow.",
      post: "Data Editor"
    },
    {
      name: "Ali Khan",
      photo: "https://i.ibb.co.com/mqBfvJC/profile-picture-smiling-successful-young-260nw-2040223583.webp",
      quote: "I’ve never been more satisfied with a service. Great job, team! The efficiency and ease of use make this a must-have for creators.",
      post: "Thumbnail Maker"
    },
    {
      name: "Emily Davis",
      photo: "https://i.ibb.co.com/BCKtWSR/headshot-portrait-smiling-millennial-male-260nw-1667439913.webp",
      quote: "The platform is intuitive, and the support team is fantastic. I appreciate the constant improvements that make work smoother.",
      post: "Digital Content Writer"
    },
    {
      name: "Michael Brown",
      photo: "https://i.ibb.co.com/xFZprq6/ben-den-engelsen-YUu9-UAc-OKZ4-unsplash.jpg",
      quote: "Exceptional service! Highly reliable and user-friendly. The seamless integration of tools has improved my productivity tenfold.",
      post: "Youtuber"
    },
    {
      name: "Sophia Wilson",
      photo: "https://i.ibb.co.com/0hcx0YV/toa-heftiba-O3ymv-T7-Wf9-U-unsplash.jpg",
      quote: "The features and design exceeded my expectations. Love it! Every aspect of this platform is built with the user in mind.",
      post: "Thumbnail Maker"
    }

  
];

const Testimonial = () => {
  return (
    <div    className='  h-[500px] relative' style={{
      backgroundImage: `url('${img}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",

    }}>

      <div className='bg-[#014c57] bg-opacity-80 absolute inset-0 mx-auto text-white '>
 <div className="text-center my-12 ">
        <h2 className="text-3xl font-bold my-4">What Our Users Say</h2>
        <p className="">__  _________</p>
      </div>
      <div className="container mx-auto px-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
         
        >
        {testimonials.map((testimonial, index) => (
  <SwiperSlide key={index} className="flex flex-col justify-center  items-center mt-[60px]">
    <div className="bg-white w-11/12 shadow-lg mx-auto p-10 text-center relative overflow-visible ">
      {/* Profile Image */}
      <img
        src={testimonial.photo}
        alt={testimonial.name}
        className="w-24 h-24 rounded-full border-4 border-white shadow-md absolute left-1/2 transform -translate-x-1/2 -top-12"
      />
      {/* Card Content */}
      <div className="pt-5 "> 
         <p className="text-black italic text-xl mt-2">"{testimonial.quote}"</p>
     <div className="flex justify-center gap-2 items-center">
         <h3 className="text-black text-lg font-semibold mb-2">---{testimonial.name}</h3>
      <p className="text-[#014c57] font-medium text-sm">({testimonial.post})</p>
     </div>
      
      <div>
       
      </div>
       
      </div>
    </div>
  </SwiperSlide>
))}

        </Swiper>
      </div>

      </div>
     
    </div>
  );
};

export default Testimonial;
