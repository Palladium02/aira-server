import EventEmitter from 'events';

class Session {
  email: string;
  username: string;
  id: string;
  emitter: EventEmitter;

  constructor({ email, username, id, emitter }) {
    this.email = email;
    this.username = username;
    this.id = id;
    this.emitter = emitter;

    setTimeout(() => {
      this.emitter.emit('delete', {
        email: this.email,
        id: this.id
      });
    }, 1000 * 3600 * 2);
  }
}

export default Session;