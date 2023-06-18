import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store/store';

// style + assets
import 'assets/scss/style.scss';
import config from './config';
import { EventType, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import msalConfig from 'azure/authConfig';

export const msalInstance = new PublicClientApplication(msalConfig);

if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

// Optional - This will update account state if a user signs in from another tab or window
msalInstance.enableAccountStorageEvents();

msalInstance.addEventCallback((e) => {
  if (e.eventType === EventType.LOGIN_SUCCESS && e.payload.account) {
    const account = e.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
if (window.location.hash !== '') {
  console.log('hash found' + window.location.hash);
} else {
  root.render(
    <Provider store={store}>
      <MsalProvider instance={msalInstance}>
        <BrowserRouter basename={config.basename}>
          <App pca={msalInstance} />
        </BrowserRouter>
      </MsalProvider>
    </Provider>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
