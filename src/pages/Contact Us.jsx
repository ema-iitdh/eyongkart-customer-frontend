import { ClockIcon, MapPinIcon } from "lucide-react"
import { BsEnvelope } from "react-icons/bs"


const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-8 py-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-gray-700 text-lg mb-6">For any queries, support, or feedback, reach out to us:</p>

          <div className="space-y-4 text-lg">
            <div className="flex items-center">
              <BsEnvelope className="h-6 w-6 text-gray-600 mr-2" />
              <span className="text-gray-700">Email:</span>
              <a href="mailto:support.ema@iitdh.ac.in" className="ml-2 text-blue-600 hover:underline">
                support.ema@iitdh.ac.in
              </a>
            </div>

            <div className="flex items-start">
              <MapPinIcon className="h-6 w-6 text-gray-600 mr-2 mt-1" />
              <span className="text-gray-700">Address:</span>
              <span className="ml-2 text-gray-700">Imphal, Manipur</span>
            </div>

            <div className="flex items-center">
              <ClockIcon className="h-6 w-6 text-gray-600 mr-2" />
              <span className="text-gray-700">We aim to respond within 24-48 hours on business days.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs

