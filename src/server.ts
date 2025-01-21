import morgan from 'morgan';
import express from 'express';
import { ConfigServer } from './config/config';
import { ErrorMiddleware } from './shared/middleware/error.middleware';

class ServerBootstrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnv('PORT');

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));

    this.app.use('/api', this.routers());
    this.app.use(ErrorMiddleware.error);
    this.listen();
  }

  public routers(): Array<express.Router> {
    return [];
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log('Server listening on port => ' + this.port);
    });
  }
}

new ServerBootstrap();
