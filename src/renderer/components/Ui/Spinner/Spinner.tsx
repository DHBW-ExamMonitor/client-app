import React from 'react';
import { ClipLoader } from 'react-spinners';

/**
 * MyComponent Component
 */
export const Spinner: React.FC = () => {
  return (
    <div className="flex items-center">
      <ClipLoader color="white" size={20} />
    </div>
  );
};

export default Spinner;
