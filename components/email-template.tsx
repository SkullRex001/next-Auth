import * as React from 'react';

interface EmailTemplateProps {
  token: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  token,
}) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800">Verify Your Email</h1>
        <p className="mt-4 text-gray-600">
          Hi there,
        </p>
        <p className="mt-2 text-gray-600">
          Please click the button below to verify your email address:
        </p>
        <a href={confirmLink} className="mt-6 block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
          Verify Email
        </a>
        <p className="mt-4 text-gray-600">
          If you did not request this verification, please ignore this email.
        </p>
        <p className="mt-4 text-gray-600">
          Regards,
        </p>
        <p className="text-gray-600 font-semibold">The YourWebsite Team</p>
      </div>
    </div>
  );
};
