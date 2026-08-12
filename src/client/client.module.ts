import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './entity/client.entity';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]),
    
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'secret',
      signOptions: { expiresIn: '1m' },
    }),
  ],
  providers: [ClientService, JwtStrategy],
  controllers: [ClientController],
})
export class ClientModule {}
