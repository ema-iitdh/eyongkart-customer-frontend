import { CloudinaryConfig } from '../../../Cloudinary';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ImageAndNameCard = ({ product }) => {
  const { _id, name, baseImage, image_id, variants = [] } = product;
  const imageUrl = baseImage?.url || image_id?.[0];

  return (
    <Link to={`/product/${_id}/${variants?.[0]?._id}`} className='block w-full'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 w-[200px] flex flex-col group overflow-hidden'
      >
        {/* Using padding-top with 75% (3/4 = 0.75) creates a 4:3 aspect ratio container */}
        <div className='relative w-full pt-[75%] bg-gray-50'>
          <img
            src={`${CloudinaryConfig.CLOUDINARY_URL}/image/upload/f_auto,q_auto,w_400,h_300/${imageUrl}`}
            alt={name}
            className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
            loading='lazy'
          />
        </div>
        <div className='p-2 h-[50px]'>
          <h3 className='text-sm font-medium text-gray-900 line-clamp-2 leading-tight'>
            {name}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
};

export default ImageAndNameCard;
