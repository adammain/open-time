import React from 'react'
import { Link } from 'react-router-dom'

import './LandingPage.css'

function LandingPage() {
  return (
    <main className='LandingPage'>
      <div className='LandingPage__wrapper'>
        <header className='Landing__Header'>
          <section>
            <h1>OPENTIME</h1>
            <h3>Real-time Flica opentime trip notifications.</h3>
            <h2>Know Sooner.</h2>
            <h2>Bid Faster.</h2>
            <h2>Beat the bots.</h2>
          </section>
        </header>
        <footer>
          <section>
              {/* TODO: Create button component */}
              <div className='LandingPage__footer--button-wrapper'>
                {/* <label>Login with your Flica account credentials.</label> */}
                <Link to={'/login'}>
                  <button className='Landing__button'>
                    Login with Flica Credentials
                  </button>
                </Link>
              </div>
            </section>
        </footer>
      </div>
    </main>
  )
}

export default LandingPage