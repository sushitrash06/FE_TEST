import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, footer, className = '' }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="mb-4">
        {children}
      </div>
      {footer && (
        <div className="border-t pt-2 text-gray-600">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
