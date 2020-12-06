import React, { useState, useCallback } from 'react'
import { Box, Text, Button, GridItem } from '@chakra-ui/react'
import styled from '@emotion/styled'

import Calendar from 'react-big-calendar'
import moment from 'moment'

import { white, darkBlack, lightWhite, primary, shadow } from 'helpers/colors'
import { isDateBetween, isDateEqual } from 'helpers/date'

import 'react-big-calendar/lib/sass/styles.scss'

const localizer = Calendar.momentLocalizer(moment)

const CalendarSection = ({ meetings, cleanAll, setBookingSlot }) => {
  const [slot, setSlot] = useState({})
  const [view, setView] = useState(Calendar.Views.WORK_WEEK)

  const setNewSlot = useCallback(data => {
    if (isDateEqual(data.start, data.end)) {
      setSlot({})
    } else setSlot(formatSlot(data))
  }, [])

  const selectable = view !== 'month'

  return (
    <GridItem colSpan={10}>
      <Container>
        <Calendar
          slotPropGetter={sl => handleSlot(sl, slot)}
          selectable={selectable}
          localizer={localizer}
          events={meetings}
          startAccessor="start"
          endAccessor="end"
          defaultView={Calendar.Views.WORK_WEEK}
          defaultDate={new Date()}
          views={{ month: true, work_week: true }}
          onView={setView}
          min={getExactTime(8)}
          max={getExactTime(20)}
          onSelectSlot={setNewSlot}
          onSelecting={setNewSlot}
        />
        <Box mt="32px" textAlign="center" h="120px">
          <Text
            as="h2"
            textTransform={`${Boolean(slot.string) ? 'capitalize' : 'unset'}`}
            mb="16px"
            color={darkBlack}
          >
            {slot.string ? slot.string : 'Select a slot to book a room'}
          </Text>
          <Button
            size="md"
            w="450px"
            isDisabled={!slot.string}
            onClick={() => setBookingSlot(slot)}
          >
            Book a room
          </Button>
          {slot.string && (
            <Button
              variant="link"
              ml="16px"
              onClick={() => {
                setSlot({})
                cleanAll()
              }}
            >
              Reset
            </Button>
          )}
        </Box>
      </Container>
    </GridItem>
  )
}
export default CalendarSection

const getExactTime = time => {
  const now = new Date()
  now.setHours(time)
  now.setMinutes(0)
  now.setMilliseconds(0)
  return now
}

const formatSlot = ({ start, end }) => {
  const fullDay = moment(start).format('dddd')
  const day = moment(start).format('DD')

  const startTime = moment(start).format('HH[h]mm')
  const endTime = moment(end).format('HH[h]mm')
  return {
    start,
    end,
    string: `${fullDay} ${day}, ${startTime} - ${endTime}`,
  }
}

const handleSlot = (sl, slot) => {
  if (sl && slot.start) {
    return {
      style: {
        backgroundColor: isDateBetween(slot.start, slot.end, sl)
          ? shadow
          : lightWhite,
      },
    }
  }
  return {}
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  justify-content: center;
  align-items: center;

  .rbc-calendar {
    transition: width 350ms ease;
    width: 90%;
    height: 75%;
  }

  .rbc-btn-group {
    button {
      border-color: ${darkBlack};
    }
  }
  .rbc-toolbar-label {
    color: ${darkBlack};
    text-transform: capitalize;
    font-size: 20px;
  }

  .rbc-month-view,
  .rbc-time-view {
    border-radius: 4px;
    transition: box-shadow 350ms ease;

    :hover {
      box-shadow: 0px 10px 20px -5px ${primary};
    }

    .rbc-month-row,
    .rbc-time-row {
      background-color: ${lightWhite};
    }

    .rbc-month-row:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    .rbc-month-header,
    .rbc-time-header {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      background-color: ${white};
    }

    .rbc-time-content {
      background-color: ${lightWhite};
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 3px;
    }
  }
`
