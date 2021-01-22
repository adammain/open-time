import React from 'react'
import CalendarSchedule from '../CalendarSchedule/CalendarSchedule'
import OTFeed from '../OTFeed/OTFeed'
import NotificationFilter from '../NotificationFilter/NotificationFilter'
import './Dashboard.css'

function Dashboard() {
  return (
    <main className='Dashboard'>
      <div className='Dashboard__container'>
        <aside className='Dashboard__aside--aside'>
          <CalendarSchedule />
        </aside>
        <section className='Dashboard__section'>
          <h2>OPENTIME Feed</h2>
          <OTFeed />
        </section>
        <aside className='Dashboard__aside--aside hidden'>
          <NotificationFilter />
        </aside>
      </div>
    </main>
  )
}

export default Dashboard