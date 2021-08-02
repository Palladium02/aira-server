import express, { Request, Response, IRouter } from 'express';
import Driver from '../services/driver/Driver';
import authentication from '../services/auth/Authentication';
import authGuard from '../utils/authGuard';
import Session from '../services/auth/Session';
import Auth from './Auth';

const API: IRouter = express.Router();
const driver: Driver = new Driver(process.env.ROOT_DIR!);

API.use(express.json());
API.use(express.urlencoded({ extended: false }));

API.post('/find', (req: Request, res: Response) => {
  authGuard({
    req,
    res,
    accepted: (req: Request, res: Response) => {
      let query = req.body.query;
      let databaseName = req.body.databaseName;

      let result = driver.find(query, databaseName);
      res.send(result);
    },
    declined: (req: Request, res: Response) => {
      res.send({
        result: [],
        error: ''
      });
    }
  });
});

API.post('/findOne', (req: Request, res: Response) => {
  authGuard({
    req,
    res,
    accepted: (req: Request, res: Response) => {
      let query = req.body.query;
      let databaseName: string = req.body.databaseName;

      let result = driver.find(query, databaseName, true);
      res.send(result);
    },
    declined: (req: Request, res: Response) => {
      res.send({
        result: [],
        error: ''
      });
    }
  });
});

API.post('/insert', (req: Request, res: Response) => {
  authGuard({
    req,
    res,
    accepted: (req: Request, res: Response) => {
      let data = req.body.data;
      let databaseName: string = req.body.databaseName;

      let result = driver.insert(data, databaseName);
      res.send(result);
    },
    declined: (req: Request, res: Response) => {
      res.send({
        success: false,
        error: ''
      });
    }
  });
});

API.post('/update', (req: Request, res: Response) => {
  authGuard({
    req,
    res,
    accepted: (req: Request, res: Response) => {
      let query = req.body.query;
    	let update = req.body.update;
    	let databaseName: string = req.body.databaseName;
      	
    	let result = driver.update(query, update, databaseName);
    	res.send(result);
    },
    declined: (req: Request, res: Response) => {
      res.send({
        success: false,
        error: ''
      });
    }
  });
});

API.post('/deleteEntry', (req: Request, res: Response) => {
  authGuard({
    req,
    res,
    accepted: (req: Request, res: Response) => {
      let query = req.body.query;
      let databaseName: string = req.body.databaseName;

      let result = driver.deleteEntry(query, databaseName);
      res.send(result);
    },
    declined: (req: Request, res: Response) => {
      res.send({
        success: false,
        error: ''
      });
    }
  });
});

API.post('/dropTable', (req: Request, res: Response) => {
  authGuard({
    req,
    res,
    accepted: (req: Request, res: Response) => {
      let tableName: string = req.body.tableName;

      let result = driver.dropTable(tableName);
      res.send(result);
    },
    declined: (req: Request, res: Response) => {
      res.send({
        success: false,
        error: ''
      });
    }
  });
});

API.post('/getUserInfo', (req: Request, res: Response) => {
  authGuard({
    req,
    res,
    accepted: (req: Request, res: Response) => {
      let session: Session = authentication.getSession(req.body.id);

      res.send(session);
    },
    declined: (req: Request, res: Response) => {
      res.send({});
    }
  });
});

API.post('/getTotalStorageUsage', (req: Request, res: Response) => {
  authGuard({
    req,
    res,
    accepted: (req: Request, res: Response) => {
      let session = authentication.getSession(req.body.id);
      let getAmountOfTables = driver.getTableNames(session!.email);
      let sizeOfAllTables = driver.getSizeOfAllTables(session!.email);

      res.send({
        bytes: sizeOfAllTables,
        tables: getAmountOfTables.length
      });
    },
    declined: (req: Request, res: Response) => {
      res.send({});
    }
  });
});

export default Auth;
