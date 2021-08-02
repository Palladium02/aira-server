import EventEmitter from 'events';
import isEmpty from '../../utils/isEmpty';
import Driver from '../driver/Driver';
import Session from './Session';
import { SessionInfo, LoginResponse } from './Types';

class Authentication {
  private driver: Driver;
  private userTableName: string;
  private sessions: Map<string, Session>;
  private emitter: EventEmitter;

  constructor(path: string, userTableName: string) {
    this.driver = new Driver(path);
    this.userTableName = userTableName;
    this.sessions = new Map();
    this.emitter = new EventEmitter();

    this.emitter.addListener('delete', (data: SessionInfo) => {
      this.sessions.delete(data.id);
    });
  }

  public login(email: string, password: string): LoginResponse {
    let { result, error } = this.driver.find(
      {
        email,
      }, 
      this.userTableName,
      true
    );
    if(error) return { id: null, error: { description: '', date: Date.now() } };
    if(isEmpty(result)) return { id: null, error: { description: '', date: Date.now() } };

    if(password === result[0]!.password) {
      let sessionId: string = `${Date.now()}${Math.random()}`;
      let session: Session = new Session({
        email: result[0].email,
        username: result[0].username,
        id: sessionId,
        emitter: this.emitter
      });

      this.sessions.set(sessionId, session);
      return { id: sessionId, error: null };
    }
    return { id: null, error: { description: '', date: Date.now() } };
  }

  public logout(id: string): void {
    this.sessions.delete(id);
  }

  public isValidId(id: string): boolean {
    return this.sessions.has(id);
  }

  public getSession(id: string): Session {
    return this.sessions.get(id);
  }
}

const authentication: Authentication = new Authentication(process.env.ROOT_DIR!, 'aira/user');
export default authentication;