import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/users/users.controller';
import { UserRepository } from 'src/domain/repositories/UserRepository.repository';
import { UsersService } from 'src/services/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [PassportModule]
})
export class UsersModule {}
