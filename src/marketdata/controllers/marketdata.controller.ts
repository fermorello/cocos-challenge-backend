import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { MarketDataService } from '../services/marketdata.service';

export class MarketDataController {
  constructor(
    private readonly instrumentService: MarketDataService,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
}
