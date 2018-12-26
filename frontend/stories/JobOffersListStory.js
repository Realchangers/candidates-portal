import React from 'react'
import { storiesOf } from '@storybook/react'
import StubContainer from 'react-storybooks-relay-container'

import JobOfferList from '../src/JobOffers/JobOfferList'

storiesOf('Job offers page', module)
  .add('with location Prague', () => {
    const props = {
      currentUser: {
        profile: {
          location: "Prague"
        }
      }
    }
    // TODO: crashes on undefined metatada
    return <StubContainer Component={JobOfferList} props={props} />
  })
