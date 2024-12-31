import { NavLink } from 'react-router-dom';

export default function Logo() {
  return (
    <NavLink to='/' className='flex-shrink-0 relative group overflow-hidden'>
      <img
        src='/logo_latest.jpeg'
        alt='Logo'
        className='h-12 w-auto object-contain rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 group-hover:scale-105 group-hover:brightness-105 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]'
      />
      <div className='absolute inset-0 bg-gradient-to-r from-red-500/20 via-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg shadow-inner' />
      <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shadow-[0_-2px_8px_rgba(239,68,68,0.3)]' />
    </NavLink>
  );
}
