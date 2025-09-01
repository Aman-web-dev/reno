"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../lib/firebase";
import Image from "next/image";
export type Inputs = {
  id?: number;
  name: string;
  address: string;
  state: string;
  city: string;
  contact: string;
  image: FileList;
  email_id: string;
};

function AddSchoolPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage,setSelectedImage]=useState<File>()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setSelectedImage(e.target.files?.[0])
      };
      reader.readAsDataURL(file);
    }
  };


  async function uploadSchoolImageAndGetUrl(imageFile: File) {
    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${imageFile.name}`;
      const storageRef = ref(storage, `reno/${fileName}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }

  // Handles form submission
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    try {

      console.log(data.image)
      console.log(imagePreview)
      let imageUrl=""
      if(selectedImage){
      imageUrl = await uploadSchoolImageAndGetUrl(selectedImage);
      }else{
        throw new Error("Please Upload a valid Image")
      }


      const payload = {
        ...data,
        image: imageUrl,
      };

      await fetch('/api/school', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      alert('School added successfully!');
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error adding school. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New School</h1>
            <p className="text-gray-600">Fill in the details to register a new school</p>
          </div>

          <div className="space-y-6">
 
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                School Name *
              </label>
              <input
                {...register("name", { 
                  required: "School name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                placeholder="Enter school name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email_id" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                {...register("email_id", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address"
                  }
                })}
                type="email"
                id="email_id"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                placeholder="school@example.com"
              />
              {errors.email_id && (
                <p className="mt-1 text-sm text-red-600">{errors.email_id.message}</p>
              )}
            </div>

  
            <div>
              <label htmlFor="contact" className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Number *
              </label>
              <input
                {...register("contact", { 
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number"
                  }
                })}
                type="number"
                id="contact"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                placeholder="1234567890"
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                {...register("address", { 
                  required: "Address is required",
                  minLength: { value: 10, message: "Address must be at least 10 characters" }
                })}
                id="address"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
                placeholder="Enter complete address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                  City *
                </label>
                <input
                  {...register("city", { 
                    required: "City is required",
                    minLength: { value: 2, message: "City must be at least 2 characters" }
                  })}
                  type="text"
                  id="city"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                  State *
                </label>
                <input
                  {...register("state", { 
                    required: "State is required",
                    minLength: { value: 2, message: "State must be at least 2 characters" }
                  })}
                  type="text"
                  id="state"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  placeholder="Enter state"
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                )}
              </div>
            </div>


            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                School Image *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  {...register("image", { 
                    required: "School image is required",
                    validate: {
                      fileType: (files) => {
                        if (!files || !files[0]) return true;
                        const file = files[0];
                        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                        return allowedTypes.includes(file.type) || "Only JPG, PNG, and GIF files are allowed";
                      },
                      fileSize: (files) => {
                        if (!files || !files[0]) return true;
                        const file = files[0];
                        return file.size <= 10 * 1024 * 1024 || "File size must be less than 10MB";
                      }
                    }
                  })}
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="image" className="cursor-pointer">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <Image
                        src={imagePreview} 
                        alt="School preview" 
                        height={220}
                        width={220}
                        className="max-h-48 mx-auto rounded-lg shadow-md"
                      />
                      <p className="text-sm text-gray-600">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
              )}
            </div>

   
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setImagePreview(null);
                }}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
              >
                Reset Form
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                {isSubmitting ? 'Adding School...' : 'Add School'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSchoolPage;