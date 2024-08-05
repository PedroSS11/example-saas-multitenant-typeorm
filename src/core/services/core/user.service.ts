import { UserRepository } from 'src/persistence/repository/core/user.repository';
import { CoreDatasourceService } from '../datasource/datasource.service';
import { User } from 'src/persistence/entities/core/user.entity';
import { NotImplementedException } from 'src/core/exceptions/NotImplemented.exception';

export class UserService {
  private readonly _coreDatasourceService: CoreDatasourceService;
  private _userRepo: UserRepository;

  constructor() {
    this._coreDatasourceService = new CoreDatasourceService();
  }

  public async initialize(tenantName: string): Promise<void> {
    const connection =
      await this._coreDatasourceService.getDatabaseConnection(tenantName);
    this._userRepo = new UserRepository(connection);
  }

  public async create(): Promise<User> {
    throw new NotImplementedException();
  }
}
