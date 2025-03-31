const env = (window as any).__env__ || {};

export const environment = {
  production: false,
  firebase: {
    projectId: env['PROJECT_ID'],
    appId: env['APP_ID'],
    storageBucket: env['STORAGE_BUCKET'],
    apiKey: env['API_KEY'],
    authDomain: env['AUTH_DOMAIN'],
    messagingSenderId: env['MESSAGING_SENDER_ID'],
  },
  api: {
    user: {
      login: 'http://localhost:8080/user/login'
    },
    team: {
      save: 'http://localhost:8080/team/save',
      check_name: 'http://localhost:8080/team/check-name'
    },
    pokemon: 'http://localhost:8080/pokemon'
  }
}