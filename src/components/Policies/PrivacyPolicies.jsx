import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="bg-gray-50 min-h-screen py-10 px-5 sm:px-10">
        <Navbar />
        <div className="mt-12 pb-10">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Privacy Policy
          </h1>

          <div className="space-y-12 max-w-6xl mx-auto">
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We are committed to protecting your privacy. This Privacy Policy
                outlines the types of personal information we collect, how we
                use it, and the steps we take to safeguard it. By accessing our
                website or using our services, you agree to the terms outlined
                in this policy.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Information We Collect
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-4">
                <li>
                  Personal information such as your name, email address, and
                  contact details.
                </li>
                <li>
                  Technical data, including IP addresses, browser types, and
                  device information.
                </li>
                <li>
                  Information gathered through cookies and other tracking
                  technologies for analytics and performance optimization.
                </li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-4">
                <li>
                  To enhance and personalize your experience on our platform.
                </li>
                <li>
                  To improve website functionality, usability, and content
                  relevance.
                </li>
                <li>
                  To send updates, marketing materials, and promotional offers,
                  where consent has been provided.
                </li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Data Protection Measures
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We employ robust security measures, including encryption and
                secure servers, to protect your personal information from
                unauthorized access, misuse, or disclosure.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Sharing Information with Third Parties
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell or rent your personal information to third
                parties. Information may be shared with trusted service
                providers for operational purposes, provided they comply with
                strict confidentiality obligations.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You have the right to access, correct, update, or delete your
                personal information. To exercise these rights, please contact
                us using the information provided below.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Policy Updates
              </h2>
              <p className="text-gray-700 leading-relaxed">
                This Privacy Policy may be updated periodically to reflect
                changes in our practices or legal requirements. We encourage you
                to review this policy regularly to stay informed about how we
                are protecting your information.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                For any questions or concerns regarding this Privacy Policy,
                please contact us at:
              </p>
              <p className="text-gray-700 font-semibold">
                Email: support@example.com
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
