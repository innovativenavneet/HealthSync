import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 ">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          {/* Profile Picture */}
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300 mr-6"
          />
          {/* Name and Specialization */}
          <div>
            <h2 className="text-3xl font-semibold text-blue-600">Dr. John Doe</h2>
            <p className="text-gray-700 text-lg">Cardiologist</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
          <p className="text-gray-600"><strong>Email:</strong> doctor@example.com</p>
          <p className="text-gray-600"><strong>Phone:</strong> +123456789</p>
          <p className="text-gray-600"><strong>Address:</strong> 1234 Medical St, City, Country</p>
        </div>

        {/* License Information */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">License Information</h3>
          <p className="text-gray-600"><strong>License Number:</strong> MED123456</p>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Experience</h3>
          <p className="text-gray-600">10 years</p>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Bio</h3>
          <p className="text-gray-600">Dr. John Doe is an experienced cardiologist specializing in heart diseases.</p>
        </div>

        {/* Availability */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Availability</h3>
          <ul className="text-gray-600">
            <li><strong>Monday:</strong> 9am - 5pm</li>
            <li><strong>Tuesday:</strong> 9am - 5pm</li>
            <li><strong>Wednesday:</strong> 9am - 5pm</li>
            <li><strong>Thursday:</strong> 9am - 5pm</li>
            <li><strong>Friday:</strong> 9am - 5pm</li>
            <li><strong>Saturday:</strong> 10am - 2pm</li>
            <li><strong>Sunday:</strong> Closed</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Social Links</h3>
          <ul className="text-gray-600">
            <li><a href="https://www.linkedin.com/in/dr-johndoe" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn</a></li>
            <li><a href="https://drjohndoe.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Website</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
