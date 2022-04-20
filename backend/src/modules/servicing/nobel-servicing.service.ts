import { Repository, SelectQueryBuilder } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ServicingEntity,
  ServicingRelation,
} from '@db/entities/servicing.entity';
import {
  ServicingListWhereOptions,
  ServicingRepository,
} from '@db/repositories/servicing.repository';
import { ServicingCreateDto } from '@servicing/dto/servicing.create.dto';
import { ClientService } from '@client/client.service';
import { ServicingStatus } from '@servicing/servicing.status';
import { NobelServiceService } from '@service/nobel-service.service';
import { ServicingUpdateDto } from '@servicing/dto/servicing.update.dto';

@Injectable()
export class NobelServicingService {
  private readonly servicings: ServicingRepository;

  constructor(
    @InjectRepository(ServicingEntity)
    servicings: Repository<ServicingEntity>,
    private readonly clientService: ClientService,
    private readonly nobelServiceService: NobelServiceService,
  ) {
    this.servicings = servicings.extend(ServicingRepository);
  }

  public list(
    where?: ServicingListWhereOptions,
    options?: { relations?: ServicingRelation[] },
  ): Promise<ServicingEntity[]> {
    return this.servicings.filter(where, options);
  }

  public getById(
    clientId: string,
    options?: { relations?: ServicingRelation[] },
  ): Promise<ServicingEntity> {
    let relationQb;

    if (options?.relations) {
      relationQb = (query: SelectQueryBuilder<ServicingEntity>) => {
        const relations = new Set(options.relations);

        if (relations.has('service')) {
          query.innerJoinAndSelect('servicings.service', 'service');
        }

        if (relations.has('client')) {
          query.innerJoinAndSelect('servicings.client', 'client');
        }

        if (relations.has('user')) {
          query.innerJoinAndSelect('servicings.user', 'user');
        }
      };
    }

    return this.servicings.getById(clientId, {
      alias: 'servicings',
      relationQb,
    });
  }

  public async createServicing(
    payload: ServicingCreateDto,
  ): Promise<ServicingEntity> {
    const serviceId = await this.resolveService({
      serviceId: payload.serviceId,
      serviceName: payload.service,
    });

    const clientId = await this.resolveClient({
      clientName: payload.client,
      clientId: payload.clientId,
      serviceId,
    });

    return this.servicings.save(
      this.servicings.create({
        serviceAtHours: payload.serviceAtHours,
        servicedAt: payload.servicedAt,
        currency: payload.currency,
        handsCost: payload.handsCost,
        price: payload.price,
        status: payload.status ?? ServicingStatus.COMPLETED,
        managerComment: payload.managerComment,
        workerComment: payload.workerComment,
        paymentMethod: payload.paymentMethod,
        typeId: payload.typeId,
        isMarked: false,
        userId: payload.userId,
        clientId,
        serviceId,
      }),
    );
  }

  public async updateServicing(
    servicingId: string,
    payload: ServicingUpdateDto,
  ): Promise<ServicingEntity> {
    const servicing = await this.servicings.getById(servicingId);

    if (payload.service || payload.serviceId) {
      servicing.serviceId = await this.resolveService({
        serviceName: payload.service,
        serviceId: payload.serviceId,
      });
    }

    if (payload.client || payload.clientId) {
      servicing.clientId = await this.resolveClient({
        clientName: payload.client,
        clientId: payload.clientId,
        serviceId: servicing.serviceId,
      });
    }

    if (payload.servicedAt) {
      servicing.servicedAt = payload.servicedAt;
    }

    if (payload.currency) {
      servicing.currency = payload.currency;
    }

    if (typeof payload.handsCost !== 'undefined') {
      servicing.handsCost = payload.handsCost;
    }

    if (typeof payload.price !== 'undefined') {
      servicing.price = payload.price;
    }

    if (payload.managerComment) {
      servicing.managerComment = payload.managerComment;
    }

    if (payload.workerComment) {
      servicing.workerComment = payload.workerComment;
    }

    if (payload.serviceAtHours) {
      servicing.serviceAtHours = payload.serviceAtHours;
    }

    if (payload.paymentMethod) {
      servicing.paymentMethod = payload.paymentMethod;
    }

    if (payload.typeId) {
      servicing.typeId = payload.typeId;
    }

    if (payload.status) {
      servicing.status = payload.status;
    }

    return this.servicings.save(servicing);
  }

  public async deleteServicing(servicingId: string): Promise<void> {
    const servicing = await this.servicings.getById(servicingId);

    await this.servicings.softRemove(servicing);
  }

  private async resolveService(options: {
    serviceName?: string;
    serviceId?: string;
  }): Promise<string> {
    if (options.serviceId) {
      const service = await this.nobelServiceService.getById(options.serviceId);

      return service.id;
    }

    if (options.serviceName) {
      const service = await this.nobelServiceService.createService({
        name: options.serviceName,
      });

      return service.id;
    }

    throw new BadRequestException('Service not provided');
  }

  private async resolveClient(options: {
    clientName?: string;
    clientId?: string;
    serviceId: string;
  }): Promise<string> {
    if (options.clientId) {
      const client = await this.clientService.getById(options.clientId);

      return client.id;
    }

    if (options.clientName) {
      const client = await this.clientService.createClient({
        name: options.clientName,
        serviceId: options.serviceId,
      });

      return client.id;
    }

    throw new BadRequestException('Client not provided');
  }
}
