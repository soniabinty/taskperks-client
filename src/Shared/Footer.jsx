import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-8">
      <div className="container mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">TaskPerks</h2>
          <p className="text-sm">
          Innovate, Create, and Lead the Way.
Empowering you to transform your vision into reality with unmatched opportunities.
          </p>
        </div>
       
        {/* Column 2 - Follow Us */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
          <ul className="space-y-2">
            <li>
              <a href="https://facebook.com" className="hover:text-blue-500" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" className="hover:text-blue-400" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" className="hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://instagram.com" className="hover:text-pink-500" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">About Us</h2>
          <p className="text-sm">
            We are a dedicated team committed to providing the best services for our users.
          </p>
        </div>


        {/* Column 3 - Subscribe
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Subscribe</h2>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg w-full">
              Subscribe
            </button>
          </form>
        </div> */}
      </div>

      <div className="border-t border-gray-700 mt-8 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TaskPerks. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
