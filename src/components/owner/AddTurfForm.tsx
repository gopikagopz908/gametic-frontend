
'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addTurf, updateTurf } from '@/redux/actions/turfActions';
import { toast } from 'react-toastify';
import { FiX } from 'react-icons/fi';
import TurfBasicInfo from './turfForm/TurfBasicInfo';
import TurfDetails from './turfForm/TurfDetails';
import TurfAvailability from './turfForm/TurfAvailability';
import TurfImageUpload from './turfForm/TurfImageUpload';
import { TurfFormInputs, Availability } from '../../types/turf';
import { useAppSelector } from '@/redux/hook';

interface AddTurfFormProps {
  onClose: () => void;
  turfToEdit?: TurfFormInputs | null;
}

  const DEFAULT_AVAILABILITY: Availability = {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    startTime: '06:00',
    endTime: '20:00',
  };

const AddTurfForm: React.FC<AddTurfFormProps> = ({ onClose, turfToEdit }) => {
  console.log("Turf data passed to AddTurfForm:", turfToEdit);

  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector(state => state.auth.user);
  const [step, setStep] = useState(1);
  const [previewImages, setPreviewImages] = useState<(string | File)[]>([]);
  const [existingImages, setExistingImages] = useState<(string | File)[]>([]);

  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
    // watch,
    trigger,
  } = useForm<TurfFormInputs>({
    mode: 'onChange',
    defaultValues: {
      availability: DEFAULT_AVAILABILITY,
      images: [],
    },
  });

  useEffect(() => {
    if (turfToEdit) {
      console.log('turfToEdit.location:', turfToEdit.location);
      console.log('turfToEdit.address:', turfToEdit.address);
    }
  }, [turfToEdit]);

  useEffect(() => {
    if (turfToEdit) {
      console.log('turfToEdit:', turfToEdit);
    
      const fields: (keyof TurfFormInputs)[] = [
        'name',
        'city',
        'area',
        'location',
        'address',
        'turfType',
        'size',
        'hourlyRate',
      ];

      fields.forEach((field) => {
        const value = turfToEdit[field] ?? '';
        setValue(field, value);
      });

      // Handle availability
      let availability: Availability;
      if (typeof turfToEdit.availability === 'string') {
        try {
          availability = JSON.parse(turfToEdit.availability);
        } catch (error) {
          console.error('Error parsing availability:', error);
          availability = DEFAULT_AVAILABILITY;
        }
      } else {
        availability = turfToEdit.availability || DEFAULT_AVAILABILITY;
      }
      setValue('availability', availability);

      // Handle images
      if (turfToEdit.images && Array.isArray(turfToEdit.images)) {
        setExistingImages(turfToEdit.images);
        setPreviewImages(turfToEdit.images);
      }
    } else {
      // Reset form for new turf
      reset({
        availability: DEFAULT_AVAILABILITY,
        images: [],
        address: ''
      });
    }
  }, [turfToEdit, setValue, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFiles = Array.from(e.target.files);
    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...newPreviewUrls]);
    setFiles((prev) => [...prev, ...newFiles]);
    setValue('images', [...files, ...newFiles]);
  };

  const removeImage = (index: number) => {
    const isExistingImage = index < existingImages.length;

    if (isExistingImage) {
      // Remove from existing images
      const updatedExisting = [...existingImages];
      updatedExisting.splice(index, 1);
      setExistingImages(updatedExisting);
    } else {
      // Remove from new files
      const adjustedIndex = index - existingImages.length;
      const updatedFiles = [...files];
      updatedFiles.splice(adjustedIndex, 1);
      setFiles(updatedFiles);
      setValue('images', updatedFiles);
    }

    // Remove from preview
    const updatedPreview = [...previewImages];
    updatedPreview.splice(index, 1);
    setPreviewImages(updatedPreview);
  };

  const nextStep = async () => {
  const isValid = await validateCurrentStep();
  if (!isValid) return;

  // For all cases, just move to next step
  // We'll handle image validation only during final submission
  setStep((prev) => Math.min(prev + 1, 4));
};

  const onSubmit: SubmitHandler<TurfFormInputs> = async (data) => {
  // Only validate images on final submission
  if (!turfToEdit && files.length === 0 && existingImages.length === 0) {
    // toast.error('Please upload at least one image');
    return;
  }

  if (turfToEdit && files.length === 0 && existingImages.length === 0) {
    toast.error('Please keep or upload at least one image');
    return;
  }

    setIsSubmitting(true);
    // if (!user?._id) {
    //   toast.error('User information is missing - please login again');
    //   return;
    // }

      if (!user?.id) {
      toast.error('User information is missing - please login again');
      setIsSubmitting(false);
      return;
    }

    // const id = "682ec3f4c961fa99b0555143";
    // if (!id) {
    //   toast.error('User information is missing');
    //   return;
    // }

    try {
      const formData = new FormData();
      formData.append('ownerId', user.id);
      // formData.append('ownerId', id);
      formData.append('name', data.name);
      formData.append('city', data.city);
      formData.append('area', data.area);
      formData.append('location', data.location);
      formData.append('turfType', data.turfType);
      formData.append('size', data.size);
      formData.append('hourlyRate', data.hourlyRate.toString());
      formData.append('status', 'active');

      const availability = data.availability || DEFAULT_AVAILABILITY;
      formData.append('availability', JSON.stringify(availability));

      // Add new files
      files.forEach((file) => {
        formData.append('images', file);
      });

      // For editing, include existing images that haven't been removed
      if (turfToEdit && existingImages.length > 0) {
        existingImages.forEach((image) => {
            if (typeof image === 'string') {
          formData.append('existingImages', image);
            }
        });
      }

      if (turfToEdit?._id) {
        await dispatch(updateTurf({ id: turfToEdit._id, formData })).unwrap();
        toast.success('Turf updated successfully!');
      } else {
        await dispatch(addTurf(formData)).unwrap();
        toast.success('Turf added successfully!');
      }
      onClose();

    }catch (error) {
    if (error instanceof Error) {
    toast.error(error.message || 'Failed to save turf');
  } else {
    toast.error('Failed to save turf');
  }
}
  }

//   } catch (error: any) {
  //     console.error('Submission error:', error);
  //     toast.error(error.message || 'Failed to save turf');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // const validateCurrentStep = async () => {
    // let fieldsToValidate: string[] = [];
  const validateCurrentStep = async (): Promise<boolean> => {
// let fieldsToValidate: string[] = [];
type TurfFormField =
  | keyof TurfFormInputs
  | 'availability.days'
  | 'availability.startTime'
  | 'availability.endTime';

let fieldsToValidate: TurfFormField[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = ['name', 'city', 'area', 'location', 'address'];
        break;
      case 2:
        fieldsToValidate = ['turfType', 'size', 'hourlyRate'];
        break;
      case 3:
        fieldsToValidate = ['availability.days', 'availability.startTime', 'availability.endTime'];

        break;
      case 4:
        return true;
      default:
        return true;
    }

  try {
    // const isValid = await trigger(fieldsToValidate as any);
    const isValid = await trigger(fieldsToValidate);



    if (!isValid) {
      toast.error('Please fill all required fields correctly');
    }
    return isValid;
  } catch (error) {
    console.error('Validation error:', error);
    toast.error('Validation failed');
    return false;
  }
};

 return (
    <div className="relative bg-white rounded-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">
          {turfToEdit ? 'Edit Turf' : 'Add New Turf'}
        </h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiX size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="flex justify-center mb-8">
          {[1, 2, 3, 4].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                    ${step === stepNumber ? 'bg-blue-600 text-white' :
                    step > stepNumber ? 'bg-green-500 text-white' : 'bg-gray-200'}
                  `}
              >
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`h-1 w-12 mt-3 ${step > stepNumber ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && (
          <TurfBasicInfo
            register={register}
            errors={errors}
            // control={control}
             />
        )}

        {step === 2 && (
          <TurfDetails
            register={register}
            errors={errors}
            control={control} />
        )}

        {step === 3 && (
          <TurfAvailability
            register={register}
            errors={errors}
            control={control} />
        )}

        {step === 4 && (
          <TurfImageUpload
            register={register}
            errors={errors}
            previewImages={previewImages}
            existingImages={existingImages}
            onImageChange={handleImageChange}
            removeImage={removeImage}
          />
        )}

        <div className="flex justify-between pt-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 border border-gray-700 rounded-md hover:bg-gray-50"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : turfToEdit ? 'Update Turf' : 'Add Turf'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTurfForm;
