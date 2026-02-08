import React from "react";
import { BsSuitcaseLg } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Top */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">

          {/* Brand */}
          <div><h2 className="text-xl font-bold text-gray-900 flex items-center">
            <BsSuitcaseLg className="text-blue-600 mr-2" />
            JobPilot <GoDotFill className="text-sm text-blue-500" />
          </h2>

            <p className="text-gray-600 mt-3 max-w-sm">
              AI-powered job tracking app to help you discover jobs, match your
              resume, and track applications in one place.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full md:w-auto">

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Product
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:text-gray-900 cursor-pointer">{<Link to='/'>Jobs</Link>}</li>
                <li className="hover:text-gray-900 cursor-pointer">{<Link to='/application'>Applications</Link>}</li>
                <li className="hover:text-gray-900 cursor-pointer">{<Link to='/add-cv'>Resume Upload</Link>}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Resources
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:text-gray-900 cursor-pointer">How it works</li>
                <li className="hover:text-gray-900 cursor-pointer">AI Matching</li>
                <li className="hover:text-gray-900 cursor-pointer">FAQ</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Contact
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="mailto:rahulkumar8340527941@gmail.com"
                    className="hover:text-gray-900 cursor-pointer"
                  >
                    Email
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.linkedin.com/in/rahul-kumar-3990b618b"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-gray-900 cursor-pointer"
                  >
                    LinkedIn
                  </a>
                </li>

                <li>
                  <a
                    href="https://github.com/ahulkumar1234"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-gray-900 cursor-pointer"
                  >
                    GitHub
                  </a>
                </li>
              </ul>

            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} JobPilot. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Built by <span className="font-semibold">Rahul Kumar</span> with so much ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
