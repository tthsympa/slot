import React from 'react'
import { Link, Flex, Grid, GridItem } from '@chakra-ui/react'
import OfficeButton from 'components/OfficeButton'

import logo from 'assets/logo/logo.png'

const Offices = ({
  offices = [],
  setOfficeId = () => {},
  office: { id } = {},
}) => (
  <GridItem colSpan={10}>
    <Flex h="100%">
      {offices.map(office => (
        <OfficeButton
          key={office.id}
          name={office.name}
          isSelected={office.id === id}
          color={office.color}
          onClick={() => setOfficeId(office.id)}
        />
      ))}
    </Flex>
  </GridItem>
)

const Logo = () => (
  <GridItem colSpan={2}>
    <Flex align="center" justify="center" h="100%">
      <Link href="/">
        <img
          src={logo}
          alt="slot-logo"
          style={{ height: '55px', width: '55px' }}
        />
      </Link>
    </Flex>
  </GridItem>
)

const Header = props => {
  return (
    <Grid
      as="nav"
      templateRows="70px"
      templateColumns="repeat(12, 1fr)"
      h="70px"
      maxH="70px"
    >
      <Offices {...props} />
      <Logo />
    </Grid>
  )
}
export default Header
