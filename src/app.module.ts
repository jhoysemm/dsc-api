import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalasModule } from './modules/salas/salas.module';
import { FilmesModule } from './modules/filmes/filmes.module';
import { UsersModule } from './modules/users/users.module';
import { IngressosModule } from './modules/ingressos/ingressos.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './services/config/database-config-service.service';
import { HomeController } from './controllers/home/home.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      inject: [DatabaseConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SalasModule, 
    FilmesModule, 
    UsersModule,
    IngressosModule,
    AuthModule
  ],
  controllers: [HomeController],
  providers: [],
})
export class AppModule {}
