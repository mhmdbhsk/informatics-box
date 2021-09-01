const CircularLoading = () => {
  return (
    <div className='flex space-x-4'>
      <div
        style={{ borderTopColor: 'transparent' }}
        className='w-6 h-6 border-2 border-black border-solid rounded-full animate-spin'
      />
      <span>Fetching Data...</span>
    </div>
  );
};

export default CircularLoading;
