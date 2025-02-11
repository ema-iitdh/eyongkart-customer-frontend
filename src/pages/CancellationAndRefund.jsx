const CancellationAndRefund = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Cancellation & Refund Policy</h1>
          <p className="text-md text-gray-600 mb-4 italic">Effective Date: 1/1/2025</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Order Cancellations</h2>
          <ul className="list-disc pl-6 mb-6 text-lg text-gray-700">
            <li>Orders can be cancelled within 24 hours of purchase.</li>
            <li>Once shipped, orders cannot be cancelled.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Return & Refund Policy</h2>
          <ul className="list-disc pl-6 mb-6 text-lg text-gray-700">
            <li>Only defective or damaged items are eligible for returns within 7 days of delivery.</li>
            <li>
              To initiate a return, email us at{" "}
              <a href="mailto:ema@iitdh.ac.in" className="text-blue-600 hover:underline">
                ema@iitdh.ac.in
              </a>{" "}
              with order details and product images.
            </li>
            <li>Refunds are processed within 7-10 business days after approval.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Non-Refundable Items</h2>
          <ul className="list-disc pl-6 mb-6 text-lg text-gray-700">
            <li>Customized or handmade products may have slight variations and are non-returnable.</li>
          </ul>

          <p className="text-gray-700 mt-8 text-lg">
            For refund assistance, contact us at{" "}
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

export default CancellationAndRefund

