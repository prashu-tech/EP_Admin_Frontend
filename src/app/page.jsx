import React from 'react'
import Test from '@/components/pracrtice test/test'

function Page() {
  return (
    <div className="flex-1 ml-64">
      {/* Navbar - Fixed */}
      <div className="fixed top-0 left-64 w-[calc(100%-16rem)] z-20"></div>
      {/* Removed Adminnav and Adminsidebar components */}
      
      <div className="flex">
        {/* Sidebar - Fixed */}
        {/* Removed Adminsidebar */}
        <Test />
      </div>
    </div>
  )
}

export default Page
