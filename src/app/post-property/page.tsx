"use client";

import React, { useState, useEffect } from "react";
import CtaSection from "@/app/components/sections/CtaSection";
import SectionContainer from "@/app/components/ui/SectionContainer";
import ButtonText from "@/app/components/ui/ButtonText";
import CustomDropdown from "@/app/components/ui/CustomDropdown";
import Download from "@assets/icons/download.svg";

export default function PostPropertyPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    address: "",

    listingTitle: "",
    propertyType: "",
    propertyTypeLabel: "",
    listingType: "",
    listingTypeLabel: "",
    price: "",
    landSqft: "",
    constructionSqft: "",
    bedrooms: "",
    bedroomsLabel: "",
    bathrooms: "",
    bathroomsLabel: "",
    parkingLots: "",
    kitchen: "",
    description: "",

    country: "",
    cityLocation: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    zipCode: "",

    images: [] as File[],
  });

  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);
  const [isListingTypeOpen, setIsListingTypeOpen] = useState(false);

  const propertyTypes = [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "condo", label: "Condo" },
    { value: "townhouse", label: "Townhouse" },
    { value: "villa", label: "Villa" },
    { value: "studio", label: "Studio" },
    { value: "penthouse", label: "Penthouse" },
    { value: "duplex", label: "Duplex" },
  ];

  const listingTypes = [
    { value: "sale", label: "For Sale" },
    { value: "rent", label: "For Rent" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropdownSelect = (
    field: string,
    value: string,
    label: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      [`${field}Label`]: label,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Property data:", formData);
  };

  useEffect(() => {
    return () => {
      formData.images.forEach((file) => {
        URL.revokeObjectURL(URL.createObjectURL(file));
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <SectionContainer>
          <div className="text-center">
            <h1 className="text-[40px] md:text-[80px] md:w-[600px] w-[300px] mx-auto text-dark-[#191A23] md:leading-[80px] leading-[40px] tracking-[-0.02em] font-bold font-syne">
              Post a property for sale or rent
            </h1>
          </div>
        </SectionContainer>

        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl md:p-8 p-6 border border-gray-200 space-y-12"
            >
              <div>
                <div className="mb-[32px]">
                  <h2 className="md:text-[24px] text-[18px] font-bold text-dark-100 mb-[8px] font-syne">
                    Client Details
                  </h2>
                  <p className="text-gray-80 font-hanken font-light text-[16px]">
                    Amet minim mollit non deserunt ullamco
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  <div>
                    <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John D"
                      className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-[32px]">
                  <h2 className="md:text-[24px] text-[18px] font-bold text-dark-100 mb-[8px] font-syne">
                    Property Information
                  </h2>
                  <p className="text-gray-80 font-hanken font-light text-[18px]">
                    Amet minim mollit non deserunt ullamcol
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                      Listing Title
                    </label>
                    <input
                      type="text"
                      name="listingTitle"
                      value={formData.listingTitle}
                      onChange={handleInputChange}
                      placeholder="Listing Title"
                      className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                    <div>
                      <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                        Property Type
                      </label>
                      <CustomDropdown
                        isOpen={isPropertyTypeOpen}
                        setIsOpen={setIsPropertyTypeOpen}
                        selectedValue={formData.propertyType}
                        selectedLabel={formData.propertyTypeLabel}
                        onSelect={(value, label) =>
                          handleDropdownSelect("propertyType", value, label)
                        }
                        options={propertyTypes}
                        placeholder="Property Type"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                        Listing Type
                      </label>
                      <CustomDropdown
                        isOpen={isListingTypeOpen}
                        setIsOpen={setIsListingTypeOpen}
                        selectedValue={formData.listingType}
                        selectedLabel={formData.listingTypeLabel}
                        onSelect={(value, label) =>
                          handleDropdownSelect("listingType", value, label)
                        }
                        options={listingTypes}
                        placeholder="Listing Type"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dark-100 mb-2 font-hanken">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 md:gap-[24px] gap-[12px]">
                    <div>
                      <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                        Land sqft.
                      </label>
                      <input
                        type="number"
                        name="landSqft"
                        value={formData.landSqft}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                        Construction sqft.
                      </label>
                      <input
                        type="number"
                        name="constructionSqft"
                        value={formData.constructionSqft}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                        Bedrooms
                      </label>
                      <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                        Bathroom
                      </label>
                      <input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                        Parking Lots
                      </label>
                      <input
                        type="number"
                        name="parkingLots"
                        value={formData.parkingLots}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                        Kitchen
                      </label>
                      <input
                        type="number"
                        name="kitchen"
                        value={formData.kitchen}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                      className="w-full h-[100px] px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                      required
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <label className="block text-sm font-semibold text-dark-100 mb-[8px] font-hanken">
                    Image
                  </label>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-[15px] p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-row items-center justify-center gap-[12px] cursor-pointer"
                  >
                    <Download className="size-[24px] text-gray-400" />
                    <p className="text-[#B7B8C1] font-hanken font-regular text-[16px]">
                      Upload Image
                    </p>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-dark-100 mb-3 font-hanken">
                      Uploaded Images ({formData.images.length})
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {formData.images.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-[15px] overflow-hidden bg-gray-100 border border-gray-200">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = formData.images.filter(
                                (_, i) => i !== index
                              );
                              setFormData((prev) => ({
                                ...prev,
                                images: newImages,
                              }));
                            }}
                            className="absolute top-2 right-2 size-[24px] bg-[#D6D7E0] text-black px-[6px] leading-[24px] rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          >
                            ×
                          </button>
                          <div className="mt-2">
                            <p className="text-xs text-gray-600 truncate font-hanken">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-400 font-hanken">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full h-px bg-[#D6D7E0]"></div>

              <div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                    <div>
                      <label className="block text-sm font-semibold text-dark-100 mb-2 font-hanken">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Country"
                        className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-dark-100 mb-2 font-hanken">
                        City
                      </label>
                      <input
                        type="text"
                        name="cityLocation"
                        value={formData.cityLocation}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dark-100 mb-2 font-hanken">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      placeholder="Address Line 1"
                      className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dark-100 mb-2 font-hanken">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      placeholder="Address Line 2"
                      className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:gap-[24px] gap-[12px]">
                    <div>
                      <label className="block text-sm font-semibold text-dark-100 mb-2 font-hanken">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-dark-100 mb-2 font-hanken">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="ZIP Code"
                        className="w-full px-4 py-3 border border-gray-200 rounded-[15px] focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <ButtonText variant="primary" className="w-full">
                Post Property
              </ButtonText>
            </form>
          </div>
        </SectionContainer>

        <CtaSection />
      </main>
    </div>
  );
}
