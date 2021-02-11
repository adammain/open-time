import React from 'react'
import CalendarSchedule from '../CalendarSchedule/CalendarSchedule'
import OTFeed from '../OTFeed/OTFeed'
import NotificationFilter from '../NotificationFilter/NotificationFilter'
import config from '../config'
import './Dashboard.css'

function Dashboard() {
  let [pairingsResponse, setPairingsResponseData] = React.useState('')
  let [pairingLegsResponse, setPairingsLegsResponseData] = React.useState('')
  let [employeeesResponse, setEmployeeesResData] = React.useState('')
  let [layoversResponse, setLayoversResData] = React.useState('')
  let [hotelsResponse, setHotelsResData] = React.useState('')

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
      fetch(`${config.API_BASE_URL}/hotels/`, fetchBody)
    ])
      .then(([pairingsRes, pairingLegsRes, employeeesRes, layoversRes, hotelsRes]) => {
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
        return Promise.all([pairingsRes.json(), pairingLegsRes.json(), employeeesRes.json(), layoversRes.json(), hotelsRes.json()])
      })
      .then(([pairings, pairingLegs, employeees, layovers, hotels]) => {
        // @TODO setResonseData hook
        setPairingsResponseData(pairings)
        setPairingsLegsResponseData(pairingLegs.reverse())
        setEmployeeesResData(employeees)
        setLayoversResData(layovers)
        setHotelsResData(hotels)
      })
      .catch(err => console.log('there has been an error.', err))
  }, [])
  
  React.useEffect(() => {
    fetchData()
  }, [fetchData])

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
          />
        </aside>
        <section className='Dashboard__section'>
          <h2>OPENTIME Feed</h2>
          <OTFeed />
        </section>
        <aside className='Dashboard__aside hidden'>
          <NotificationFilter />
        </aside>
      </div>
    </main>
  )
}

export default Dashboard