import React from 'react'
import { FORM_ERROR } from 'final-form'
import { Form as ReactFinalForm } from 'react-final-form'
import createDecorator from 'final-form-focus'

export { FORM_ERROR }

const focusOnErrors = createDecorator()

const Form = ({ children, onSubmit, onSubmitSuccess, name, ...props }) => (
  <ReactFinalForm
    key={name}
    onSubmit={async (...args) => {
      if (!onSubmit) {
        // eslint-disable-next-line no-console
        console.error('Please add "onSubmit" in Form component')
        return undefined
      }
      try {
        const result = await onSubmit(...args)
        if (!result && onSubmitSuccess) {
          onSubmitSuccess()
        }
        return result
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)

        return {
          [FORM_ERROR]: 'Something bad happened... Please retry!',
        }
      }
    }}
    decorators={[focusOnErrors]}
    {...props}
  >
    {renderProps => (
      <form
        name={name}
        noValidate
        onSubmit={renderProps.handleSubmit}
        style={renderProps.style}
      >
        {children(renderProps)}
      </form>
    )}
  </ReactFinalForm>
)

export default Form
