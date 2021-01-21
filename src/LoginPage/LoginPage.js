import React from 'react'
import { Link } from 'react-router-dom'

const Required = () => (
  <span className='LoginPage__required'>*</span>
)

function LoginPage() {
  function handleSubmit(e) {
    e.preventDefault()
    console.log(`Contact handleSubmit ran`)
  }
  return (
    <section>
      <h2>OPENTIME Login</h2>
      <form className='LoginPage__form' onSubmit={handleSubmit}>
        {/* TODO: Add error message here */}
        <div>
          <label htmlFor='username'>Flica Username</label>
          <Required />
          <input 
            type='text'
            name='username'
            id='username'
            placeholder='Username'
            required />
        </div>
        <div>
        <label htmlFor='username'>Flica Password</label>
          <Required />
          <input 
            type='text'
            name='password'
            id='password'
            placeholder='Password'
            required />
        </div>
        <div className='LoginPage__login-button'>
          <button>
            <Link to='/dashboard'>Submit</Link>
          </button>
        </div>
      </form>
    </section>
  )
}

export default LoginPage
