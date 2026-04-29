
import React from 'react';
import { useWatch } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { TurfFormInputs } from '@/types/turf';

interface TurfAvailabilityProps {
  register: UseFormRegister<TurfFormInputs>;
  errors: FieldErrors<TurfFormInputs>;
  control: Control<TurfFormInputs>;
}

const predefinedTimeSlots = [
  '06:00 AM - 07:00 AM',
  '07:00 AM - 08:00 AM',
  '08:00 AM - 09:00 AM',
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
  '06:00 PM - 07:00 PM',
  '07:00 PM - 08:00 PM',
];

const TurfAvailability: React.FC<TurfAvailabilityProps> = ({ register, errors, control }) => {
    const selectedDays = useWatch({ control, name: 'availability.days' }) || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Days selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Available Days <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="flex items-center">
                <input
                  type="checkbox"
                  id={`day-${day}`}
                  value={day}
                  {...register('availability.days', {
                    required: 'At least one day is required',
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700">
                  {day}
                </label>
              </div>
            ))}
          </div>
          {errors.availability?.days && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" /> {errors.availability.days.message}
            </p>
          )}
        </div>

        {/* Time selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
              Opening Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="startTime"
              {...register('availability.startTime', {
                required: 'Opening time is required',
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.availability?.startTime && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.availability.startTime.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
              Closing Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="endTime"
              {...register('availability.endTime', {
                required: 'Closing time is required',
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.availability?.endTime && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.availability.endTime.message}
              </p>
            )}
          </div>
        </div>

        {/* Time Slots selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Time Slots <span className="text-red-500">*</span>
          </label>
          <div className={`flex flex-wrap gap-3 max-h-48 overflow-y-auto border border-gray-300 rounded p-3 ${(!selectedDays || selectedDays.length === 0) ? 'bg-gray-100 cursor-not-allowed' : ''}`}>
            {predefinedTimeSlots.map((slot, idx) => (
              <div key={idx} className="flex items-center w-1/2 md:w-1/3">
                <input
                  type="checkbox"
                  id={`slot-${idx}`}
                  value={slot}
                  disabled={!selectedDays || selectedDays.length === 0}
                  {...register('availability.timeSlots', {
                    required: 'At least one time slot is required',
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <label htmlFor={`slot-${idx}`} className="ml-2 text-sm text-gray-700">
                  {slot}
                </label>
              </div>
            ))}
          </div>
          {errors.availability?.timeSlots && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" /> {errors.availability.timeSlots.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TurfAvailability;
