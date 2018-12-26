import React from 'react'
import { storiesOf } from '@storybook/react'

import AccountComponent from '../src/Profile/AccountComponent'

storiesOf('Cognito profile', module)
  .add('empty', () => {
    const props = {
      storybook: true
    }
    return <AccountComponent initialState={props} />
  })
  .add('with user details', () => {
    const props = {
      given_name: 'Marian',
      family_name: 'Bouček',
      email: 'test@gmail.com',
      storybook: true
    }
    return <AccountComponent initialState={props} />
  })
  .add('update successful', () => {
    const props = {
      given_name: 'Marian',
      family_name: 'Bouček',
      email: 'test@gmail.com',
      cognitoResponse: {
        isError: false,
        message: 'The user has been successfully updated.'
      },
      storybook: true
    }
    return <AccountComponent initialState={props} />
  })
  .add('failed update', () => {
    const props = {
      given_name: 'Marian',
      family_name: 'Bouček',
      email: 'invalid-email',
      cognitoResponse: {
        isError: true,
        message: 'Unable to save email with invalid value.'
      },
      storybook: true
    }
    return <AccountComponent initialState={props} />
  })
