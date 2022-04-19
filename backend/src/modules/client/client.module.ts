import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '@db/entities/client.entity';
import { ClassMapper } from '@common/mapper/class.mapper';
import { ClientService } from '@client/client.service';
import { ClientController } from '@client/client.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  providers: [ClientService, ClassMapper],
  controllers: [ClientController],
})
export class ClientModule {}
