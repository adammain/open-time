import React from 'react'
import OTPairing from '../OTPairing/OTPairing'

function OTFeed(props) {
  // let [pairingsResponse, setPairingsResponseData] = React.useState('')
  return (
    <div className='OTFeed'>
      <div className='OTFeed__wrapper'>
        {
          props.pairings 
            ? props.pairings.map(pair => pair.time_in_opentime &&   
                <OTPairing 
                  key={pair.id} 
                  pairing={pair} 
                  pairingLegs={props.pairingLegs.length && props.pairingLegs.filter(leg => leg.pairing_id === pair.id)}
                  captain={props.employees && props.employees.filter(employee => employee.employee_number === pair.captain)}
                  firstOfficer={props.employees && props.employees.filter(employee => employee.employee_number === pair.first_officer)}
                  layovers={props.layovers && props.layovers.filter(layover => layover.pairing === pair.id)}
                  hotels={props.hotels}
                  onAddPairing={(id) => props.handleAddPairing(id)}
                  onHover={(pairDateInterval) => props.onPairHover(pairDateInterval)}
                />
              ) 
            : <div>Nothing in Opentime</div>
        }
      </div>  
    </div>
  )
}

export default OTFeed