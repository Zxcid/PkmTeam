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
      login: `${env['BACKEND_URL']}/user/login`
    },
    team: {
      save: `${env['BACKEND_URL']}/team/save`,
      check_name: `${env['BACKEND_URL']}/team/check-name`
    },
    pokemon: `${env['BACKEND_URL']}/pokemon`
  }
}