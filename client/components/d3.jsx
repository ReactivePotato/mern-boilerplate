import React from 'react'
import { scaleLinear } from 'd3-scale'

const D3 = () => {
  const scaleColor = scaleLinear().domain([0, 50]).range(['red', 'blue', 'green'])
  return (
    <div className="flex-col">
      {new Array(50).fill(0).map((it, index) => {
        return (
          <div key={index} style={{ backgroundColor: scaleColor(index * 1), color: 'white' }}>
            {index * 1}
          </div>
        )
      })}
    </div>
  )
}

export default D3
