import React from 'react'
import Pet from '@/components/pet'
import Person from '@/state/person'

const Home = () => {
  return (
    <div className="home-container">
      <Pet Child={Person} />
      {/* <div onClick={getAnimationNames}>get Animations</div> */}
    </div>
  )
}

export default Home
