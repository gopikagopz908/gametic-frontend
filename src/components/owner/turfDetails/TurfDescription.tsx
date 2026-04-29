import React from 'react';

interface TurfDescriptionProps {
  description?: string;
}

const TurfDescription: React.FC<TurfDescriptionProps> = ({ description }) => {
  if (!description) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-900">Description</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default TurfDescription;