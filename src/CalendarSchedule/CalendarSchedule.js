import React from 'react'
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
  // @TODO allow user to select calendar month 
  const selectedMonth = '2'
  // @TODO get logged in user's employee number (used for login) or get from FLICA after logged in??
  const userId = '30984'
  let [calendarDaysResponse, setCalendarDaysResponseData] = React.useState('')
  let [userScheduleResponse, setUserScheduleResponseData] = React.useState('')
  const fetchUserSchedule = React.useCallback(() => {
    const fetchBody = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    }
    Promise.all([
      fetch(`${config.API_BASE_URL}/schedules/${selectedMonth}`, fetchBody),
      fetch(`${config.API_BASE_URL}/schedules?id=${userId}`, fetchBody)
    ])
      .then(([calDaysRes, userScheduleRes]) => {
        if (!calDaysRes.ok) {
          return calDaysRes.json().then(e => Promise.reject(e))
        }
        if (!userScheduleRes.ok) {
          return userScheduleRes.json().then(e => Promise.reject(e))
        }
        return Promise.all([calDaysRes.json(), userScheduleRes.json()])
      })
      .then(([calDays, userSchedule]) => {
        setCalendarDaysResponseData(calDays)
        setUserScheduleResponseData(userSchedule)
      })
      .catch(err => console.log('there has been an error.', err))
  }, [])
    
  React.useEffect(() => {
    fetchUserSchedule()
  }, [fetchUserSchedule])

  const renderTableRow = () => {
    let calRows = 
      calendarDaysResponse && calendarDaysResponse.days_in_month
        .map(day => {
          const calDate = new Date(day).getDate()
          
          const tripToday = userScheduleResponse ? userScheduleResponse.find(pairing => {
            const startDate = new Date(pairing.pair_start).getDate()
            return startDate === calDate
          }) : {}

          const lastLeg = props.pairingLegs ? props.pairingLegs.find(leg => {
            const legArrivalDate = new Date(leg.arrival_time).getDate()
            return legArrivalDate === calDate
          }) : {}
          
          return (
            <tr key={day}>
              <td>{getCalDay(new Date(day).getDay())}</td>
              <td>{calDate ? (calDate) : null}</td>
              <td>{tripToday ? (tripToday.pairing_i) : null}</td>
              <td>{lastLeg ? (lastLeg.arrival_service) : null}</td>
            </tr>
          )
        })
        console.log({calRows})
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