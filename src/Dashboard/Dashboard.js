import React from 'react'
import CalendarSchedule from '../CalendarSchedule/CalendarSchedule'
import OTFeed from '../OTFeed/OTFeed'
// import NotificationFilter from '../NotificationFilter/NotificationFilter'
import config from '../config'
import './Dashboard.css'

function Dashboard() {
  let [pairingsResponse, setPairingsResponseData] = React.useState('')
  let [pairingLegsResponse, setPairingsLegsResponseData] = React.useState('')
  let [employeeesResponse, setEmployeeesResData] = React.useState('')
  let [layoversResponse, setLayoversResData] = React.useState('')
  let [hotelsResponse, setHotelsResData] = React.useState('')
  // @TODO allow user to select calendar month 
  const selectedMonth = '2'
  // @TODO get logged in user's employee number (used for login) or get from FLICA after logged in??
  const userId = '30984'
  let [calendarDaysResponse, setCalendarDaysResponseData] = React.useState('')
  let [userScheduleResponse, setUserScheduleResponseData] = React.useState('')
  const [isHighlightingDateInterval, setIsHighlightingDateInterval] = React.useState(false)

  const fetchData = React.useCallback(() => { 
    const fetchBody = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    }
    Promise.all([
      fetch(`${config.API_BASE_URL}/pairings/`, fetchBody),
      fetch(`${config.API_BASE_URL}/pairing-legs/`, fetchBody),
      fetch(`${config.API_BASE_URL}/employees/`, fetchBody),
      fetch(`${config.API_BASE_URL}/layovers/`, fetchBody),
      fetch(`${config.API_BASE_URL}/hotels/`, fetchBody),
      fetch(`${config.API_BASE_URL}/schedules/${selectedMonth}`, fetchBody),
      fetch(`${config.API_BASE_URL}/schedules?id=${userId}`, fetchBody)
    ])
      .then(([pairingsRes, pairingLegsRes, employeeesRes, layoversRes, hotelsRes, calDaysRes, userScheduleRes]) => {
        if (!pairingsRes.ok) {
          return pairingsRes.json().then(e => Promise.reject(e))
        }
        if (!pairingLegsRes.ok) {
          return pairingLegsRes.json().then(e => Promise.reject(e))
        } 
        if (!employeeesRes.ok) {
          return employeeesRes.json().then(e => Promise.reject(e))
        }
        if (!layoversRes.ok) {
          return layoversRes.json().then(e => Promise.reject(e))
        } 
        if (!hotelsRes.ok) {
          return hotelsRes.json().then(e => Promise.reject(e))
        } 
        if (!calDaysRes.ok) {
          return calDaysRes.json().then(e => Promise.reject(e))
        }
        if (!userScheduleRes.ok) {
          return userScheduleRes.json().then(e => Promise.reject(e))
        }
        return Promise.all([pairingsRes.json(), pairingLegsRes.json(), employeeesRes.json(), layoversRes.json(), hotelsRes.json(), calDaysRes.json(), userScheduleRes.json()])
      })
      .then(([pairings, pairingLegs, employeees, layovers, hotels, calDays, userSchedule]) => {
        setPairingsResponseData(pairings)
        setPairingsLegsResponseData(pairingLegs)
        setEmployeeesResData(employeees)
        setLayoversResData(layovers)
        setHotelsResData(hotels)
        setCalendarDaysResponseData(calDays)
        setUserScheduleResponseData(userSchedule)
      })
      .catch(err => console.log('there has been an error.', err))
  }, [])
  
  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  React.useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  })

  const handleAddPairing = (id) => {
    console.log('addpairingtosched', id)
  }

  const handlePairingHover = (pairDateInterval) => {
    setIsHighlightingDateInterval(pairDateInterval)
  }

  return (
    <main className='Dashboard'>
      <div className='Dashboard__container'>
        <aside className='Dashboard__aside'>
          <CalendarSchedule 
            pairings={pairingsResponse} 
            pairingLegs={pairingLegsResponse}
            employees={employeeesResponse}
            layovers={layoversResponse}
            hotels={hotelsResponse}
            calendarDays={calendarDaysResponse}
            userSchedule={userScheduleResponse}
            highlightDateInterval={isHighlightingDateInterval}
          />
        </aside>
        <section className='Dashboard__section'>
          <h2>OPENTIME Feed</h2>
          <OTFeed 
            pairings={pairingsResponse} 
            pairingLegs={pairingLegsResponse}
            employees={employeeesResponse}
            layovers={layoversResponse}
            hotels={hotelsResponse}
            handleAddPairing={(id) => handleAddPairing(id)}
            onPairHover={(pairingInterval) => handlePairingHover(pairingInterval)}
          />
        </section>
        {/* {
          isPeekingDates && 
          <aside className='Dashboard__aside hidden'>
            <NotificationFilter />
          </aside>
        } */}
      </div>
    </main>
  )
}

export default Dashboard