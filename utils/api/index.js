import Firebase from './firebase';

const app = Firebase.of(process.env.FB_API_KEY);

export const getSections = app.getSections.bind(app);
export const getSection = app.getSection.bind(app);
