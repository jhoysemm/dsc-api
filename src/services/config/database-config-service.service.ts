import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
      return {
          type: 'postgres',
          port: this.configService.get<number>('DB_PORT'),
          host: this.configService.get<string>('DB_HOST'),
          username: this.configService.get<string>('DB_USERNAME'),
          password: this.configService.get<string>('DB_PASSWORD'),
          database: this.configService.get<string>('DB_DATABASE'),
          synchronize: true,
          entities: [__dirname + '/../../**/*.entity.{js,ts}'],
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false
            }
          }
      }

      // return {
      //   type: 'sqlite',
      //   database: this.configService.get<string>('DB_DATABASE'),
      //   synchronize: true,
      //   entities: [__dirname + '/../../**/*.entity.{js,ts}'],
      //   ssl: true,
      //   extra: {
      //     ssl: {
      //       rejectUnauthorized: false
      //     }
      //   }
  }
}
