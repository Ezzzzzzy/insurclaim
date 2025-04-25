import type { InsuranceData } from "~/interfaces/claim";

interface InsurancePolicyFormProps {
    insuranceData: InsuranceData;
    patientData: {
        firstName: string;
        lastName: string;
    };
    handleInsuranceChange: (field: keyof InsuranceData, value: string | File | null) => void;
    handleNext: () => void;
    relationshipOptions: { value: string; name: string; }[];
    hmoProviders: { value: string; name: string; }[];
    setCurrentStep: (step: number | ((prev: number) => number)) => void;
}

export default function InsurancePolicyForm({
    insuranceData,
    patientData,
    handleInsuranceChange,
    handleNext,
    relationshipOptions,
    hmoProviders,
    setCurrentStep
}: InsurancePolicyFormProps) {
    return (
        <div className="space-y-6">
            <div className="grid gap-2">
                <label htmlFor="policyNumber" className="text-sm font-medium leading-none">Insurance Policy Number</label>
                <input
                    id="policyNumber"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Enter policy number"
                    value={insuranceData.policyNumber}
                    onChange={(e) => handleInsuranceChange('policyNumber', e.target.value)}
                />
            </div>

            <div className="grid gap-2">
                <label htmlFor="memberName" className="text-sm font-medium leading-none">Insured Member&apos;s Name</label>
                <input
                    id="memberName"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Enter member's name"
                    value={insuranceData.memberName || `${patientData.firstName} ${patientData.lastName}`}
                    onChange={(e) => handleInsuranceChange('memberName', e.target.value)}
                />
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium leading-none">Relationship to Member</label>
                <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={insuranceData.relationship}
                    onChange={(e) => handleInsuranceChange('relationship', e.target.value)}
                >
                    <option value="">Select relationship</option>
                    {relationshipOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium leading-none">HMO/Provider</label>
                <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={insuranceData.hmoProvider}
                    onChange={(e) => handleInsuranceChange('hmoProvider', e.target.value)}
                >
                    <option value="">Select HMO/Provider</option>
                    {hmoProviders.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
                {insuranceData.hmoProvider === 'other' && (
                    <input
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2"
                        placeholder="Enter other HMO/Provider"
                        value={insuranceData.otherHmoProvider}
                        onChange={(e) => handleInsuranceChange('otherHmoProvider', e.target.value)}
                    />
                )}
                <div className="grid gap-2">
                    <label htmlFor="loa" className="text-sm font-medium leading-none">Letter of Authorization (LOA)</label>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => document.getElementById('loa')?.click()}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                        >
                            Upload LOA
                        </button>
                        <input
                            id="loa"
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                handleInsuranceChange('loa', file);
                            }}
                        />
                        {insuranceData.loa && (
                            <span className="text-sm text-green-600">
                                ✓ File selected: {insuranceData.loa.name}
                            </span>
                        )}
                    </div>
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
