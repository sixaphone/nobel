import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CostRepository } from '@db/repositories/cost.repository';
import { CostCreateDto } from '@cost/dto/cost.create.dto';
import { CostUpdateDto } from '@cost/dto/cost.update.dto';
import { CostEntity } from '@db/entities/cost.entity';

@Injectable()
export class CostService {
  private readonly costs: CostRepository;

  constructor(
    @InjectRepository(CostEntity)
    costs: Repository<CostEntity>,
  ) {
    this.costs = costs.extend(CostRepository);
  }

  public list(query?: { withDeleted?: boolean }): Promise<CostEntity[]> {
    return this.costs.find({
      withDeleted: !!query?.withDeleted,
    });
  }

  public getById(costId: string): Promise<CostEntity> {
    return this.costs.getById(costId);
  }

  public async createCost(payload: CostCreateDto): Promise<CostEntity> {
    return this.costs.save(
      this.costs.create({
        name: payload.name,
        unit: payload.unit,
        price: payload.price,
      }),
    );
  }

  public async updateCost(
    costId: string,
    payload: CostUpdateDto,
  ): Promise<CostEntity> {
    const cost = await this.costs.getById(costId);

    if (payload.name) {
      cost.name = payload.name;
    }

    if (payload.unit) {
      cost.unit = payload.unit;
    }

    if (typeof payload.price !== 'undefined') {
      cost.price = payload.price;
    }

    return this.costs.save(cost);
  }

  public async deleteCost(costId: string): Promise<void> {
    const cost = await this.costs.getById(costId);

    await this.costs.softRemove(cost);
  }
}
