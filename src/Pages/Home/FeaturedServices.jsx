import { FaHandshake, FaLock, FaHeadset } from "react-icons/fa";

const FeaturedServices = () => {
  const services = [
    {
      icon: <FaHandshake className="text-green-500 text-4xl" />,
      title: "Task Matching System",
      description:
        "Effortlessly connect with the right workers or buyers tailored to your needs.",
    },
    {
      icon: <FaLock className="text-green-500 text-4xl" />,
      title: "Secure Payments",
      description:
        "Your transactions are protected with top-notch security protocols.",
    },
    {
      icon: <FaHeadset className="text-green-500 text-4xl" />,
      title: "24/7 Support",
      description:
        "Our dedicated support team is available around the clock to assist you.",
    },
  ];

  return (
    <section className="py-16 px-8 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Featured Services</h2>
        <p className="text-gray-600">
          Discover the exclusive features that make our platform stand out.
        </p>
      </div>
      <div className="container mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-center mb-4 h-16 w-16 mx-auto rounded-full bg-gray-100">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedServices;
