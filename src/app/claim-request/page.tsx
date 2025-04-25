"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { type TRPCClientErrorLike } from "@trpc/client";
import { type AppRouter } from "~/server/api/root";
import PatientDetailsForm from "./_components/patientDetailsForm";
import type { PatientData, AdmissionData, MedicalData, InsuranceData, BillingData } from "~/interfaces/claim";
import { steps, genderOptions, governmentIdTypes, patientTypeOptions, hmoProviders, relationshipOptions } from "~/lib/enum";
import AdmissionDetailsForm from "./_components/admissionDetailsForm";
import MedicalDetailsForm from "./_components/medicalDetailsForm";
import InsurancePolicyForm from "./_components/insurancePolicyForm";
import BillingDetailsForm from "./_components/billingDetailsForm";



export default function ClaimRequest() {
  const [currentStep, setCurrentStep] = useState(0);
  const [billingData, setBillingData] = useState<BillingData>({
    soa: null,
    billingAmount: 0
  });
  const [patientData, setPatientData] = useState<PatientData>({
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
    governmentIdType: "",
    governmentIdNumber: "",
    governmentIdFile: null
  });

  const [admissionData, setAdmissionData] = useState<AdmissionData>({
    admissionDateTime: "",
    dischargeDateTime: "",
    patientType: ""
  });

  const [medicalData, setMedicalData] = useState<MedicalData>({
    medicalAbstract: null,
    finalDiagnosis: null,
    testResults: null
  });

  const [insuranceData, setInsuranceData] = useState<InsuranceData>({
    policyNumber: "",
    memberName: "",
    relationship: "",
    hmoProvider: "",
    otherHmoProvider: "",
    loa: null
  });

  const handleInputChange = (field: keyof PatientData, value: string | File | null) => {
    console.log(field, value);
    setPatientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdmissionChange = (field: keyof AdmissionData, value: string) => {
    setAdmissionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMedicalChange = (field: keyof MedicalData, value: File | null) => {
    setMedicalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInsuranceChange = (field: keyof InsuranceData, value: string | File | null) => {
    setInsuranceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBillingChange = (field: keyof BillingData, value: File | null | string) => {
    setBillingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const utils = api.useUtils();

  const { mutate: submitClaimRequest } = api.claimRequest.create.useMutation({
    onSuccess: async () => {
      // Reset form and go to success page/state
      await utils.claimRequest.invalidate();

      // setCurrentStep(0);
      // setPatientData({
      //   firstName: "",
      //   lastName: "",
      //   email: "",
      //   contactNumber: "",
      //   governmentIdType: "",
      //   governmentIdNumber: "",
      //   governmentIdFile: null,
      //   dateOfBirth: "",
      //   gender: ""
      // });
      // setAdmissionData({
      //   patientType: "",
      //   admissionDateTime: "",
      //   dischargeDateTime: ""
      // });
      // setMedicalData({
      //   medicalAbstract: null,
      //   finalDiagnosis: null,
      //   testResults: null
      // });
      // setInsuranceData({
      //   policyNumber: "",
      //   memberName: "",
      //   relationship: "",
      //   hmoProvider: "",
      //   otherHmoProvider: "",
      //   loa: null
      // });
      // setBillingData({
      //   soa: null,
      //   billingAmount: 0
      // });

      alert("Claim request submitted successfully");
    },
    onError: (error: TRPCClientErrorLike<AppRouter>) => {
      console.error('Error submitting claim request:', error.message);
      alert("Failed to submit claim request. Please try again.");
    }
  });

  const handleSubmit = () => {
    submitClaimRequest({
      patientData: {
        ...patientData
      },
      admissionData: {
        ...admissionData
      },
      medicalData: {
        medicalAbstract: medicalData.medicalAbstract?.name,
        finalDiagnosis: medicalData.finalDiagnosis?.name,
        testResults: medicalData.testResults?.name
      },
      insuranceData: {
        ...insuranceData,
        loa: insuranceData.loa?.name
      },
      billingData: {
        soa: billingData.soa?.name,
        claimAmount: billingData.billingAmount.toString()
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full bg-white rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          {/* Left side - Tracking */}
          <div className="p-6 border-r">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">Steps</h2>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-md transition-colors ${index === currentStep
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted hover:bg-muted/80"
                    }`}
                >
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium ${index === currentStep
                      ? "bg-background text-primary shadow-sm"
                      : "bg-background text-foreground/60"
                      }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium leading-none">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">{steps[currentStep]}</h2>
            {currentStep === 0 && (
              <PatientDetailsForm
                patientData={patientData}
                handleInputChange={handleInputChange}
                handleNext={handleNext}
                genderOptions={genderOptions}
                governmentIdTypes={governmentIdTypes}
              />
            )}
            {currentStep === 1 && (
              <AdmissionDetailsForm
                admissionData={admissionData}
                handleAdmissionChange={handleAdmissionChange}
                handleNext={handleNext}
                patientTypeOptions={patientTypeOptions}
                setCurrentStep={setCurrentStep}
              />
            )}

            {currentStep === 2 && (
              <MedicalDetailsForm
                medicalData={medicalData}
                handleMedicalChange={handleMedicalChange}
                handleNext={handleNext}
                setCurrentStep={setCurrentStep}
              />
            )}

            {currentStep === 3 && (
              <InsurancePolicyForm
                insuranceData={insuranceData}
                patientData={patientData}
                handleInsuranceChange={handleInsuranceChange}
                handleNext={handleNext}
                relationshipOptions={relationshipOptions}
                hmoProviders={hmoProviders}
                setCurrentStep={setCurrentStep}
              />
            )}
            {
              currentStep === 4 && (
                <BillingDetailsForm
                  billingData={billingData}
                  handleBillingChange={handleBillingChange}
                  setCurrentStep={setCurrentStep}
                  handleSubmit={handleSubmit}
                />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
