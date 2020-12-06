import React from 'react'
import { Box, Text, Divider, GridItem } from '@chakra-ui/react'
import moment from 'moment'

import { isDateNext, isCurrentDateBetween } from 'helpers/date'
import FormBookingSection from './FormBookingSection'

const SideBar = ({
  bookingSlot,
  meetings,
  rooms,
  office,
  cleanAll,
  reload,
}) => {
  const nextMeetings = meetings.filter(meeting => isDateNext(meeting.start))
  const ongoingMeetings = meetings.filter(meeting =>
    isCurrentDateBetween(meeting.start, meeting.end),
  )

  const allMeetingsType = [
    {
      title: `Ongoing meeting${ongoingMeetings.length > 1 ? 's' : ''}`,
      meetings: ongoingMeetings,
    },
    {
      title: `Next meeting${nextMeetings.length > 1 ? 's' : ''}`,
      meetings: nextMeetings,
    },
  ]
  const displayMeetings = allMeetingsType.map(
    obj =>
      obj.meetings.length > 0 && (
        <React.Fragment key={obj.title}>
          <Text
            fontSize="lg"
            color="darkBlack"
            fontWeight="800"
            textAlign="center"
            my={4}
          >
            {obj.title}
          </Text>
          {obj.meetings.map((meeting, index) => (
            <React.Fragment key={`${index}-${meeting.id}`}>
              <Box
                as="ul"
                key={`${index}-${meeting.id}`}
                pl={0}
                style={{ listStyle: 'none' }}
              >
                <li>
                  <Text fontSize="md" textDecoration="underline">
                    {meeting.title}
                  </Text>
                </li>
                <Box as="li" pl="8px" display="flex" alignItems="center">
                  <Text as="span" fontSize="xs" minW="48px">
                    From{' '}
                  </Text>
                  <Text fontSize="sm" color="black" pl="8px">
                    {moment(meeting.start).format('dddd DD [at] HH[h]mm')} to{' '}
                    {moment(meeting.end).format('dddd DD [at] HH[h]mm')}
                  </Text>
                </Box>
                <Box as="li" pl="8px" display="flex" alignItems="center">
                  <Text as="span" fontSize="xs" minW="48px">
                    in
                  </Text>{' '}
                  <Text fontSize="sm" color="black" pl="8px">
                    {meeting.room} room
                  </Text>
                </Box>
                <Box as="li" pl="8px" display="flex" alignItems="center">
                  <Text as="span" fontSize="xs" minW="48px">
                    Owner is
                  </Text>{' '}
                  <Text fontSize="sm" color="black" pl="8px">
                    {meeting.owner}
                  </Text>
                </Box>
              </Box>
              {index !== obj.meetings.length - 1 && <Divider my="8px" />}
            </React.Fragment>
          ))}
        </React.Fragment>
      ),
  )

  const hasMeetings = Boolean(displayMeetings.filter(Boolean).length)
  const reservationMode = Boolean(bookingSlot.string)

  return (
    <GridItem colSpan={2}>
      <Box h="100%" backgroundColor="white" w={'280px'}>
        <>
          <Divider />
          <Box w="100%" h="100%" p="0px 16px 80px" overflowY="scroll">
            <FormBookingSection
              isBooking={reservationMode}
              slot={bookingSlot}
              rooms={rooms}
              office={office}
              onClose={cleanAll}
              reload={reload}
            />
            {hasMeetings ? (
              displayMeetings
            ) : (
              <>
                <Text
                  fontSize="lg"
                  color="darkBlack"
                  fontWeight="500"
                  textAlign="center"
                  my={4}
                >
                  No meetings scheduled
                </Text>
                <Text fontSize="md" color="black">
                  Next and ongoing meetings will be displayed here
                </Text>
              </>
            )}
          </Box>
        </>
      </Box>
    </GridItem>
  )
}
export default SideBar
