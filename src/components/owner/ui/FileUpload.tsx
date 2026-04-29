
import { TurfFormInputs } from '@/types/turf';
import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FileUploadProps {
  label: string;
  // name: string;
  // register: UseFormRegister<any>;
   name: keyof TurfFormInputs;
    register: UseFormRegister<TurfFormInputs>;
  error?: FieldError;
  required?: boolean;
  multiple?: boolean;
  accept?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  register,
  error,
  required = false,
  multiple = false,
  accept = 'image/*',
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        {...register(name, {
          required: required && `${label} is required`,
          // validate: {
          //   fileType: (files: FileList) => {
          //     if (!files || files.length === 0) return true;
          //     return Array.from(files).every(file => file.type.startsWith('image/')) || 
          //       'Only image files are allowed';
          //   },
          // },
     validate: {
  fileType: (files) => {
    if (!files) return true;
    if (files instanceof FileList) {
      return (
        Array.from(files).every(file => file.type.startsWith('image/')) ||
        'Only image files are allowed'
      );
    }
    return 'Invalid file input';
  },
},


        })}
        className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};