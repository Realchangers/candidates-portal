import React from 'react'

import {
  MemoryRouter,
  Route
} from 'react-router'

// wraps a story in React Router, so we can use the <Link> component
const storyRouterDecorator = () => {
  const decorator = story => (
    <MemoryRouter>
      <Route render={() => story()} />
    </MemoryRouter>
  )
  decorator.displayName = 'StoryRouter'
  return decorator
}

export default storyRouterDecorator
