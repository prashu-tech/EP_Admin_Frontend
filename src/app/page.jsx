

import Adminsidebar from '@/components/adminsidebar/adminsidebar'
import Test from '@/components/pracrtice test/test'
import React from 'react'

function page() {
  return (
  
      <div className="flex-1 ml-64">
        {/* Navbar - Fixed */}
        <div className="fixed top-0 left-64 w-[calc(100%-16rem)] z-20"></div>
      <Adminnav/>
          
      <Adminsidebar/> <div className="flex">
      {/* Sidebar - Fixed */}
      <div className="fixed left-0 top-0 h-full w-64 z-10">
        <Adminsidebar />
      </div>
      <Test/>
    </div>
    </div>
  )
}

export default page


