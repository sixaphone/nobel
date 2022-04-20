import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassMapper } from '@common/mapper/class.mapper';
import { ServicingTypeEntity } from '@db/entities/servicing-type.entity';
import { ServicingTypeService } from '@servicing-type/servicing-type.service';
import { ServicingTypeController } from '@servicing-type/servicing-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServicingTypeEntity])],
  providers: [ServicingTypeService, ClassMapper],
  controllers: [ServicingTypeController],
})
export class ServicingTypeModule {}
