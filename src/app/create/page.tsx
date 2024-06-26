"use client";
import React, { useState } from "react";
import axios from "axios";
import Input from "../components/ui/Input";
import SelectField from "../components/ui/SelectField";
import Label from "../components/ui/Label";
import toast, { Toaster } from "react-hot-toast";
const CreateHouseholdMember = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    ethnicityCode: "",
    sexCode: "",
    dateOfBirth: "",
    respondent: true,
    relationshipCode: "",
    maritalStatusCode: "",
    fathersName: "",
    mothersName: "",
    schoolAttendance: true,
    educationLevel: "",
    employmentStatus: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/household", formData);
      console.log("Response:", response.data);
      setFormData(initialFormData);
      toast.success("Successfully created!");
    } catch (error) {
      toast.error("An error occured!");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    console.log(value);

    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(value);

    setFormData({ ...formData, [name]: value === "true" });
  };

  const {
    firstName,
    lastName,
    phoneNumber,
    ethnicityCode,
    sexCode,
    dateOfBirth,
    respondent,
    relationshipCode,
    maritalStatusCode,
    fathersName,
    mothersName,
    schoolAttendance,
    educationLevel,
    employmentStatus,
  } = formData;

  const isDisabled =
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !ethnicityCode ||
    !sexCode ||
    !dateOfBirth ||
    !respondent ||
    !relationshipCode ||
    !maritalStatusCode ||
    !fathersName ||
    !mothersName ||
    !schoolAttendance ||
    !educationLevel ||
    !employmentStatus;

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-semibold title-font mb-4 text-gray-900">
            New Household Member
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            You can now add new household members to the list
          </p>
        </div>
        <div className="w-2/2 lg:w-2/2 md:w-2/3 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-2/3 md:w-1/3">
                <div className="relative">
                  <Input
                    id="firstName"
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="p-2 w-2/3 md:w-1/3">
                <div className="relative">
                  <Input
                    id="lastName"
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="p-2 w-2/3 md:w-1/3">
                <div className="relative">
                  <Input
                    id="phoneNumber"
                    label="Phone Number"
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="p-2 w-2/3 md:w-1/3">
                <div className="relative">
                  <SelectField
                    label="Ethnicity Code"
                    name="ethnicityCode"
                    value={ethnicityCode}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Please select an option" },
                      { value: "IGBO", label: "Igbo" },
                      { value: "YORUBA", label: "Yoruba" },
                      { value: "HAUSA", label: "Hausa" },
                    ]}
                  />
                </div>
              </div>
              <div className="p-2 w-2/3 md:w-1/3">
                <div className="relative">
                  <SelectField
                    label="Sex"
                    name="sexCode"
                    value={sexCode}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Please select an option" },
                      { value: "MALE", label: "Male" },
                      { value: "FEMALE", label: "Female" },
                    ]}
                  />
                </div>
              </div>
              <div className="p-2 w-2/3 md:w-1/3">
                <div className="relative">
                  <Input
                    id="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    pattern="\d{2}-\d{2}-\d{4}"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="p-2 w-2/3 md:w-1/3">
                <Label label="Repondent" />
                <div className="relative pt-2 space-x-1">
                  <input
                    id="respondent"
                    type="radio"
                    name="respondent"
                    value="true"
                    checked={respondent}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="respondentTrue" className="mr-6">
                    True
                  </label>
                  <input
                    id="respondent"
                    type="radio"
                    name="respondent"
                    value="false"
                    checked={!respondent}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="respondentFalse">False</label>
                </div>
              </div>
              <div className="p-2 w-2/3 md:w-1/3">
                <div className="relative">
                  <SelectField
                    label="Relationship to HH"
                    name="relationshipCode"
                    value={relationshipCode}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Please select an option" },
                      { value: "HUSBAND", label: "Husband" },
                      { value: "WIFE", label: "Wife" },
                      { value: "CHILD", label: "Child" },
                      { value: "EXTENDED_FAMILY", label: "Extended Family" },
                    ]}
                  />
                </div>
              </div>
              <div className="p-2 w-2/3 md:w-1/3">
                <div className="relative">
                  <SelectField
                    label="Marital Status"
                    name="maritalStatusCode"
                    value={maritalStatusCode}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Please select an option" },
                      { value: "SINGLE", label: "Single" },
                      { value: "MARRIED", label: "Married" },
                      { value: "DIVORCED", label: "Divorced" },
                    ]}
                  />
                </div>
              </div>
              <div className="p-2 w-2/3 md:w-1/3">
                <div className="relative">
                  <Input
                    id="fathersName"
                    label="Father's Name"
                    type="text"
                    name="fathersName"
                    value={fathersName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="p-2 w-2/3 md:w-1/3">
                <div className="relative">
                  <Input
                    id="mothersName"
                    label="Mother's Name"
                    type="text"
                    name="mothersName"
                    value={mothersName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="p-2 w-2/3 md:w-1/3">
                <Label label="School Attendance" />
                <div className="relative pt-2 space-x-1">
                  <input
                    id="schoolAttendance"
                    type="radio"
                    name="schoolAttendance"
                    value="true"
                    checked={schoolAttendance}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="schoolAttendanceTrue" className="mr-6">
                    Present
                  </label>
                  <input
                    id="schoolAttendance"
                    type="radio"
                    name="schoolAttendance"
                    value="false"
                    checked={!schoolAttendance}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="schoolAttendanceFalse">Absent</label>
                </div>
              </div>
              <div className="p-2 w-2/3 md:w-1/3">
                <div className="relative">
                  <SelectField
                    label="Highest Education"
                    name="educationLevel"
                    value={educationLevel}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Please select an option" },
                      { value: "PRIMARY", label: "Primary" },
                      { value: "SECONDARY", label: "Secondary" },
                      { value: "TERTIARY", label: "Tertiary" },
                    ]}
                  />
                </div>
              </div>
              <div className="p-2 w-2/3 md:w-1/3">
                <div className="relative">
                  <SelectField
                    label="Employment Status"
                    name="employmentStatus"
                    value={employmentStatus}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Please select an option" },
                      { value: "STUDENT", label: "Student" },
                      { value: "EMPLOYED", label: "Employed" },
                      { value: "SELF_EMPLOYED", label: "Self Employed" },
                      { value: "UNEMPLOYED", label: "Unemployed" },
                    ]}
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  type="submit"
                  disabled={isDisabled || isLoading}
                  className={`bg-gray-900 text-white focus:ring-2 focus:ring-offset-2 focus:ring-black rounded-xl py-2 px-4 md:py-3 md:px-6 text-xs md:text-sm duration-200 font-medium
                 hover:-translate-y-0.5 active:translate-y-0 shadow-gray-100 ${
                   isDisabled || isLoading
                     ? "opacity-50 cursor-not-allowed"
                     : "hover:shadow-gray-300  hover:bg-gray-700"
                 }`}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
                <Toaster />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateHouseholdMember;
