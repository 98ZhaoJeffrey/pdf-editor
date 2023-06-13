import React from 'react'

const SidebarLink: React.FC<{ children: any, alt: boolean }> = ({ children, alt }) => {
  return (
    <>{
      alt ?
        <button className='text-white w-full text-center p-5 rounded-xl hover:bg-emerald-600 hover:text-white font-medium'>
          <div className='flex items-center justify-start gap-3'>
            {children}
          </div>
        </button>
        :
        <button className='text-slate-300 w-full text-center p-5 rounded-xl hover:bg-gray-600 hover:text-white hover:font-medium'>
          <div className='flex items-center justify-start gap-3'>
            {children}
          </div>
        </button>}
    </>

  );
};

export default SidebarLink
