import type { AdmissionData } from "~/interfaces/claim";

interface AdmissionDetailsFormProps {
    admissionData: {
        patientType: string;
        admissionDateTime: string;
        dischargeDateTime: string;
    };
    handleAdmissionChange: (field: keyof AdmissionData, value: string) => void;
    handleNext: () => void;
    patientTypeOptions: { name: string; value: string; }[];
    setCurrentStep: (step: number | ((prev: number) => number)) => void;
}

export default function AdmissionDetailsForm({
    admissionData,
    handleAdmissionChange,
    handleNext,
    patientTypeOptions,
    setCurrentStep
}: AdmissionDetailsFormProps) {
    return (
        <div className="space-y-6">
            <div className="grid gap-2">
                <label className="text-sm font-medium leading-none">Type of Patient</label>
                <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={admissionData.patientType}
                    onChange={(e) => handleAdmissionChange('patientType', e.target.value)}
                >
                    <option value="">Select patient type</option>
                    {patientTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium leading-none">Admission Date & Time</label>
                <input
                    type="datetime-local"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={admissionData.admissionDateTime}
                    onChange={(e) => handleAdmissionChange('admissionDateTime', e.target.value)}
                />
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium leading-none">Discharge Date & Time</label>
                <input
                    type="datetime-local"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={admissionData.dischargeDateTime}
                    onChange={(e) => handleAdmissionChange('dischargeDateTime', e.target.value)}
                />
            </div>

            <div className="flex justify-between gap-4">
                <button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-1/2"
                >
                    Back
                </button>
                <button
                    onClick={handleNext}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-1/2 bg-blue-500 hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
