import React from 'react'
import { storiesOf } from '@storybook/react'
import StubContainer from 'react-storybooks-relay-container'

import UserProfileComponent from '../src/Profile/UserProfileComponent'

storiesOf('Database profile', module)
  .add('empty', () => {
    const props = {}
    return <StubContainer Component={UserProfileComponent} props={props} />
  })
  .add('Prague location', () => {
    const initialState = {
      currentUser: {
        profile: {
          location: "Prague"
        }
      }
    }
    return <StubContainer Component={UserProfileComponent} props={initialState} />
  })
