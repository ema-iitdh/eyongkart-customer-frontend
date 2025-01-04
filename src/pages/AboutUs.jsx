import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <motion.div
      className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16 px-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className='max-w-4xl mx-auto'>
        <section className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            About Eyongkart
          </h1>
          <p className='text-xl text-gray-600 italic'>
            Empowering Artisans, Preserving Heritage, Building Future
          </p>
        </section>

        <section className='mb-16'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-6'>
            Our Mission
          </h2>
          <p className='text-lg text-gray-600 leading-relaxed'>
            Eyongkart is a humanitarian initiative developed under Korou
            Technologies in collaboration with IIT Dharwad, Karnataka. Our
            platform serves as a bridge between talented artisans displaced by
            conflict in Manipur and customers who appreciate authentic
            handcrafted products.
          </p>
        </section>

        <section className='mb-16'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-8'>
            Our Core Values
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                Empowerment
              </h3>
              <p className='text-gray-600'>
                Supporting displaced artisans by providing them a platform to
                showcase and sell their crafts
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                Heritage
              </h3>
              <p className='text-gray-600'>
                Preserving and promoting the rich cultural heritage and
                traditional craftsmanship of Manipur
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                Community
              </h3>
              <p className='text-gray-600'>
                Building a supportive ecosystem for artisans in relief camps to
                rebuild their livelihoods
              </p>
            </div>
          </div>
        </section>

        <section className='bg-white p-8 rounded-lg shadow-md'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-6'>
            Our Impact
          </h2>
          <p className='text-lg text-gray-600 leading-relaxed'>
            Through Eyongkart, we're working to create sustainable economic
            opportunities for artisans affected by conflict, while ensuring
            their valuable skills and traditions continue to thrive. Every
            purchase supports an artisan's journey towards stability and
            self-reliance.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default AboutUs;
