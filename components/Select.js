export default function Select ({ label, options, className, type, required,  ...props }) {
    return (
        <div className="w-full flex flex-col justify-start items-center">
            {label && <label className="flex items-center w-full pb-1">
                {label}
                {required && <span className="text-red-500 pl-2">*</span>}
            </label>}
            <div className='w-full flex justify-start items-center border border-neutral-500'>
                <select 
                    className={`block w-full border-none outline-none focus:outline-none focus:border-none py-3 px-2`}
                    type={type || "text"}
                    required={required || ""}
                    {...props}
                >
                    <option value="">Choose option</option>
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>
        </div>
    );
}