import React from 'react'
import { format, isAfter, isWithinInterval } from 'date-fns'
import config from '../config'

import './CalendarSchedule.css'

const getCalDay = day => {
  switch(day) {
    case 0:
      return 'SU'
    case 1:
      return 'MO'
    case 2:
      return 'TU'
    case 3:
      return 'WE'
    case 4:
      return 'TH'
    case 5:
      return 'FR'
    case 6:
      return 'SA'
    default:
      return ''
  }
}

const CalendarSchedule = (props) => {
  const calendarDays = props.calendarDays
  const userSchedule = props.userSchedule
  const pairingLegs = props.pairingLegs
  const highlightDateInterval = props.highlightDateInterval
  let isHighlightingDates = false
  // @TODO Debug why some days show DEN arrival instead of last leg arrival
  // Create state for userSchedule, update it after bidding on trip
  const renderTableRow = () => {
    let calRows = 
      calendarDays && userSchedule && pairingLegs && calendarDays.days_in_month
        .map(day => {
          const calDay = new Date(day).getDate()
          const calMonth = new Date(day).getMonth()
          const calYear = new Date(day).getFullYear()
          const today = new Date(day)
          const tmrw = new Date("2021-02-28T07:00:00.000Z")
          if (highlightDateInterval && isWithinInterval(new Date(calYear, calMonth, calDay), {
            start: new Date(highlightDateInterval.start.year, highlightDateInterval.start.month, highlightDateInterval.start.day),
            end: new Date(highlightDateInterval.end.year, highlightDateInterval.end.month, highlightDateInterval.end.day)
          })) {
            isHighlightingDates = true
          } else {
            isHighlightingDates = false
          }

          const tripStartToday = userSchedule ? userSchedule.find(pairing => {
            const startDate = new Date(pairing.pair_start).getMonth() + '' + new Date(pairing.pair_start).getDate()
            if (startDate === calMonth + '' + calDay) {
              return true
            }
            return false
          }) : {}
        
          // Display last leg destination for each pairing on employees schedule
          const legsInPairingToday = pairingLegs.filter(leg => {            
            const isInPairing = userSchedule.filter(pairing => pairing.id === leg.pairing_id).length
            const legArrivalDate = new Date(leg.arrival_time).getMonth() + '' + new Date(leg.arrival_time).getDate()
            const legIsToday = legArrivalDate === calMonth + '' + calDay
            return isInPairing && legIsToday
          }) 
          
          // Use date-fns `isAfter()` to find last last leg arrival service for current day
          let lastLegToday = legsInPairingToday[0]
          for (let idx in legsInPairingToday) {
            const thisLeg = legsInPairingToday[idx]
            if (isAfter(new Date(thisLeg.arrival_time), new Date(lastLegToday.arrival_time))) {
              lastLegToday = thisLeg
            }
          }

          return (
            <tr key={day}>
              <td>{getCalDay(new Date(day).getDay())}</td>
              <td>{calDay ? calDay : null}</td>
              <td>{tripStartToday ? tripStartToday.pairing_id : null}</td>
              <td className={isHighlightingDates ? 'td--highlight' : ''}>
                {lastLegToday ? lastLegToday.arrival_service : null}
              </td>
            </tr>
          )
        })
    return calRows
  }
  const row = renderTableRow()
  return (
    <div className='CalendarSchedule'>
      <div className='CalendarSchedule__wrapper'>
        <h3>February Schedule</h3>
        <table>
          <tbody>
            {row.length > 0 ? row : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CalendarSchedule