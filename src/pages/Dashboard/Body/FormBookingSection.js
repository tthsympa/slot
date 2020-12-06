import React from 'react'
import { Field } from 'react-final-form'
import {
  Text,
  Input,
  Textarea,
  Select,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'

import Form from 'components/Form'
import Submit from 'components/Submit'

import api from 'api/Client'

const FormBookingSection = React.memo(
  ({ isBooking = false, onClose = () => {}, reload, slot, rooms, office }) => {
    console.log(slot.string)
    return (
      <Drawer isOpen={isBooking} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Text fontSize="lg" fontWeight="500" textAlign="center" my={4}>
                Continue your booking
              </Text>
            </DrawerHeader>

            <DrawerBody>
              <Text fontSize="lg" mb="24px">
                {slot.string}
              </Text>
              <Form
                initialValues={{
                  subject: '',
                  email: '',
                  description: '',
                  room: '',
                  slot: {
                    start: slot.start,
                    end: slot.end,
                  },
                }}
                onSubmit={async values => {
                  await api.meetings.add(office.id, values)
                  await reload()
                  onClose()
                }}
              >
                {({ errors }) => (
                  <>
                    <Field
                      my={2}
                      name="subject"
                      validate={validateCanNotBeEmpty}
                    >
                      {({ input, meta }) => (
                        <FormControl
                          isRequired
                          isInvalid={meta.dirty && meta.error}
                          mb={4}
                        >
                          <FormLabel
                            fontSize="md"
                            fontWeight="500"
                            textAlign="left"
                          >
                            Subject of the meeting
                          </FormLabel>
                          <Input
                            id="subject"
                            placeholder="Be brief"
                            autoComplete="off"
                            w="400px"
                            {...input}
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field my={2} name="email" validate={validateCanNotBeEmpty}>
                      {({ input, meta }) => (
                        <FormControl
                          isRequired
                          isInvalid={meta.dirty && meta.error}
                          mb={4}
                        >
                          <FormLabel
                            fontSize="md"
                            fontWeight="500"
                            textAlign="left"
                          >
                            Owner of the meeting
                          </FormLabel>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Your email address"
                            autoComplete="off"
                            w="400px"
                            {...input}
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field my={2} name="room" validate={validateCanNotBeEmpty}>
                      {({ input, meta }) => (
                        <FormControl
                          isRequired
                          isInvalid={meta.dirty && meta.error}
                          mb={4}
                        >
                          <FormLabel
                            fontSize="md"
                            fontWeight="500"
                            textAlign="left"
                          >
                            Pick a room
                          </FormLabel>
                          <Select id="room" w="400px" {...input}>
                            <option value="" disabled>
                              Rooms
                            </option>
                            {rooms.map(room => (
                              <option key={room.id} value={room.id}>
                                {room.name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Field>

                    <Field my={2} name="description">
                      {({ input, meta }) => (
                        <FormControl mb={4}>
                          <FormLabel
                            fontSize="md"
                            fontWeight="500"
                            textAlign="left"
                          >
                            Description
                          </FormLabel>
                          <Textarea
                            id="description"
                            placeholder="A little more context?"
                            w="400px"
                            size="sm"
                            {...input}
                          />
                        </FormControl>
                      )}
                    </Field>
                    <DrawerFooter>
                      <Submit isDisabled={Object.keys(errors).length > 0}>
                        Book this slot
                      </Submit>
                    </DrawerFooter>
                  </>
                )}
              </Form>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  },
)
export default FormBookingSection


function validateCanNotBeEmpty(value) {
  if (!value) {
    return 'Can not be empty!'
  }
  return undefined
}