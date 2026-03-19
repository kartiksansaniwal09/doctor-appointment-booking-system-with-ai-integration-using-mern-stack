import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import AiTriageSection from '../components/AiTriageSection'
import InstituteSnapshot from '../components/InstituteSnapshot'

const Home = () => {
  return (
    <div>
      <Header />
      <InstituteSnapshot />
      <AiTriageSection />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home
