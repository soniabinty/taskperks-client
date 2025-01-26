
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const testimonials = [
  {
    name: "John Doe",
    photo: "https://i.ibb.co.com/4PgfG7k/1-intro-photo-final.jpg",
    quote: "This platform has revolutionized the way I work. Highly recommend it!",
  },
  {
    name: "Jane Smith",
    photo: "https://i.ibb.co.com/fYThFST/michael-dam-m-EZ3-Po-FGs-k-unsplash.jpg",
    quote: "An amazing experience! The tools and support are top-notch.",
  },
  {
    name: "Ali Khan",
    photo: "https://i.ibb.co.com/mqBfvJC/profile-picture-smiling-successful-young-260nw-2040223583.webp",
    quote: "I’ve never been more satisfied with a service. Great job, team!",
  },
  {
    name: "Emily Davis",
    photo: "https://i.ibb.co.com/BCKtWSR/headshot-portrait-smiling-millennial-male-260nw-1667439913.webp",
    quote: "The platform is intuitive, and the support team is fantastic.",
  },
  {
    name: "Michael Brown",
    photo: "https://i.ibb.co.com/xFZprq6/ben-den-engelsen-YUu9-UAc-OKZ4-unsplash.jpg",
    quote: "Exceptional service! Highly reliable and user-friendly.",
  },
  {
    name: "Sophia Wilson",
    photo: "https://i.ibb.co.com/0hcx0YV/toa-heftiba-O3ymv-T7-Wf9-U-unsplash.jpg",
    quote: "The features and design exceeded my expectations. Love it!",
  },
];

const Testimonial = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
        <p className="text-gray-600">Hear from our happy customers about their experiences.</p>
      </div>
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="py-6"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-green-500"
                />
                <h3 className="text-lg font-semibold mb-2">{testimonial.name}</h3>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
