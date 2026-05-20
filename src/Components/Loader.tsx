const Loader = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="relative w-16 h-16">
        
        {/* Red Circle */}
        <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin"></div>

        {/* Sky Blue Circle */}
        <div className="absolute inset-2 rounded-full border-4 border-sky-400 border-b-transparent animate-spin [animation-direction:reverse]"></div>

      </div>
    </div>
  );
};

export default Loader;