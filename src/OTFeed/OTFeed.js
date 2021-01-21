import React from 'react'
import OTTrip from '../OTTrip/OTTrip'

const OTTrips = [
  {
    id: 1,
    dep: 'DEN',
    arr: 'SLC',
    depTime: '11:59',
    arrTime: '13:44'
  },
  {
    id: 2,
    dep: 'DEN',
    arr: 'SLC',
    depTime: '11:59',
    arrTime: '13:44'
  },
  {
    id: 3,
    dep: 'DEN',
    arr: 'SLC',
    depTime: '11:59',
    arrTime: '13:44'
  },
  {
    id: 4,
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
          <OTTrip key={trip.id} />
        )}
      </div>  
    </div>
  )
}

export default OTFeed