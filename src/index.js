import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import './styles/index.css';
import configureStore, { history } from './configureStore'
// Import i18n messages
import { translationMessages } from './i18n';
import LanguageProvider from 'containers/LanguageProvider';


const store = configureStore()
const render = (messages) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <App history={history} />
        </LanguageProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(translationMessages)

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render(translationMessages)
  })
}
