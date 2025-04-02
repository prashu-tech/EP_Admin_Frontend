
    import React from 'react'
    
    function Action_button() {
      return (
        <div className="flex justify-between mb-4">
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
          GENERATE QUESTION PAPER
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
          GENERATE ANSWER KEY
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
          GENERATE OMR
        </button>
      </div>
      )
    }
    
    export default Action_button;
        