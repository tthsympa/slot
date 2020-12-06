import React from 'react'
import styled from '@emotion/styled'
import { Text } from '@chakra-ui/react'
import { white } from 'helpers/colors'

const OfficeButton = React.memo(
  ({
    isSelected = false,
    color = '#ffffff',
    name = '',
    onClick = () => {},
  }) => {
    return (
      <Button isSelected={isSelected} color={color} onClick={onClick}>
        <Text color={white} fontSize="lg" w="100%">
          {name}
        </Text>
      </Button>
    )
  },
)
export default OfficeButton

const Button = styled.button`
  border: none;
  transition: width 450ms ease;
  padding-left: 32px;
  display: flex;
  align-items: center;
  align-self: stretch;
  cursor: pointer;
  white-space: nowrap;
  background-color: ${p => p.color};

  width: ${p => (p.isSelected ? 35 : 5)}%;
  flex-grow: ${p => (p.isSelected ? 1 : 'unset')};

  > * {
    ${p => !p.isSelected && `display: none;`}
  }

  :hover,
  :focus {
    ${p =>
      !p.isSelected &&
      `
        width: 20%;
        > * {
          display: block;
        }
    `}
  }
`
