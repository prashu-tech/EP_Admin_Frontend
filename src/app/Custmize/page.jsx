
import Sidebar from "@/components/adminsidebar/adminsidebar";
import Customized from "@/components/Custmize test/custmize"


function page() {
  return (
    <div className="min-h-screen md:flex bg-white">
    <div className="md:hidden block">
      < MobileNavbar />
    </div>  

      {/* Sidebar Section */}
      <div className="md:w-1/6 bg-[#007AFF]">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="w-full md:w-5/6 md:flex-1 h-screen bg-white">
        {/* Navigation Bar */}
        <Nav />

      

          

        
      </div>

      
    </div>
  );
};

export default Page;
