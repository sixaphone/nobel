import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '@db/entities/client.entity';
import { ServiceEntity } from '@db/entities/service.entity';
import { ServicingEntity } from '@db/entities/servicing.entity';
import { ClientService } from '@client/client.service';
import { NobelServiceService } from '@service/nobel-service.service';
import { NobelServicingService } from '@servicing/nobel-servicing.service';
import { ServicingController } from '@servicing/servicing.controller';
import { ClassMapper } from '@common/mapper/class.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceEntity, ClientEntity, ServicingEntity]),
  ],
  providers: [
    ClientService,
    NobelServicingService,
    NobelServiceService,
    ClassMapper,
  ],
  controllers: [ServicingController],
})
export class ServicingModule {}
