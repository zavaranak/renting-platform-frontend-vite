import React from 'react';

interface HeaderItemProps {
  children: React.ReactNode;
}

export default function HeaderItem({ children }: HeaderItemProps) {
  return (
    <div className='hover:scale-110 m-auto cursor-pointer'>{children}</div>
  );
}
