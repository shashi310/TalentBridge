


import React from 'react'
import { Routes,Route } from 'react-router-dom'

import Home from '../components/Home'
import Login from '../components/Login'
import Signup from '../components/Signup'
import HRDashboard from '../components/HRDashboard'
import CandidateDashBoard from '../components/CandidateDashBoard'
import CandApplied from '../components/CandApplied'
import Jobs from '../components/Jobs'
import JobsPatch from '../components/JobsPatch'
import SingleJob from '../components/SingleJob'


const MainRoute = () => {
  return (
    <div>

      
       <Routes>
         <Route path="/" element= {<Home />} />
         <Route path="/login" element= {<Login />} />
         <Route path="/signup" element= {<Signup />} />
         <Route path="/hr" element= {<HRDashboard />} />
         <Route path="/dashboard" element= {<CandidateDashBoard />} />
         <Route path="/cand" element= {<CandApplied />} />
         <Route path="/jobs" element= {<Jobs />} />
         <Route path="/jobs/update/:id" element= {<JobsPatch />} />
         <Route path="/jobs/single/:id" element= {<SingleJob />} />
       
       
      </Routes>

    </div>
  )
}

export default MainRoute