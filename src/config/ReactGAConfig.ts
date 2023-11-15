import ReactGA from 'react-ga4';

ReactGA.initialize(import.meta.env.VITE_FIREBASE_MESSAGING_MEASURAMENT_ID, {
    // debug: true,
    // testMode: import.meta.env.VITE_LOCAL_ENV,
});
