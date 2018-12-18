import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from 'aws-amplify'

import './index.scss'
import App from './App'

Amplify.configure({
  Auth: {
    identityPoolId: 'eu-west-2:81650f0e-48e1-49d5-8fd2-a0f7d2ee3b0f',
    region: 'eu-west-2',
    userPoolId: 'eu-west-2_jbfm49zM6',
    userPoolWebClientId: '4rh0vcpf08bsasnq7r6f65iaal'
  }
})

ReactDOM.render(<App />, document.getElementById('root'))
