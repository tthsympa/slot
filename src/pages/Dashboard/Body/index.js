import React, { useState, useCallback } from 'react'
import { Grid } from '@chakra-ui/react'
import { transparentize } from 'polished'
import api from 'api/Client'
import DataLoader from 'components/DataLoader'
import CalendarSection from './CalendarSection'
import SideBarSection from './SideBarSection'

const Body = ({ office }) => {
  const [bookingSlot, setBookingSlot] = useState({})

  const cleanAll = useCallback(() => {
    setBookingSlot({})
  }, [])

  return (
    <DataLoader
      key={office.id}
      load={async () => {
        const meetings = await api.meetings.get(office.id)
        const rooms = await api.rooms.get(office.id)

        return {
          meetings,
          rooms,
        }
      }}
    >
      {({ data, loading, reload }) =>
        !loading ? (
          <Grid
            as="main"
            position="relative"
            templateColumns="repeat(12, 1fr)"
            w="100%"
            h="100%"
            transition="background-color 350ms ease"
            bgColor={transparentize(0.8, office.color)}
            _hover={{ backgroundColor: transparentize(0.6, office.color) }}
          >
            <CalendarSection
              setBookingSlot={setBookingSlot}
              cleanAll={cleanAll}
              meetings={data.meetings}
            />
            <SideBarSection
              bookingSlot={bookingSlot}
              meetings={data.meetings}
              rooms={data.rooms}
              office={office}
              cleanAll={cleanAll}
              reload={reload}
            />
          </Grid>
        ) : null
      }
    </DataLoader>
  )
}

export default Body
