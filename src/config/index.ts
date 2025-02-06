const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_BASE_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME,
  API_KEY: import.meta.env.VITE_API_KEY,
  AUTH_DOMAIN: import.meta.env.VITE_AUTH_DOMAIN,
  PROJECT_ID: import.meta.env.VITE_PROJECT_ID,
  STORAGE_BUCKET: import.meta.env.VITE_STORAGE_BUCKET,
  MESSAGING_SENDER_ID: import.meta.env.VITE_MESSAGING_SENDER_ID,
  APP_ID: import.meta.env.VITE_APP_ID,
  MEASUREMENT_ID: import.meta.env.VITE_MEASUREMENT_ID
}

console.log(CONFIG)

export default CONFIG
