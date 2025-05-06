const env = (window as any).__env__ || {};

export const environment = {
  production: false,
  baseUrl: env['BACKEND_URL'],
  paypanButtonId: env['PAYPAL_BUTTON_ID'],
  firebase: {
    projectId: env['PROJECT_ID'],
    appId: env['APP_ID'],
    storageBucket: env['STORAGE_BUCKET'],
    apiKey: env['API_KEY'],
    authDomain: env['AUTH_DOMAIN'],
    messagingSenderId: env['MESSAGING_SENDER_ID'],
  }
}