import type { PatientData } from '~/interfaces/claim';

interface PatientDetailsFormProps {
    patientData: PatientData;
    handleInputChange: (field: keyof PatientData, value: string | File | null) => void;
    handleNext: () => void;
    genderOptions: { value: string; name: string; }[];
    governmentIdTypes: { value: string; name: string; }[];
}

export default function PatientDetailsForm({
    patientData,
    handleInputChange,
    handleNext,
    genderOptions,
    governmentIdTypes
}: PatientDetailsFormProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <label htmlFor="firstName" className="text-sm font-medium leading-none">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Enter first name"
                        value={patientData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="lastName" className="text-sm font-medium leading-none">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Enter last name"
                        value={patientData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-2">
                <label htmlFor="middleName" className="text-sm font-medium leading-none">Middle Name (Optional)</label>
                <input
                    id="middleName"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Enter middle name"
                    value={patientData.middleName}
                    onChange={(e) => handleInputChange('middleName', e.target.value)}
                />
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium leading-none">Date of Birth</label>
                <input
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={patientData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium leading-none">Gender</label>
                <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={patientData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                    <option value="">Select gender</option>
                    {genderOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid gap-2">
                <label htmlFor="address" className="text-sm font-medium leading-none">Address</label>
                <input
                    id="address"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Enter address"
                    value={patientData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Enter email"
                        value={patientData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="contactNumber" className="text-sm font-medium leading-none">Contact Number</label>
                    <input
                        id="contactNumber"
                        type="tel"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Enter contact number"
                        value={patientData.contactNumber}
                        onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium leading-none">Government ID Type</label>
                <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={patientData.governmentIdType}
                    onChange={(e) => handleInputChange('governmentIdType', e.target.value)}
                >
                    <option value="">Select ID type</option>
                    {governmentIdTypes.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid gap-2">
                <label htmlFor="governmentIdNumber" className="text-sm font-medium leading-none">Government ID Number</label>
                <input
                    id="governmentIdNumber"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Enter ID number"
                    value={patientData.governmentIdNumber}
                    onChange={(e) => handleInputChange('governmentIdNumber', e.target.value)}
                />
            </div>

            <div className="grid gap-2">
                <label htmlFor="governmentIdFile" className="text-sm font-medium leading-none">Government ID File</label>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => document.getElementById('governmentIdFile')?.click()}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Upload Government ID
                    </button>
                    <input
                        id="governmentIdFile"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            handleInputChange('governmentIdFile', file);
                        }}
                    />
                    {patientData.governmentIdFile && (
                        <span className="text-sm text-green-600">
                            ✓ File selected: {patientData.governmentIdFile.name}
                        </span>
                    )}
                </div>
            </div>

            <button
                onClick={handleNext}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-500 hover:bg-blue-600"
            >
                Next
            </button>
        </div>
    );
}

