import React from 'react';

const Footer = () => {
  return (
    <footer className='flex flex-col items-center justify-center my-6 h-16 bottom-0 text-[10px] md:text-sm text-gray-300 text-center'>
      <span>
        Want to contribute? feel free to reach{' '}
        <a
          className='hover:underline'
          href='https://t.me/mhmdbhsk'
          target='mhmdbhsk telegram'
        >
          me
        </a>
      </span>
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
