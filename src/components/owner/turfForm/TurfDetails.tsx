
import React, { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { TurfFormInputs } from '@/types/turf';

interface TurfDetailsProps {
  register: UseFormRegister<TurfFormInputs>;
  errors: FieldErrors<TurfFormInputs>;
  control: Control<TurfFormInputs>;
}


const TurfDetails: React.FC<TurfDetailsProps> = ({ register, errors }) => {
   const [hourlyRate, setHourlyRate] = useState('');
  const [size, setSize] = useState('');

  // Allow only numbers, max 6 digits for hourlyRate
  const handleHourlyRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setHourlyRate(value);
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setSize(value);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Turf Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Turf Type <span className="text-red-500">*</span>
        </label>
        <select
          {...register('turfType', { required: 'Turf type is required' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select turf type</option>
          <option value="football">Football</option>
          <option value="cricket">Cricket</option>
          <option value="basketball">Basketball</option>
          <option value="badminton">Badminton</option>
          <option value="tennis">Tennis</option>
          <option value="volleyball">Volleyball</option>
          <option value="hockey">Hockey</option>
        </select>
        {errors.turfType && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors.turfType.message}
          </p>
        )}
      </div>

      {/* Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Size (optional)
        </label>
        <input
          type="text"
          {...register('size')}
          value={size}
          onChange={handleSizeChange}

          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="100x50 meters"
        />
      </div>

      {/* Hourly Rate */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hourly Rate (₹) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          {...register('hourlyRate', { 
            required: 'Hourly rate is required',
            min: { value: 1, message: 'Rate must be positive' }
          })}
          value={hourlyRate}
          onChange={handleHourlyRateChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.hourlyRate && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors.hourlyRate.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TurfDetails;


