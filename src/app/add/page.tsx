"use client";
import React, { useState } from "react";
import axios from "axios";
import Input from "../components/ui/Input";
import SelectField from "../components/ui/SelectField";
import Radio from "../components/ui/Radio";

const CensusForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    ethnicityCode: "IGBO",
    sexCode: "MALE",
    age: 0,
    respondent: false,
    relationshipCode: "HUSBAND",
    maritalStatus: "SINGLE",
    spouseName: "",
    fathersName: "",
    mothersName: "",
    schoolAttendance: false,
    educationLevel: "PRIMARY",
    employmentStatus: "STUDENT",
    headOfHousehold: false,
    positionInHousehold: "HEAD",
    currentPrompt: 0,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/census", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigation = (direction: number) => {
    setFormData((prevData) => ({
      ...prevData,
      currentPrompt: prevData.currentPrompt + direction,
    }));
  };

  const renderPrompt = () => {
    switch (formData.currentPrompt) {
      case 0:
        return (
          <div className="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
            <div className="max-w-md mx-auto md:max-w-sm md:w-96">
              <div className="flex flex-col text-center">
                <h1 className="text-3xl font-semibold tracking-tighter text-gray-900 mb-8">
                  New Houshold
                  <span className="text-gray-600"> Member</span>
                </h1>
              </div>
              <form>
                <div className="space-y-3">
                  <div>
                    <Input
                      label="First Name"
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Input
                      id="lastName"
                      label="Last Name"
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Input
                      id="phoneNumber"
                      label="Phone Number"
                      type="tel"
                      name="phoneNumber"
                      placeholder="070123456789"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <SelectField
                      label="Ethnicity"
                      name="ethnicityCode"
                      value={formData.ethnicityCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ethnicityCode: e.target.value,
                        })
                      }
                      options={[
                        { value: "", label: "Please select an option" },
                        { value: "IGBO", label: "Igbo" },
                        { value: "YORUBA", label: "Yoruba" },
                        { value: "HAUSA", label: "Hausa" },
                        { value: "OTHER", label: "Other" },
                      ]}
                    />
                  </div>
                  <div>
                    <SelectField
                      label="Sex"
                      name="sexCode"
                      value={formData.sexCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sexCode: e.target.value,
                        })
                      }
                      options={[
                        { value: "", label: "Please select an option" },
                        { value: "MALE", label: "Male" },
                        { value: "FEMALE", label: "Female" },
                      ]}
                    />
                  </div>
                  <div className="col-span-full flex justify-between pt-6">
                    <button
                      type="submit"
                      onClick={() => handleNavigation(-1)}
                      className="inline-flex items-center justify-center h-12 gap-3 px-5 py-3 font-medium text-white duration-200 bg-gray-900 rounded-xl hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Prev
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleNavigation(1)}
                      className="inline-flex items-center justify-center h-12 gap-3 px-5 py-3 font-medium text-white duration-200 bg-gray-900 rounded-xl hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
            <div className="max-w-md mx-auto md:max-w-sm md:w-96">
              <div className="flex flex-col text-center">
                <h1 className="text-3xl font-semibold tracking-tighter text-gray-900 mb-8">
                  New Houshold
                  <span className="text-gray-600"> Member</span>
                </h1>
              </div>
              <form>
                <div className="space-y-3">
                  <div>
                    <Input
                      id="age"
                      label="Age"
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          age: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  {formData.age < 16 && (
                    <>
                      <div>
                        <SelectField
                          label="Relationship to head of house"
                          name="relationshipCode"
                          value={formData.relationshipCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              relationshipCode: e.target.value,
                            })
                          }
                          options={[
                            {
                              value: "",
                              label: "Please select an option",
                            },
                            { value: "HUSBAND", label: "Husband" },
                            { value: "WIFE", label: "Wife" },
                            { value: "CHILD", label: "Child" },
                            {
                              value: "EXTENDED_FAMILY",
                              label: "Extended Family",
                            },
                          ]}
                        />
                      </div>
                      <div>
                        <Input
                          id="mothersName"
                          label="Mother's Name"
                          type="text"
                          name="mothersName"
                          placeholder="Mother's Name"
                          value={formData.mothersName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mothersName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Input
                          id="fathersName"
                          label="Father's Name"
                          type="text"
                          name="fathersName"
                          placeholder="Father's Name"
                          value={formData.fathersName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fathersName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </>
                  )}
                  {formData.age >= 16 && (
                    <>
                      <div>
                        <SelectField
                          label="Position in household"
                          name="positionInHousehold"
                          value={formData.positionInHousehold}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              positionInHousehold: e.target.value,
                            })
                          }
                          options={[
                            {
                              value: "",
                              label: "Please select an option",
                            },
                            { value: "HEAD", label: "Head" },
                            { value: "SPOUSE", label: "Spouse" },
                            { value: "CHILD", label: "Child" },
                            { value: "OTHER", label: "Other" },
                          ]}
                        />
                      </div>
                      <div>
                        <SelectField
                          label="Marital Status"
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              maritalStatus: e.target.value,
                            })
                          }
                          options={[
                            {
                              value: "",
                              label: "Please select an option",
                            },
                            { value: "SINGLE", label: "Single" },
                            { value: "MARRIED", label: "Married" },
                            { value: "DIVORCED", label: "Divorced" },
                          ]}
                        />
                      </div>
                      {formData.maritalStatus === "MARRIED" && (
                        <div>
                          <Input
                            id="spouseName"
                            label="Spouse Name"
                            type="text"
                            name="spouseName"
                            placeholder="Spouse Name"
                            value={formData.spouseName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                spouseName: e.target.value,
                              })
                            }
                          />
                        </div>
                      )}
                      <div>
                        <SelectField
                          label="Highest Education"
                          name="educationLevel"
                          value={formData.educationLevel}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              educationLevel: e.target.value,
                            })
                          }
                          options={[
                            {
                              value: "",
                              label: "Please select an option",
                            },
                            { value: "PRIMARY", label: "Primary" },
                            { value: "MARRIED", label: "Secondary" },
                            { value: "TERTIARY", label: "Tertiary" },
                          ]}
                        />
                      </div>
                      <div>
                        <SelectField
                          label="Employment Status"
                          name="employmentStatus"
                          value={formData.employmentStatus}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              employmentStatus: e.target.value,
                            })
                          }
                          options={[
                            {
                              value: "",
                              label: "Please select an option",
                            },
                            { value: "STUDENT", label: "Student" },
                            { value: "UNEMPLOYED", label: "Unemployed" },
                            { value: "EMPLOYED", label: "Employed" },
                            { value: "SELF_EMPLOYED", label: "Self-Employed" },
                          ]}
                        />
                      </div>
                    </>
                  )}

                  <div className="col-span-full flex justify-between pt-6">
                    <button
                      type="submit"
                      onClick={() => handleNavigation(-1)}
                      className="inline-flex items-center justify-center h-12 gap-3 px-5 py-3 font-medium text-white duration-200 bg-gray-900 rounded-xl hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Prev
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleNavigation(1)}
                      className="inline-flex items-center justify-center h-12 gap-3 px-5 py-3 font-medium text-white duration-200 bg-gray-900 rounded-xl hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
            <div className="max-w-md mx-auto md:max-w-sm md:w-96">
              <div className="flex flex-col text-center">
                <h1 className="text-3xl font-semibold tracking-tighter text-gray-900 mb-8">
                  New Houshold
                  <span className="text-gray-600"> Member</span>
                </h1>
              </div>
              <form>
                <div className="space-y-3">
                  <div>
                    <Radio 
                    id="headOfHousehold"
                    label="Head of household"
                    name="headOfHousehold"
                    value={formData.headOfHousehold}
                    >
                  </div>
                  <div>
                    <Input
                      id="lastName"
                      label="Last Name"
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Input
                      id="phoneNumber"
                      label="Phone Number"
                      type="tel"
                      name="phoneNumber"
                      placeholder="070123456789"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <SelectField
                      label="Ethnicity"
                      name="ethnicityCode"
                      value={formData.ethnicityCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ethnicityCode: e.target.value,
                        })
                      }
                      options={[
                        { value: "", label: "Please select an option" },
                        { value: "IGBO", label: "Igbo" },
                        { value: "YORUBA", label: "Yoruba" },
                        { value: "HAUSA", label: "Hausa" },
                        { value: "OTHER", label: "Other" },
                      ]}
                    />
                  </div>
                  <div>
                    <SelectField
                      label="Sex"
                      name="sexCode"
                      value={formData.sexCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sexCode: e.target.value,
                        })
                      }
                      options={[
                        { value: "", label: "Please select an option" },
                        { value: "MALE", label: "Male" },
                        { value: "FEMALE", label: "Female" },
                      ]}
                    />
                  </div>
                  <div className="col-span-full flex justify-between pt-6">
                    <button
                      type="submit"
                      onClick={() => handleNavigation(-1)}
                      className="inline-flex items-center justify-center h-12 gap-3 px-5 py-3 font-medium text-white duration-200 bg-gray-900 rounded-xl hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Prev
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleNavigation(1)}
                      className="inline-flex items-center justify-center h-12 gap-3 px-5 py-3 font-medium text-white duration-200 bg-gray-900 rounded-xl hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          // <div>
          //   <label htmlFor="headOfHousehold">Head of Household</label>
          //   <select
          //     id="headOfHousehold"
          //     value={formData.headOfHousehold}
          //     onChange={(e) =>
          //       setFormData({
          //         ...formData,
          //         headOfHousehold: e.target.value === "true",
          //       })
          //     }
          //   >
          //     <option value="true">Yes</option>
          //     <option value="false">No</option>
          //   </select>
          //   {!formData.headOfHousehold && (
          //     <>
          //       <label htmlFor="respondentFirstName">
          //         Respondent First Name
          //       </label>
          //       <input
          //         type="text"
          //         id="respondentFirstName"
          //         value={formData.firstName}
          //         onChange={(e) =>
          //           setFormData({ ...formData, firstName: e.target.value })
          //         }
          //       />
          //       <label htmlFor="respondentLastName">Respondent Last Name</label>
          //       <input
          //         type="text"
          //         id="respondentLastName"
          //         value={formData.lastName}
          //         onChange={(e) =>
          //           setFormData({ ...formData, lastName: e.target.value })
          //         }
          //       />
          //       <label htmlFor="respondentPhoneNumber">
          //         Respondent Phone Number
          //       </label>
          //       <input
          //         type="number"
          //         id="respondentPhoneNumber"
          //         value={formData.phoneNumber}
          //         onChange={(e) =>
          //           setFormData({
          //             ...formData,
          //             phoneNumber: parseInt(e.target.value),
          //           })
          //         }
          //       />
          //       <label htmlFor="respondentRelationshipCode">
          //         Respondent Relationship to Head of House
          //       </label>
          //       <select
          //         id="respondentRelationshipCode"
          //         value={formData.relationshipCode}
          //         onChange={(e) =>
          //           setFormData({
          //             ...formData,
          //             relationshipCode: e.target.value,
          //           })
          //         }
          //       >
          //         <option value="HUSBAND">Husband</option>
          //         <option value="WIFE">Wife</option>
          //         <option value="CHILD">Child</option>
          //         <option value="EXTENDED_FAMILY">Extended Family</option>
          //       </select>
          //       <label htmlFor="respondentPositionInHousehold">
          //         Respondent Position in Household
          //       </label>
          //       <select
          //         id="respondentPositionInHousehold"
          //         value={formData.positionInHousehold}
          //         onChange={(e) =>
          //           setFormData({
          //             ...formData,
          //             positionInHousehold: e.target.value,
          //           })
          //         }
          //       >
          //         <option value="HEAD">Head</option>
          //         <option value="SPOUSE">Spouse</option>
          //         <option value="CHILD">Child</option>
          //         <option value="OTHER">Other</option>
          //       </select>
          //     </>
          //   )}
          //   {formData.headOfHousehold && (
          //     <>
          //       <label htmlFor="headOfHouseholdFirstName">
          //         Head of Household First Name
          //       </label>
          //       <input
          //         type="text"
          //         id="headOfHouseholdFirstName"
          //         value={formData.firstName}
          //         onChange={(e) =>
          //           setFormData({ ...formData, firstName: e.target.value })
          //         }
          //       />
          //       <label htmlFor="headOfHouseholdLastName">
          //         Head of Household Last Name
          //       </label>
          //       <input
          //         type="text"
          //         id="headOfHouseholdLastName"
          //         value={formData.lastName}
          //         onChange={(e) =>
          //           setFormData({ ...formData, lastName: e.target.value })
          //         }
          //       />
          //     </>
          //   )}
          // </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderPrompt()}
      <button type="button" onClick={() => handleNavigation(-1)}>
        Previous
      </button>
      <button type="button" onClick={() => handleNavigation(1)}>
        Next
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CensusForm;
