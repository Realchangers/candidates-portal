import { configure } from '@storybook/react'

import '../src/index.scss'

function loadStories() {
  require('../stories/AccountStory')
  require('../stories/UserProfileStory')
  // require('../stories/JobOffersListStory')
  require('../stories/JobDetailStory')
}

configure(loadStories, module)
