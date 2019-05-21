import React from 'react'
import Navbar from './Navbar'

const HomePage = (props) => {
  return (
    <div>
      <main>
        <Navbar {...props} />
        <div className="container">
          <h2>RecommendIt HomePage</h2>
          <p>lorem ipsum</p>
        </div>
      </main>
    </div>
  )
}

export default HomePage
