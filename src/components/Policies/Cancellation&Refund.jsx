import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const CancellationAndRefund = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-12 px-6 sm:px-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-10">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Cancellation and Refund Policy
          </h1>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We strive to ensure customer satisfaction, and we have a
              straightforward cancellation and refund process in place. This
              document outlines the conditions under which orders can be
              canceled and refunds processed.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
              Cancellation Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You can cancel your order within <strong>24 hours</strong> of
              placing it. After this period, cancellations will not be accepted.
              Here’s how you can cancel your order:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Log into your account.</li>
              <li>
                Go to your order history and select the order to be canceled.
              </li>
              <li>Click the "Cancel Order" button and confirm your action.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              In case of any issues with cancellation, please contact our
              customer support team at:
            </p>
            <p className="text-gray-600">
              Email:{" "}
              <a href="mailto:support@example.com" className="text-blue-500">
                support@example.com
              </a>
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
              Refund Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Refunds are processed only for orders that are canceled within the
              allowed period. The refund will be issued to the original payment
              method and can take up to <strong>7-10 business days</strong> to
              appear in your account.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Refund requests may be rejected if:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                The cancellation request was made after the allowed time frame.
              </li>
              <li>
                The product has been used or opened (for certain items like
                electronics or perishable goods).
              </li>
              <li>
                The product is non-returnable as per our product-specific terms.
              </li>
            </ul>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
              How to Request a Refund
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To initiate a refund, follow these steps:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Log into your account and visit the "Orders" section.</li>
              <li>Find the order you wish to request a refund for.</li>
              <li>
                Click on the "Request Refund" option and complete the necessary
                details.
              </li>
              <li>
                Our customer support team will review your request and notify
                you about the outcome.
              </li>
            </ul>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
              Non-Refundable Items
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Some items are non-refundable under our policy. These include:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Gift cards</li>
              <li>Personalized or customized items</li>
              <li>Perishable items like food or beverages</li>
              <li>Intimate products (e.g., underwear, cosmetics)</li>
            </ul>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions or concerns regarding our cancellation
              and refund policies, feel free to get in touch with our customer
              support team:
            </p>
            <p className="text-gray-600">
              Email:{" "}
              <a href="mailto:support@example.com" className="text-blue-500">
                support@example.com
              </a>
            </p>
            <p className="text-gray-600">
              Phone: <span className="text-blue-500">+1 234 567 890</span>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CancellationAndRefund;
