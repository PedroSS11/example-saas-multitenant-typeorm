import { UserRepository } from '../../../persistence/repository/core/user.repository';
import { CoreDatasourceService } from '../datasource/datasource.service';
import { User } from '../../../persistence/entities/core/user.entity';
import { CreateUserDTO } from 'src/core/dto/core/user.dto';

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

  public async create(userData: CreateUserDTO): Promise<User> {
    const userEntityData = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      age: userData.age,
      gender: userData.gender,
    });
    const userEntity = await this._userRepo.save(userEntityData);
    return userEntity;
  }
}
