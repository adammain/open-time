import React from 'react'
import OTPairing from '../OTPairing/OTPairing'

function OTFeed(props) {
  let [opentimePairings, setOpentimePairings] = React.useState([])
  // let [interval, setInterval] = React.useState(0)
  // let [opentimePairingsTemp, setOpentimePairingsTemp] = React.useState('')

  React.useEffect(() => {
    // const otPairings = props.pairings && props.pairings.filter(pair => pair.time_in_opentime)
    setOpentimePairings(props.opentimePairings)
  }, [props.opentimePairings])

  // Mock of new opentime pairings displaying in feed using setTimeout()
  // React.useEffect(() => {
    // let opentimeInterval = setTimeout(() => {
    //   const totalOpentimePairings = 4

    //   if (interval >= totalOpentimePairings) {
    //     console.log("DONE")
    //     return
    //   } 

    //   let nextPairing = opentimePairingsTemp[interval]
    //   if (nextPairing && opentimePairings.indexOf(nextPairing.id) === -1) {
    //     setInterval(interval + 1)
    //     setOpentimePairings(opentimePairings => [...opentimePairings, nextPairing])
    //   }       
    // }, 3000 + (interval * 25000))


  // }, [opentimePairings, props.pairings, opentimePairingsTemp])

  // Hack to only show notifications for each new pairing as opposed to each render
  // if (opentimePairings.length !== interval) {
  //   new Notification('New pairing to bid on!')
  // }

  return (
    <div className='OTFeed'>
      <div className='OTFeed__wrapper'>
        {
          opentimePairings.length
            ? opentimePairings.map(pair =>    
                <OTPairing 
                  key={pair.id} 
                  pairing={pair} 
                  numberOfPairings={opentimePairings.length}
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