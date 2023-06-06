import React from 'react'

const SidebarLink: React.FC<{ title: string }> = ({ title }) => {
    return (
      <button className='text-slate-300 text-sm w-full text-center p-5 hover:bg-emerald-400 rounded-3xl'>
        {title}
      </button>
    );
  };

export default SidebarLink
