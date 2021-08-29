import React from 'react';

const Footer = () => {
  return (
    <footer className='flex items-center justify-center h-16 bottom-0 text-[10px] md:text-sm text-gray-300 text-center'>
      <span>
        Copyright © 2021 •{' '}
        <a
          className='hover:underline'
          href='https://bhsk.my.id'
          target='informatics-box'
        >
          Muhammad Bhaska
        </a>{' '}
        • All Right Reserved{' '}
      </span>
    </footer>
  );
};

export default Footer;
