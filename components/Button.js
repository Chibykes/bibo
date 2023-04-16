export default function Button ({ label, className, type,  ...props }) {
    return (
        <div className="w-full flex flex-col justify-start items-center">
            <div className='w-full flex justify-start items-center border bg-app-main border-app-main text-white cursor-pointer'>
                <input 
                    className={`block w-full border-none outline-none focus:outline-none focus:border-none py-4 px-2 font-bold`}
                    type="submit"
                />
            </div>
        </div>
    );
}