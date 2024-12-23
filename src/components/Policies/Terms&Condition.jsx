import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mt-6">
              Terms and Conditions
            </h1>
          </header>

          <main className="space-y-6 text-gray-700 text-sm sm:text-base">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Introduction
              </h2>
              <p>
                Welcome to our website! By using our services, you agree to
                these terms. If you don’t agree, kindly avoid using the site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Your Responsibilities
              </h2>
              <ul className="list-disc pl-5">
                <li>Provide correct details when signing up.</li>
                <li>Keep your account information private.</li>
                <li>Use the site for lawful purposes only.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Restrictions
              </h2>
              <ul className="list-disc pl-5">
                <li>No harmful or illegal activities.</li>
                <li>No unauthorized access to our systems.</li>
                <li>Do not use bots or automated tools on the site.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Payments and Refunds
              </h2>
              <ul className="list-disc pl-5">
                <li>Payments must be made in full at checkout.</li>
                <li>
                  Refunds follow our policy—see "Refund Policy" for details.
                </li>
                <li>We reserve the right to cancel orders as needed.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Liability
              </h2>
              <p>
                We are not responsible for damages caused by the use or
                inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Termination
              </h2>
              <p>We can suspend or end your access if you violate our terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Privacy
              </h2>
              <p>
                Your data is safe with us. For details, check our Privacy
                Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Updates
              </h2>
              <p>
                Terms may change over time. Please revisit this page for
                updates.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Contact
              </h2>
              <p>
                Got questions? Email us at{" "}
                <span className="font-medium">support@example.com</span>.
              </p>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
