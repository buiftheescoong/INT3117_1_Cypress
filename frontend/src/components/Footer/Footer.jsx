import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-10">
      <div className="container mx-auto p-10 md:px-10">
        {/* Main Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold mb-3 hover:bg-gray-100 text-[#00008B]">Mahuco Airways</h3>
            <ul>
              <li className="mb-2">
                <a href="#about" className="hover:underline text-[#00008B] text-[#00008B]">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#awards" className="hover:underline text-[#00008B] text-[#00008B]">
                  Awards
                </a>
              </li>
              <li className="mb-2">
                <a href="#careers" className="hover:underline text-[#00008B] text-[#00008B]">
                  Careers
                </a>
              </li>
              <li className="mb-2">
                <a href="#news" className="hover:underline text-[#00008B] text-[#00008B]">
                  Press Releases
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:underline text-[#00008B] text-[#00008B]">
                  Environmental Awareness
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold mb-3 hover:bg-gray-100 text-[#00008B]">Company</h3>
            <ul>
              <li className="mb-2">
                <a href="#airport" className="hover:underline text-[#00008B] text-[#00008B]">
                  International Airports
                </a>
              </li>
              <li className="mb-2">
                <a href="#dutyfree" className="hover:underline text-[#00008B] text-[#00008B]">
                  QA Duty Free
                </a>
              </li>
              <li className="mb-2">
                <a href="#cargo" className="hover:underline text-[#00008B] text-[#00008B]">
                  QA Airways Cargo
                </a>
              </li>
              <li>
                <a href="#more" className="hover:underline text-[#00008B] text-[#00008B]">
                  Learn More...
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold mb-3 hover:bg-gray-100 text-[#00008B]">Business Partners</h3>
            <ul>
              <li className="mb-2">
                <a href="#marketing" className="hover:underline text-[#00008B] text-[#00008B]">
                  Affiliate Marketing
                </a>
              </li>
              <li className="mb-2">
                <a href="#shopping" className="hover:underline text-[#00008B] text-[#00008B]">
                  Online Shopping
                </a>
              </li>
              <li>
                <a href="#partners" className="hover:underline text-[#00008B] text-[#00008B]">
                  Trade Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold mb-3 hover:bg-gray-100 text-[#00008B]">For businesses</h3>
            <ul>
              <li className="mb-2">
                <a href="#companytravel" className="hover:underline text-[#00008B] text-[#00008B]">
                  Company Travel
                </a>
              </li>
              <li className="mb-2">
                <a href="#qbiz" className="hover:underline text-[#00008B] text-[#00008B]">
                  Qbiz: Loyal Company
                </a>
              </li>
              <li className="mb-2">
                <a href="#qmice" className="hover:underline text-[#00008B]">
                  QMICE: Meetings and Conferences
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#00008B] flex flex-col md:flex-row justify-between w-full p-6">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <a href="#" class="text-white hover:underline text-[#00008B]">Terms of Use</a>
          <a href="#" class="text-white hover:underline text-[#00008B]">Conditions of Carriage</a>
          <a href="#" class="text-white hover:underline text-[#00008B]">Cookies</a>
          <a href="#" class="text-white hover:underline text-[#00008B]">Manage My Data</a>
        </div>
        <ul className="flex flex-col md:flex-row space-x-6">
          <li className="text-white">Follow Us</li>
          <li className="space-x-6">
              <a
                href="#facebook"
                className="text-white hover:text-gray-900 text-xl"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#twitter"
                className="text-white hover:text-gray-900 text-xl"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#linkedin"
                className="text-white hover:text-gray-900 text-xl"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="#youtube"
                className="text-white hover:text-gray-900 text-xl"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </li>
        </ul>
      </div>

      {/* Awards Row */}
      <div className="mt-10 text-center">
        <div className="flex justify-center items-center space-x-6 mb-6">
          <div className="flex flex-col items-center">
            <img src="..\\src\\assets\\images\\logo2.svg" alt="Award 1" className="h-12" />
            <p className="mt-2 text-xs text-gray-500">World's Best Airline</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="..\\src\\assets\\images\\logo1.svg" alt="Award 2" className="h-12" />
            <p className="mt-2 text-xs text-gray-500">World's Best Business Class</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="..\\src\\assets\\images\\logo2.svg" alt="Award 3" className="h-12" />
            <p className="mt-2 text-xs text-gray-500">Best Airline in the Middle East</p>
          </div>
        </div>
        {/* Policies */}
        <p className="text-xs text-gray-600">
          Cookie Policy | Legal | Privacy | Accessibility | Optional Services and Fees
        </p>
        <p className="text-xs text-gray-600 mt-2">
          &copy;  QAirline. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
