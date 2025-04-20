import video from './../../assets/3202043-hd_1920_1080_25fps.mp4';

const HeroSection = () => {
  const slides = [
    {
      title: "Design Your Success Story",
      heading: "Innovate, Create, and Lead the Way.",
      description: "Empowering you to transform your vision into reality with unmatched opportunities.",
    },
    {
      heading: "Achieve Your Goals",
      title: "Join a Community of Innovators",
      description: "Collaborate, share, and achieve success with like-minded individuals.",
    },
    {
      heading: "Step Into the Future",
      title: "Transform Your Dreams into Reality",
      description: "Explore endless possibilities and take bold steps toward your future.",
    },
  ];

  return (
    <section className="relative pt-32 px-6 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex lg:mt-16 items-center justify-center h-full text-center">
        <div className="text-white mt-10  mx-auto space-y-6">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-opacity duration-1000 ${
                index === 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-lg lg:text-2xl font-light">{slide.title}</p>
              <h1 className="text-4xl lg:text-6xl font-bold">{slide.heading}</h1>
              <p className="mt-4 text-sm lg:text-lg font-medium">
                {slide.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
