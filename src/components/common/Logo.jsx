import { NavLink } from 'react-router-dom';

export default function Logo() {
  return (
    <NavLink
      to='/'
      className='flex items-center gap-2 hover:-translate-y-[1px] transition-transform'
    >
      <div className=' p-2 rounded-lg '>
        <img
          src='/eyong.png'
          alt='Logo'
          className='h-8 w-auto drop-shadow hover:drop-shadow-lg transition-all'
        />
      </div>
    </NavLink>
  );
}
