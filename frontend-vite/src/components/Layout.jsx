// src/components/Layout.jsx
const Layout = ({ children }) => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]">
        {children}
      </div>
    );
  };
  
  export default Layout;
  