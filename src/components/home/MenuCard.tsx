import React from 'react';
import { useRouter } from 'next/router';
import ArrowRightIcon from '../../assets/ArrowRightIcon';

type MenuCardProps = {
  title: string;
  href: string;
};

const MenuCard = ({ title, href }: MenuCardProps) => {
  const router = useRouter();

  return (
    <div className='menu-card group' onClick={() => router.push(href)}>
      <span>{title}</span>
      <ArrowRightIcon className='hidden group-hover:block' />
    </div>
  );
};

export default MenuCard;
