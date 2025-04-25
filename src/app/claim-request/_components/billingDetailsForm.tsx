import type { BillingData } from "~/interfaces/claim";

interface BillingDetailsFormProps {
    billingData: BillingData;
    handleBillingChange: (field: keyof BillingData, value: File | null | string) => void;
    setCurrentStep: (step: number | ((prev: number) => number)) => void;
    handleSubmit: () => void;
}

export default function BillingDetailsForm({
    billingData,
    handleBillingChange,
    setCurrentStep,
    handleSubmit
}: BillingDetailsFormProps) {
    return (
        <div className="space-y-6">
            <div className="grid gap-2">
                <label htmlFor="billingAmount" className="text-sm font-medium leading-none">Billing Amount</label>
                <input
                    id="billingAmount"
                    type="number"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Enter billing amount"
                    value={billingData.billingAmount}
                    onChange={(e) => handleBillingChange('billingAmount', e.target.value)}
                />
            </div>

            <div className="grid gap-2">
                <label htmlFor="soa" className="text-sm font-medium leading-none">Official Hospital Statement of Account (SOA)</label>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => document.getElementById('soa')?.click()}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                        Upload SOA
                    </button>
                    <input
                        id="soa"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            handleBillingChange('soa', file);
                        }}
                    />
                    {billingData.soa && (
                        <span className="text-sm text-green-600">
                            ✓ File selected: {billingData.soa.name}
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
                    onClick={handleSubmit}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-1/2 bg-blue-500 hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
