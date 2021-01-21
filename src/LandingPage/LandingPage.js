import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <main>
      <header className='Landing__Header'>
        <section>
          <h1>OPENTIME</h1>
          <h3>Real-time Flica opentime trip notifications to your phone.</h3>
          <h2>Know Sooner.</h2>
          <h2>Bid Faster.</h2>
          <h2>Beat the bots.</h2>
        </section>
      </header>
      <footer>
        <section>
            {/* TODO: Create button component */}
            <div>
              <label>Login with your Flica account credentials.</label>
              <button className='Landing__Login--button'>
                <Link to={'/login'}>Login</Link>
              </button>
            </div>
          </section>
      </footer>
    </main>
  )
}

export default LandingPage