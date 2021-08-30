import clsx from 'clsx';
import React from 'react';

const Badge = ({ value, color }: { value: string; color?: string }) => {
  const badgeColorStyles = (value: string, color?: string) => {
    if (color) {
      switch (color) {
        case 'orange':
          return 'bg-yellow-500';
        case 'default':
          return 'bg-black';
        default:
          return `bg-${color}-500`;
      }
    } else {
      switch (value) {
        case 'Teams':
          return 'bg-purple-500';
        case 'SIAP':
          return 'bg-yellow-600';
        case 'Link Kustom':
          return 'bg-black';
        case 'Kormat':
          return 'bg-pink-500';
        case 'Active':
          return 'bg-green-500';
        default:
          return 'bg-red-500';
      }
    }
  };

  return (
    <div
      className={clsx(
        'rounded text-xs text-white px-2 py-1 flex items-center w-max',
        badgeColorStyles(value, color)
      )}
    >
      <span>{value}</span>
    </div>
  );
};

export default Badge;
