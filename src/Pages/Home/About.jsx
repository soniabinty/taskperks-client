export default function About() {
  return (
    <section className="bg-gray-100 py-12 px-6 md:p-16 lg:px-24 text-center">
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
        <p className="text-gray-600 text-lg">
          At <span className="font-semibold text-blue-600">TASKPERKS</span>, we believe in the power of productivity and rewards.
          Our platform streamlines task management while offering exciting opportunities for 
          workers, buyers, and administrators.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h3 className="text-xl font-semibold text-blue-500">For Workers</h3>
            <p className="text-gray-600 mt-2">Complete tasks, submit proof, and earn rewards effortlessly.</p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h3 className="text-xl font-semibold text-green-500">For Buyers</h3>
            <p className="text-gray-600 mt-2">Post tasks and get results from verified users efficiently.</p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h3 className="text-xl font-semibold text-purple-500">For Admins</h3>
            <p className="text-gray-600 mt-2">Manage task submissions and ensure a smooth, fair process.</p>
          </div>
        </div>

        <p className="mt-6 text-lg text-gray-700">
          Join <span className="font-semibold text-blue-600">TASKPERKS</span> today and start your rewarding journey! 🚀
        </p>
      </div>
    </section>
  );
}
