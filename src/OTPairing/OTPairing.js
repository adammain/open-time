import React from 'react'
// import { Link } from 'react-router-dom'

import './OTPairing.css'

function OTPairing(props) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const pairing = props.pairing
  const pairingLegs = props.pairingLegs.length ? props.pairingLegs.map(leg => {
    return {
      arrService: leg.arrival_service, 
      depService: leg.departure_service,
      arrTime: new Date(leg.arrival_time),
      depTime: new Date(leg.departure_time)
    }
  }) : []
  const captain = props.captain && props.captain.map(captain => captain.first_name + ' ' + captain.last_name)
  // const first_officer = props.first_officer && props.first_officer.map(first_officer => first_officer.first_name + ' ' + first_officer.last_name)
  const layovers = props.layovers && props.layovers.map(layover => layover.airport)
  const duration = pairing.duration
  const pairStartDate = new Date(pairing.pair_start)
  let reportTime = new Date(pairing.report)
  let pairDepartTime = pairingLegs.length && pairingLegs[pairingLegs.length-1].depTime
  let pairArrivalTime = pairingLegs.length && pairingLegs[0].arrTime
  // datetime converted to "01:20" milatary format
  reportTime = ("0" + reportTime.getHours()).slice(-2) + ':' + (reportTime.getMinutes() < 10 ? '0' : '') + reportTime.getMinutes()
  pairDepartTime = pairDepartTime && ("0" + pairDepartTime.getHours()).slice(-2) + ':' + (pairDepartTime.getMinutes() < 10 ? '0' : '') + pairDepartTime.getMinutes()
  pairArrivalTime = pairArrivalTime && ("0" + pairArrivalTime.getHours()).slice(-2) + ':' + (pairArrivalTime.getMinutes() < 10 ? '0' : '') + pairArrivalTime.getMinutes()
  // const hotels = props.hotels
  return (
    <div className='OTPairing'>
      <div className='OTPairing__wrapper'>
        <div>
          <span><b>{pairStartDate.getDate() + monthNames[pairStartDate.getMonth()]}</b></span>
          <span>{` | ` + duration + ` days`}</span>
        </div>
        <div className='OTPairing__summary'>
          <div className='OTPairing__summary--item'>
            <div className='OTPairing__summary--item-heading'>Pairing</div>
            <div>{pairing.pairing_id}</div>
          </div>
          <div className='OTPairing__summary--item'>
            <div className='OTPairing__summary--item-heading'>Report</div>
            <div>{reportTime}</div>
          </div>
          <div className='OTPairing__summary--item'>
            <div className='OTPairing__summary--item-heading'>Depart</div>
            <div>{pairDepartTime}</div>
          </div>
          <div className='OTPairing__summary--item'>
            <div className='OTPairing__summary--item-heading'>Arrive</div>
            <div>{pairArrivalTime}</div>
          </div>
          <div className='OTPairing__summary--item'>
            <div className='OTPairing__summary--item-heading'>Blk Hrs</div>
            <div>{('0' + pairing.total_block.hours).slice(-2) + (pairing.total_block.minutes ? ('0' + pairing.total_block.minutes).slice(-2) : `00`)}</div>
          </div>
          <div className='OTPairing__summary--item'>
            <div className='OTPairing__summary--item-heading'>Credit</div>
            <div>{('0' + pairing.total_credit.hours).slice(-2) + (pairing.total_credit.minutes ? ('0' + pairing.total_credit.minutes).slice(-2) : `00`)}</div>
          </div>
          <div className='OTPairing__summary--item'>
            <div className='OTPairing__summary--item-heading'>TOT</div>
            <div>{(pairing.time_in_opentime.hours ? ('0' + pairing.time_in_opentime.hours).slice(-2) : `00`) + `:` + (pairing.time_in_opentime.minutes ? ('0' + pairing.time_in_opentime.minutes).slice(-2) : `00`)}</div>
          </div>
          <div className='OTPairing__summary--item'>
            <div className='OTPairing__summary--item-heading'>Layovers</div>
            <div>{layovers}</div>
          </div>
          {/* @TODO Add premium column to database and include here */}
          <div className='OTPairing__summary--item'>
            <div className='OTPairing__summary--item-heading'>Premium</div>
            {/* <div>{layovers}</div> */}
          </div>
          <div>
            <button>Add</button>
          </div>
          {/* @TODO Add Bid Button with status updates */}
        </div>
        <div>
          {/* @TODO Add dropdown with pairing leg and layover details */}
        </div>
      </div>
    </div>
  )
}

export default OTPairing