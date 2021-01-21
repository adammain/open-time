import React from 'react'
import CalendarSchedule from '../CalendarSchedule/CalendarSchedule'
import OTFeed from '../OTFeed/OTFeed'

function Dashboard() {
  return (
    <main>
      <section className='Dashboard__section'>
        <CalendarSchedule />
      </section>
      <section className='Dashboard__section'>
        <OTFeed />
      </section>
    </main>
  )
}

export default Dashboard