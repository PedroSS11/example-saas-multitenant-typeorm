import { DefaultTypeOrmRepository } from '../../../infra/typeorm/repository/default-typeorm.repository';
import { User } from '../../../persistence/entities/core/user.entity';
import { DataSource } from 'typeorm';

export class UserRepository extends DefaultTypeOrmRepository<User> {
  constructor(readonly dataSource: DataSource) {
    super(User, dataSource);
  }
}
