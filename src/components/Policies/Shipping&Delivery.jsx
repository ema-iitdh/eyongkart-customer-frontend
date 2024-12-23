import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const ShippingAndDelivery = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-12 px-6 sm:px-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-10">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Shipping and Delivery Details
          </h1>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We aim to provide a smooth and efficient shipping and delivery
              experience. This section outlines our shipping and delivery
              policies, including processing times, shipping costs, and delivery
              methods.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
              Shipping Methods and Processing Time
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We offer several shipping methods based on your location. Orders
              are processed within <strong>1-3 business days</strong> and
              shipped based on the method you select during checkout.
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                Standard Shipping: Estimated delivery within 5-7 business days.
              </li>
              <li>
                Expedited Shipping: Estimated delivery within 2-3 business days.
              </li>
              <li>
                Overnight Shipping: Next business day delivery for orders placed
                before 12 PM.
              </li>
            </ul>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
              Shipping Costs
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Shipping costs are calculated based on your shipping address and
              the method you select. Here are the general guidelines:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                Standard Shipping: Free for orders above $50, otherwise a flat
                $5 charge applies.
              </li>
              <li>Expedited Shipping: Flat $15 charge.</li>
              <li>Overnight Shipping: Flat $25 charge.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Additional fees may apply for remote locations or special shipping
              requests.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
              Order Tracking
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Once your order is shipped, you will receive a tracking number via
              email. You can track your order on the carrier’s website using the
              provided tracking number.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              If you do not receive a tracking number within 48 hours of placing
              your order, please contact our customer support team.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
              Delivery Times
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The estimated delivery time depends on your location and the
              shipping method you choose. Below are our estimated delivery
              times:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                Domestic Orders: 5-7 business days (Standard), 2-3 business days
                (Expedited), Next business day (Overnight).
              </li>
              <li>
                International Orders: 7-14 business days, depending on the
                destination and customs clearance times.
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Please note that delays may occur due to unforeseen circumstances
              such as weather conditions or holidays.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
              Shipping Restrictions
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Currently, we are unable to ship to the following locations:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>PO Boxes</li>
              <li>Military Addresses (APO/FPO)</li>
              <li>Some international regions due to customs restrictions</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              If you are unsure whether we can ship to your location, please
              contact our customer support team for assistance.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
              Lost or Damaged Items
            </h2>
            <p className="text-gray-600 leading-relaxed">
              In the event that your order is lost or damaged during shipping,
              please contact our customer support team within{" "}
              <strong>7 days</strong> of receiving the package. We will assist
              you with a replacement or refund, depending on the situation.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Please ensure to retain all packaging and labels for inspection by
              the carrier.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions or concerns about shipping or delivery,
              feel free to contact our customer support team:
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

export default ShippingAndDelivery;
