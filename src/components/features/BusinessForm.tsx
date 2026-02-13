"use client";

import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { saveBusinessForm, updateBusiness, type Business } from "@/actions/business";
import { useQueryClient } from "@tanstack/react-query";

interface ImagePreview {
  url: string;
  file: File;
}

interface BusinessFormProps {
  business?: Business | null;
  onSuccess?: () => void;
}

export function BusinessForm({ business, onSuccess }: BusinessFormProps = {}) {
  const queryClient = useQueryClient();
  const isEditing = !!business;
  const [businessTypeOpen, setBusinessTypeOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>(business?.businessType || "");
  const [selectedServices, setSelectedServices] = useState<string>(business?.services || "");
  const [existingImages, setExistingImages] = useState<string[]>(business?.images || []);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const businessTypeDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useClickOutside(businessTypeDropdownRef, () => setBusinessTypeOpen(false));
  useClickOutside(servicesDropdownRef, () => setServicesOpen(false));

  const businessTypes = ["Restaurant", "Retail", "Service"];
  const servicesOptions = ["care", "food", "bath", "groom"];

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: ImagePreview[] = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        file: file,
      }));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
    // Reset input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index].url);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const handleBusinessTypeSelect = (type: string) => {
    setSelectedBusinessType(type);
    setBusinessTypeOpen(false);
  };

  const handleServicesSelect = (service: string) => {
    setSelectedServices(service);
    setServicesOpen(false);
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    const formData = new FormData(e.currentTarget);
    
    // Add existing images to form data
    formData.append('existingImages', JSON.stringify(existingImages));
    
    // Add new images to form data
    imagePreviews.forEach((preview) => {
      formData.append('images', preview.file);
    });

    try {
      let result;
      if (isEditing && business) {
        result = await updateBusiness(business.id, formData);
      } else {
        result = await saveBusinessForm(formData);
      }
      
      if (result.success) {
        setSubmitMessage({ type: 'success', text: result.message });
        queryClient.invalidateQueries({ queryKey: ["businesses"] });
        
        if (onSuccess) {
          onSuccess();
        } else {
          // Reset form only if not editing
          if (!isEditing) {
            formRef.current?.reset();
            setSelectedBusinessType('');
            setSelectedServices('');
            setImagePreviews([]);
            setExistingImages([]);
            // Clear image previews URLs
            imagePreviews.forEach((preview) => {
              URL.revokeObjectURL(preview.url);
            });
          }
        }
      } else {
        setSubmitMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'An error occurred while saving the business',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
      {/* Success/Error Message */}
      {submitMessage && (
        <div
          className={cn(
            "p-4 rounded-xl text-sm font-medium",
            submitMessage.type === 'success'
              ? "bg-green-50 text-green-800 border-2 border-green-200"
              : "bg-red-50 text-red-800 border-2 border-red-200"
          )}
        >
          {submitMessage.text}
        </div>
      )}

      {/* Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              defaultValue={business?.businessName || ""}
              placeholder="Enter the Business name"
              required
              className="w-full h-12 px-4 bg-white border-2 border-red-600 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm cursor-text"
            />
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Services
            </label>
            <div className="relative" ref={servicesDropdownRef}>
              <input
                type="hidden"
                name="services"
                value={selectedServices}
                required
              />
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className={cn(
                  "w-full h-12 px-4 border-2 border-red-600 rounded-xl bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer",
                  selectedServices ? "text-gray-900" : "text-gray-500"
                )}
              >
                <span className="capitalize">
                  {selectedServices || "Select a service"}
                </span>
                <svg
                  className={cn(
                    "w-5 h-5 transition-transform",
                    servicesOpen ? "rotate-180" : "",
                    selectedServices ? "text-gray-900" : "text-gray-500"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border-2 border-red-600 rounded-xl shadow-lg overflow-hidden">
                  {servicesOptions.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServicesSelect(service)}
                      className={cn(
                        "w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer text-sm transition-colors capitalize",
                        selectedServices === service
                          ? "bg-red-50 text-red-600 font-medium"
                          : "text-gray-700"
                      )}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Service Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Service Hours
            </label>
            <input
              type="text"
              name="serviceHours"
              defaultValue={business?.serviceHours || ""}
              placeholder="Enter the operating hours"
              className="w-full h-12 px-4 bg-white border-2 border-red-600 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm cursor-text"
            />
            <p className="mt-1 text-xs text-gray-500">E.g. 9:00 AM - 5:00 PM</p>
          </div>

          {/* Business Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Business Description
            </label>
            <textarea
              name="businessDescription"
              defaultValue={business?.businessDescription || ""}
              placeholder="Enter the Description"
              rows={5}
              className="w-full px-4 py-3 bg-white border-2 border-red-600 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 resize-none text-sm cursor-text"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Business Type */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Business Type
            </label>
            <div className="relative" ref={businessTypeDropdownRef}>
              <input
                type="hidden"
                name="businessType"
                value={selectedBusinessType}
                required
              />
              <button
                type="button"
                onClick={() => setBusinessTypeOpen(!businessTypeOpen)}
                className={cn(
                  "w-full h-12 px-4 border-2 border-red-600 rounded-xl bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer",
                  selectedBusinessType ? "text-gray-900" : "text-gray-500"
                )}
              >
                <span>
                  {selectedBusinessType || "Select the type of Business"}
                </span>
                <svg
                  className={cn(
                    "w-5 h-5 transition-transform",
                    businessTypeOpen ? "rotate-180" : "",
                    selectedBusinessType ? "text-gray-900" : "text-gray-500"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {businessTypeOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border-2 border-red-600 rounded-xl shadow-lg overflow-hidden">
                  {businessTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleBusinessTypeSelect(type)}
                      className={cn(
                        "w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer text-sm transition-colors",
                        selectedBusinessType === type
                          ? "bg-red-50 text-red-600 font-medium"
                          : "text-gray-700"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Service Areas */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Service Areas
            </label>
            <input
              type="text"
              name="serviceAreas"
              defaultValue={business?.serviceAreas || ""}
              placeholder="Enter service areas"
              className="w-full h-12 px-4 bg-white border-2 border-red-600 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm cursor-text"
            />
            <p className="mt-1 text-xs text-gray-500">E.g. City, Neighborhoods</p>
          </div>

          {/* Add Images */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Add Images
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Existing Images:</p>
                <div className="grid grid-cols-2 gap-4">
                  {existingImages.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square rounded-xl overflow-hidden border-2 border-gray-300"
                    >
                      <img
                        src={imageUrl}
                        alt={`Existing ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(index)}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Image Upload Area */}
            {imagePreviews.length === 0 && existingImages.length === 0 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-red-600 rounded-xl flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700">Add New Image</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square rounded-xl overflow-hidden border-2 border-red-600"
                    >
                      <img
                        src={preview.url}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add More Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-12 border-2 border-dashed border-red-600 rounded-xl flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-2">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Add More Images
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 text-base rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : isEditing ? "Update Business" : "Add New Business"}
        </Button>
      </div>
    </form>
  );
}