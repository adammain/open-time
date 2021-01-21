import React from 'react'
import OTTrip from '../OTTrip/OTTrip'

const OTTrips = [
  {
    dep: 'DEN',
    arr: 'SLC',
    depTime: '11:59',
    arrTime: '13:44'
  },
  {
    dep: 'DEN',
    arr: 'SLC',
    depTime: '11:59',
    arrTime: '13:44'
  },
  {
    dep: 'DEN',
    arr: 'SLC',
    depTime: '11:59',
    arrTime: '13:44'
  },
  {
    dep: 'DEN',
    arr: 'SLC',
    depTime: '11:59',
    arrTime: '13:44'
  },
]

function OTFeed() {
  return (
    <div className='OTFeed'>
      <div className='OTFeed__wrapper'>
        {OTTrips.map(trip => 
          <OTTrip />
        )}
      </div>  
    </div>
  )
}

export default OTFeed