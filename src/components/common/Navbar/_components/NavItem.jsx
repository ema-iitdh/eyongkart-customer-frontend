import { Badge } from '@/components/ui/badge';
import { NavLink } from 'react-router-dom';

export default function NavItem({ icon, title, badgeCount = 0, to }) {
  return (
    <NavLink
      to={to}
      className='flex flex-col items-center group hover:text-red-500 transition-colors'
    >
      <div className='relative '>
        {icon}
        <span
          className={
            badgeCount > 0
              ? 'absolute -top-2 text-white -right-2 text-xs  rounded-full bg-red-500 w-4 h-4 flex items-center justify-center'
              : 'hidden'
          }
        >
          {badgeCount}
        </span>

        {/* <span className='absolute -top-2 -right-2 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center'>
          {badgeCount}
        </span> */}
      </div>
      <span className='mt-0.5'>{title}</span>
    </NavLink>
  );
}
