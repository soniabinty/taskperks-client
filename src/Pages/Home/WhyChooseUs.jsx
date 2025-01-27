import { FaRocket, FaUsers, FaShieldAlt, FaAward } from "react-icons/fa";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <FaRocket className="text-green-500 text-4xl" />,
      title: "Fast & Reliable",
      description:
        "Experience unmatched speed and reliability with our advanced platform.",
    },
    {
      icon: <FaUsers className="text-green-500 text-4xl" />,
      title: "Community Driven",
      description:
        "Join a vibrant community of professionals and collaborators.",
    },
    {
      icon: <FaShieldAlt className="text-green-500 text-4xl" />,
      title: "Top-Notch Security",
      description:
        "Your data and transactions are safe with our secure systems.",
    },
    {
      icon: <FaAward className="text-green-500 text-4xl" />,
      title: "Award-Winning Service",
      description:
        "Recognized globally for our excellent support and innovation.",
    },
  ];

  return (
    <section className="py-16 px-8 bg-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <p className="text-gray-600">
          Discover why we are the preferred choice for countless users worldwide.
        </p>
      </div>
      <div className="container mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-center mb-4 h-16 w-16 mx-auto rounded-full bg-gray-100">
              {reason.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
            <p className="text-gray-600">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
