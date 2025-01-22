import { HttpResponse } from '../../shared/response/http.response';
import { UserService } from '../services/user.service';

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
}
