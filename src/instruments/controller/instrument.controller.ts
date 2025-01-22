import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { InstrumentService } from '../services/instrument.service';

export class InstrumentController {
  constructor(
    private readonly instrumentService: InstrumentService,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  async getInstrument(req: Request, res: Response) {
    const { q } = req.query;
    if (!q) {
      return this.httpResponse.NoContent(res);
    }
    try {
      const portfolio = await this.instrumentService.findByNameOrTicker(
        String(q)
      );
      return this.httpResponse.Ok(res, portfolio);
    } catch (e) {
      console.error(e);
      return this.httpResponse.ERROR(res, e);
    }
  }
}
