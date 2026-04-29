
// import React from 'react';
// import { UseFormRegister, FieldError } from 'react-hook-form';

// interface FormInputProps {
//   label: string;
//   name: string;
//   type?: string;
//   register: UseFormRegister<any>;
//   error?: FieldError;
//   required?: boolean;
//   className?: string;
//   [key: string]: any;
// }

// export const FormInput: React.FC<FormInputProps> = ({
//   label,
//   name,
//   type = 'text',
//   register,
//   error,
//   required = false,
//   className = '',
//   ...rest
// }) => {
//   return (
//     <div className={`mb-4 ${className}`}>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type={type}
//         {...register(name, { required: required && `${label} is required` })}
//         className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}
//         {...rest}
//       />
//       {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
//     </div>
//   );
// };