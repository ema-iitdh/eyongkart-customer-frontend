const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-8 py-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-md text-gray-600 mb-4 italic">Effective Date: 1/1/2025</p>
          <p className="text-gray-700 mb-6">
            At <span className="font-semibold text-lg">EyongKart</span>, we value your privacy and are committed to protecting your personal data. This Privacy Policy
            outlines how we collect, use, and safeguard your information when you visit <a href="https://eyongkart.com" className="text-blue-600 hover:underline">eyongkart.com</a>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 text-lg">
            <li><span className="font-semibold">Personal Information:</span> Name, email address, phone number, shipping and billing addresses.</li>
            <li><span className="font-semibold">Payment Information:</span> We use third-party payment gateways; we do not store your card details.</li>
            <li><span className="font-semibold">Browsing Data:</span> IP address, device details, and cookies to enhance user experience.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 text-lg">
            <li>To process and fulfill orders</li>
            <li>To improve our website and services</li>
            <li>To communicate order updates and promotional offers</li>
            <li>To ensure security and prevent fraud</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Sharing of Information</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 text-lg">
            <li>We do not sell your personal data.</li>
            <li>We may share information with trusted partners (couriers, payment gateways) for order fulfillment.</li>
            <li>Legal compliance may require us to disclose certain data.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Security</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 text-lg">
            <li>We use encryption and secure servers to protect your data.</li>
            <li>Users should keep their account credentials confidential.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 text-lg">
            <li>Request access to or deletion of your data.</li>
            <li>Opt-out of marketing emails anytime.</li>
          </ul>

          <p className="text-gray-700 mt-8 text-lg">
            For privacy-related inquiries, contact us at{" "}
            <a href="mailto:support.ema@iitdh.ac.in" className="text-blue-600 hover:underline">
              support.ema@iitdh.ac.in
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy

