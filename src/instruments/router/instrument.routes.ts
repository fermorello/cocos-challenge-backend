import { Request, Response } from 'express';
import { BaseRouter } from '../../config/base.router';
import { InstrumentServiceImp } from '../../shared/instances';
import { InstrumentController } from '../controller/instrument.controller';

const InstrumentControllerImp = new InstrumentController(InstrumentServiceImp);

export default class InstrumentRouter extends BaseRouter<InstrumentController> {
  constructor() {
    super(InstrumentControllerImp);
  }
  routes(): void {
    this.router.get('/instrument/search', (req: Request, res: Response): any =>
      this.controller.getInstrument(req, res)
    );
  }
}
