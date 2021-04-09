import React from 'react'
// import { Link } from 'react-router-dom'
import { format } from 'date-fns'

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
  // const captain = props.captain && props.captain.map(captain => captain.first_name + ' ' + captain.last_name)
  // const first_officer = props.first_officer && props.first_officer.map(first_officer => first_officer.first_name + ' ' + first_officer.last_name)
  const layovers = props.layovers && props.layovers.map(layover => layover.airport)
  const duration = pairing.duration
  const pairStartDate = new Date(pairing.pair_start)
  const pairEndDate = new Date(pairing.pair_end)

  // create date interval of pairing to pass to calendar callback for cal pairing peek highlight feature
  const pairDateInterval = {
    start: {year: pairStartDate.getFullYear(), month: pairStartDate.getMonth(), day: pairStartDate.getDate()},
    end: {year: pairEndDate.getFullYear(), month: pairEndDate.getMonth(), day: pairEndDate.getDate()}
  }
  // pairing datetime's converted to "01:20" milatary format
  let reportTime = format(new Date(pairing.report), 'HH:mm')
  let pairDepartTime = pairingLegs.length && format(pairingLegs[0].depTime, 'HH:mm')
  let pairArrivalTime = pairingLegs.length && format(pairingLegs[pairingLegs.length-1].arrTime, 'HH:mm')
  // const hotels = props.hotels
  // TODO: Create components for each summary item below
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
            <div className='OTPairing__summary--item-body'>{pairing.pairing_id}</div>
          </div>
          <div className='OTPairing__summary--item'>
            <div className='OTPairing__summary--item-heading'>Report</div>
            <div className='OTPairing__summary--item-body'>{reportTime}</div>
          </div>
          <div className='OTPairing__summary--item'>
            <div className='OTPairing__summary--item-heading'>Depart</div>
            <div className='OTPairing__summary--item-body'>{pairDepartTime}</div>
          </div>
          <div className='OTPairing__summary--item'>
            <div className='OTPairing__summary--item-heading'>Arrive</div>
            <div className='OTPairing__summary--item-body'>{pairArrivalTime}</div>
          </div>
          <div className='OTPairing__summary--item'>
            <div className='OTPairing__summary--item-heading'>Blk Hrs</div>
            <div className='OTPairing__summary--item-body'>{('0' + pairing.total_block.hours).slice(-2) + (pairing.total_block.minutes ? ('0' + pairing.total_block.minutes).slice(-2) : `00`)}</div>
          </div>
          <div className='OTPairing__summary--item'>
            <div className='OTPairing__summary--item-heading'>Credit</div>
            <div className='OTPairing__summary--item-body'>{('0' + pairing.total_credit.hours).slice(-2) + (pairing.total_credit.minutes ? ('0' + pairing.total_credit.minutes).slice(-2) : `00`)}</div>
          </div>
          <div className='OTPairing__summary--item hidden'>
            <div className='OTPairing__summary--item-heading'>TOT</div>
            <div className='OTPairing__summary--item-body'>{(pairing.time_in_opentime.hours ? ('0' + pairing.time_in_opentime.hours).slice(-2) : `00`) + `:` + (pairing.time_in_opentime.minutes ? ('0' + pairing.time_in_opentime.minutes).slice(-2) : `00`)}</div>
          </div>
          <div className='OTPairing__summary--item'>
            <div className='OTPairing__summary--item-heading'>Layovers</div>
            <div className='OTPairing__summary--item-body'>{layovers}</div>
          </div>
          {/* @TODO Add premium column to database and include here */}
          <div className='OTPairing__summary--item hidden'>
            <div className='OTPairing__summary--item-heading'>Premium</div>
            {/* <div>{layovers}</div> */}
          </div>
          <div>
            <button 
              className='Btn__add' 
              onClick={() => props.onAddPairing(pairing.id)}
              onMouseEnter={() => props.onHover(pairDateInterval)}
              onMouseLeave={() => props.onHover(false)}
            >
              Add
            </button>
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