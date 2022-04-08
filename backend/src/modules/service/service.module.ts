import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from '@db/entities/service.entity';
import { ServiceController } from '@service/service.controller';
import { NobelServiceService } from '@service/nobel-service.service';
import { ClassMapper } from '@common/mapper/class.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  providers: [NobelServiceService, ClassMapper],
  controllers: [ServiceController],
})
export class ServiceModule {}
