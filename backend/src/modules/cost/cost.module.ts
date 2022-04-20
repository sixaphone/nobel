import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostController } from '@cost/cost.controller';
import { CostService } from '@cost/cost.service';
import { ClassMapper } from '@common/mapper/class.mapper';
import { CostEntity } from '@db/entities/cost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CostEntity])],
  providers: [CostService, ClassMapper],
  controllers: [CostController],
})
export class CostModule {}
