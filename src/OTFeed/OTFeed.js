import React from 'react'
import OTPairing from '../OTPairing/OTPairing'

// const OTPairings = [
//   {
//     id: 1,
//     dep: 'DEN',
//     arr: 'SLC',
//     depTime: '11:59',
//     arrTime: '13:44'
//   },
//   {
//     id: 2,
//     dep: 'DEN',
//     arr: 'SLC',
//     depTime: '11:59',
//     arrTime: '13:44'
//   },
//   {
//     id: 3,
//     dep: 'DEN',
//     arr: 'SLC',
//     depTime: '11:59',
//     arrTime: '13:44'
//   },
//   {
//     id: 4,
//     dep: 'DEN',
//     arr: 'SLC',
//     depTime: '11:59',
//     arrTime: '13:44'
//   },
// ]
function OTFeed(props) {
  return (
    <div className='OTFeed'>
      <div className='OTFeed__wrapper'>
        {props.pairings && 
          props.pairings.map(pair => pair.time_in_opentime &&   
            <OTPairing 
              key={pair.id} 
              pairing={pair} 
              pairingLegs={props.pairingLegs.length && props.pairingLegs.filter(leg => leg.pairing_id === pair.id)}
              captain={props.employees && props.employees.filter(employee => employee.employee_number === pair.captain)}
              firstOfficer={props.employees && props.employees.filter(employee => employee.employee_number === pair.first_officer)}
              layovers={props.layovers && props.layovers.filter(layover => layover.pairing === pair.id)}
              hotels={props.hotels}
            />
        )}
      </div>  
    </div>
  )
}

export default OTFeed