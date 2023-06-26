import React, { ReactNode } from 'react';
import Link from 'next/link';

interface SidebarLinkProps {
  to: string;
  children: ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, children }) => {

  return (
    <Link href={to}>

      <button className='text-slate-300 w-full text-center p-5 rounded-xl hover:bg-gray-600 hover:text-white hover:font-medium'>
        <div className='flex items-center justify-start gap-3'>
          {children}
        </div>
      </button>

    </Link>
  );
};

export default SidebarLink;