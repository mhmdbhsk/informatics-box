import React from 'react';
import CubeIcon from '../assets/CubeIcon';

const Header = () => {
  return (
    <header className='flex justify-center items-center space-x-4 h-28 md:h-48'>
      <CubeIcon className='w-8' />
      <div className='flex flex-col'>
        <span className='text-lg md:text-2xl font-bold'>informatics-box</span>
        <span className='text-[10px] md:text-xs text-gray-400'>
          A place to see your assignments and many more!
        </span>
      </div>
    </header>
  );
};

export default Header;
