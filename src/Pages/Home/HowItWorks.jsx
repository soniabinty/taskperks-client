import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      title: "Learn Easily",
      description: "Learn how to do tasks with our quick online courses or free hands-on training.",
      image: "https://i.ibb.co.com/SwSPsgd8/woman-working-from-home.jpg", 
    },
    {
      title: "Complete Tasks",
      description: "Work on tasks from projects you’ve unlocked.",
      image: "https://i.ibb.co.com/KxT5B2Zv/woman-working-laptop-office.jpg", 
    },
    {
      title: "Get Paid Weekly",
      description: "Get paid fast via PayPal or AirTM based on your quality & number of tasks completed.",
      image: "https://i.ibb.co.com/d4sQmSCy/portrait-businesswoman-sitting-office-with-money-working-making-profit-income-posing-happy.jpg", 
    },
  ];

  return (
    <section className="text-center max-sm:mt-[150px] lg:m-[80px] md:m-6 md:px-6 py-12 bg-gray-100">
      <h2 className="text-[#014c57] font-semibold tracking-wide">HOW IT WORKS</h2>
      <h1 className="text-[#014c57] text-3xl sm:text-4xl font-bold mt-2">
        Do tasks, get paid. It's that simple.
      </h1>
      <p className="text-gray-600 mt-3 max-w-xl mx-auto">
        From labeling images to transcribing audio, earn money completing simple tasks.
      </p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <h3 className="text-xl text-[#014c57] font-bold mt-4">{step.title}</h3>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
