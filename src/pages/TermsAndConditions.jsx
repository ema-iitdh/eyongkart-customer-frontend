const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-8 py-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
          <p className="text-md text-gray-600 mb-4 italic">Effective Date: 1/1/2025</p>
          <p className="text-gray-700 mb-6 text-lg">
            Welcome to <span className="font-semibold">EyongKart</span>! By using our website <a href="https://eyongkart.com" className="text-blue-600 hover:underline">eyongkart.com</a>, you agree to the following terms:
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. General</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 text-lg">
            <li>EyongKart sells mainly handloom and handicraft products.</li>
            <li>All users must be 18+ or have parental consent.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Orders & Payments</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 text-lg">
            <li>Orders are confirmed only after full payment or selecting COD option.</li>
            <li>Prices are subject to change without notice.</li>
            <li>We accept COD/UPI/Card payments.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Shipping & Delivery</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 text-lg">
            <li>Delivery timelines vary based on location.</li>
            <li>EyongKart is not responsible for delays due to unforeseen circumstances.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Intellectual Property</h2>
          <ul className="list-disc pl-6 mb-6 text-lg text-gray-700">
            <li>All content (images, logos, text) is owned by EyongKart.</li>
            <li>Unauthorized use of any content is prohibited.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Limitation of Liability</h2>
          <ul className="list-disc pl-6 mb-6 text-lg text-gray-700">
            <li>EyongKart is not responsible for indirect or incidental damages.</li>
            <li>Product descriptions are for informational purposes; slight variations may occur.</li>
          </ul>

          <p className="text-gray-700 mt-8 text-lg">
            For queries, reach out at{" "}
            <a href="mailto:ema@iitdh.ac.in" className="text-blue-600 hover:underline">
              ema@iitdh.ac.in
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditions

