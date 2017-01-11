import * as firebase from 'firebase';

export default class Firebase {
  constructor(apiKey) {
    this.config = {
      apiKey,
      authDomain: 'onsdagsmassan-e0d2b.firebaseapp.com',
      databaseURL: 'https://onsdagsmassan-e0d2b.firebaseio.com',
      storageBucket: 'onsdagsmassan-e0d2b.appspot.com',
      messagingSenderId: '609236969262',
    };

    this.app = firebase.initializeApp(this.config);
    this.database = this.app.database();
  }

  static of(apiKey) {
    return new Firebase(apiKey);
  }

  get(ref) {
    return this.database.ref(ref)
      .once('value')
      .then(snap => snap.val());
  }

  getSections() {
    return this.get('sections');
  }

  getSection(section) {
    return this.get(`sections/${section}`);
  }
}
