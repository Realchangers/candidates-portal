import React from 'react'
import { storiesOf } from '@storybook/react'
import StubContainer from 'react-storybooks-relay-container'

import JobDetail from '../src/JobDetail/JobDetail'

storiesOf('Job Detail', module)
  .add('default', () => {
    const props = {
      jobOffer: {
        title: 'Developer',
        company: 'Realchangers',
        description: 'Lorem ipsum',
        expiration: 'January 12, 2019',
        location: 'London, UK',
        salary: {
          start: '£28000',
          end: '£40000'
        }
      }
    }
    return <StubContainer Component={JobDetail} props={props} />
  })
  .add('no salary', () => {
    const props = {
      jobOffer: {
        title: 'Developer',
        company: 'Realchangers',
        description: 'Lorem ipsum',
        expiration: 'January 12, 2019',
        location: 'London, UK'
      }
    }
    return <StubContainer Component={JobDetail} props={props} />
  })
