const Spinner = (): JSX.Element => {
  return (
    <div className="flex h-screen items-center justify-center bg-transparent">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-cyan-700 border-t-transparent"></div>
    </div>
  );
};

export default Spinner;
