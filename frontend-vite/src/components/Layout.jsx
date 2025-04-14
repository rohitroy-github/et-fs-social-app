
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-4">
      {/* Adding an overlay to make content more readable */}
      <div className="absolute top-0 left-0 right-0 bottom-0 0 z-0"></div>
      
      {/* Main content */}
      <div className="relative w-full max-w-screen">{children}</div>
    
    </div>
  );
};

export default Layout;
