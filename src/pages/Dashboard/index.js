import React, { useState, useEffect, useMemo } from 'react'
import moment from 'moment'
import api from 'api/Client'

import Header from './Header'
import Body from './Body'

moment.locale('fr')

const Dashboard = () => {
  const [officeId, setOfficeId] = useState()
  const [offices, setOffices] = useState([])

  useEffect(() => {
    const fetchOffices = async () => {
      const fetchedOffices = await api.offices.get()
      setOffices(fetchedOffices)
    }

    if (offices.length === 0) fetchOffices()
  }, [offices])

  const office = useMemo(
    () =>
      offices.find(office => office.id === officeId) ||
      offices.find(office => office.default) ||
      {},
    [officeId, offices],
  )

  return (
    offices.length > 0 && (
      <>
        <Header office={office} offices={offices} setOfficeId={setOfficeId} />
        <Body office={office} />
      </>
    )
  )
}

export default Dashboard
