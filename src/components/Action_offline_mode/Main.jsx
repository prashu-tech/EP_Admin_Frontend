import React from 'react'

function Main() {
return (
  <>
    {/* Main Options */}
 <div className="flex justify-between mb-4">
<button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded">
  TEST PREVIEW
</button>
<button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
  OFFLINE MODE
</button>
<button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded">
  SCHEDULE TEST
</button>
</div>
</>
  )
}

export default Main ;

