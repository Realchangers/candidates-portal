import { configure, addDecorator } from '@storybook/react'

import '../src/index.scss'

import StoryRouterDecorator from './StoryRouterDecorator'

addDecorator(StoryRouterDecorator())

function loadStories() {
  require('../stories/AccountStory')
  require('../stories/UserProfileStory')
  // require('../stories/JobOffersListStory')
  require('../stories/JobDetailStory')
}

configure(loadStories, module)
