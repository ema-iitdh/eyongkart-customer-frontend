import { CloudinaryConfig } from '../../../Cloudinary';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ImageOnlyCard = ({ product }) => {
  const { _id, name, baseImage, image_id, variants = [] } = product;

  const imageUrl = baseImage?.url || image_id?.[0];

  return (
    <Link to={`/product/${_id}/${variants?.[0]?._id}`} className='block w-full'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 h-[150px] w-[150px] flex flex-col group overflow-hidden'
      >
        <div className='pt-[75%] flex items-center justify-center bg-gray-50'>
          <img
            src={`${CloudinaryConfig.CLOUDINARY_URL}/image/upload/f_auto,q_auto,w_400,h_400/${imageUrl}`}
            alt={name}
            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
            loading='lazy'
          />
        </div>
      </motion.div>
    </Link>
  );
};

export default ImageOnlyCard;
