import { Request, Response } from 'express';
import { PortfolioService } from '../../portfolio/services/portfolio.service';
import { HttpResponse } from '../../shared/response/http.response';
import { UserService } from '../services/user.service';

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly portfolioService: PortfolioService,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getPortfolio(req: Request, res: Response) {
    const { userId } = req.query;
    if (!userId) {
      return this.httpResponse.NoContent(res);
    }
    try {
      const portfolio = await this.portfolioService.getUserPortfolio(
        Number(userId)
      );
      return this.httpResponse.Ok(res, portfolio);
    } catch (e) {
      return this.httpResponse.ERROR(res, e);
    }
  }
}
