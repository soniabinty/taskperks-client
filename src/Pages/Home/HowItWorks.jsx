import { FaSearch, FaClipboardCheck, FaRocket } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="text-green-500 text-5xl" />,
      title: "Find a Task",
      description: "Browse through our platform to find tasks that match your skills and interests.",
    },
    {
      icon: <FaClipboardCheck className="text-blue-500 text-5xl" />,
      title: "Submit Your Work",
      description: "Complete the task and submit your work for review by the task owner.",
    },
    {
      icon: <FaRocket className="text-purple-500 text-5xl" />,
      title: "Earn Rewards",
      description: "Get rewarded for your work and build your reputation on the platform.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-lg text-gray-600">
          Follow these simple steps to get started and achieve success on our platform.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white text-center p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 mb-4">
              {step.icon}
            </div>
            <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
