import type { MedicalData } from "~/interfaces/claim";

interface MedicalDetailsFormProps {
    medicalData: MedicalData;
    handleMedicalChange: (field: keyof MedicalData, value: File | null) => void;
    handleNext: () => void;
    setCurrentStep: (step: number | ((prev: number) => number)) => void;
}

export default function MedicalDetailsForm({
    medicalData,
    handleMedicalChange,
    handleNext,
    setCurrentStep
}: MedicalDetailsFormProps) {
    return (
        <div className="space-y-6">
            <div className="grid gap-2">
                <label htmlFor="medicalAbstract" className="text-sm font-medium leading-none">Complete Medical Abstract</label>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => document.getElementById('medicalAbstract')?.click()}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Upload Medical Abstract
                    </button>
                    <input
                        id="medicalAbstract"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            handleMedicalChange('medicalAbstract', file);
                        }}
                    />
                    {medicalData.medicalAbstract && (
                        <span className="text-sm text-green-600">
                            ✓ File selected: {medicalData.medicalAbstract.name}
                        </span>
                    )}
                </div>
            </div>

            <div className="grid gap-2">
                <label htmlFor="finalDiagnosis" className="text-sm font-medium leading-none">Final Diagnosis</label>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => document.getElementById('finalDiagnosis')?.click()}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Upload Final Diagnosis
                    </button>
                    <input
                        id="finalDiagnosis"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            handleMedicalChange('finalDiagnosis', file);
                        }}
                    />
                    {medicalData.finalDiagnosis && (
                        <span className="text-sm text-green-600">
                            ✓ File selected: {medicalData.finalDiagnosis.name}
                        </span>
                    )}
                </div>
            </div>

            <div className="grid gap-2">
                <label htmlFor="testResults" className="text-sm font-medium leading-none">Test Results</label>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => document.getElementById('testResults')?.click()}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Upload Test Results
                    </button>
                    <input
                        id="testResults"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            handleMedicalChange('testResults', file);
                        }}
                    />
                    {medicalData.testResults && (
                        <span className="text-sm text-green-600">
                            ✓ File selected: {medicalData.testResults.name}
                        </span>
                    )}
                </div>
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
