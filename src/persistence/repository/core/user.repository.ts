import { DefaultTypeOrmRepository } from 'src/infra/typeorm/repository/default-typeorm.repository';
import { User } from 'src/persistence/entities/core/user.entity';
import { DataSource } from 'typeorm';

export class UserRepository extends DefaultTypeOrmRepository<User> {
  constructor(readonly dataSource: DataSource) {
    super(User, dataSource);
  }
}
