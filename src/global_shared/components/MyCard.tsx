import React, { FC } from 'react';

interface MyCardProps {
  shadow?: string | null;
  bgColor?: string | null;
  borderColor?: string | null;
  minimumHeight?: number;
  children?: React.ReactNode;
  styleClass?: string | null;
}

const MyCard: FC<MyCardProps> = ({
  shadow,
  minimumHeight = 50,
  bgColor = 'bg-surface',
  borderColor = 'border border-gray-100',
  children,
  styleClass,
}) => {
  return (
    <div
      className={`group ${styleClass}flex items-center gap-2 ${borderColor} overflow-hidden ${bgColor} shadow-${shadow} hover:cursor-pointer hover:shadow-md  `}
      style={{ minHeight: minimumHeight }}
    >
      {children}
    </div>
  );
};

export default MyCard;
