import React from 'react'
import { FormSpy } from 'react-final-form'
import { Button } from "@chakra-ui/react"

const Submit = ({ isSubmitting, ...props }) => (
  <FormSpy>
    {({ submitting }) => (
      <Button
        type="submit"
        isLoading={submitting || isSubmitting}
        display="flex"
        w="100%"
        {...props}
      />
    )}
  </FormSpy>
)

export default Submit
