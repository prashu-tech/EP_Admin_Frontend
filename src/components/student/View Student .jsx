'use client';
import React from 'react';
import Head from 'next/head';

const ViewStudent = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to an API)
    console.log('Form submitted!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6">
      <Head>
        <title>Add Student Form</title>
        <meta name="description" content="A form to add a new student" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      

      {/* Form Section */}
      <div className="bg-white p-6  rounded-lg  w-full max-w-lg">
      <h2
  className="text-xl font-semibold text-center py-2 "
  style={{
    background: 'linear-gradient(to right, #FFF9E5, #E5F0FF)',
    width: '200px', // or '50%'
    margin: '0 auto', // Centers the element
  }}
>
  Add Student
</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-black">
              Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-black">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Date of Birth Field */}
          <div>
            <label htmlFor="dob" className="block text-sm font-semibold text-black">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              placeholder="mm/dd/yyyy"
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-black">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your Phone Number"
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Gender Field */}
          <div>
            <label className="block text-sm font-semibold text-black">Gender:</label>
            <div className="mt-1 flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="form-radio h-4 w-4 text-blue-600"
                  required
                />
                <span className="ml-2 text-sm text-black">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-black">Female</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-black">Other</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ backgroundColor: '#007AFF' }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewStudent;