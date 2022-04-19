import { Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ClientListWhereOptions,
  ClientRepository,
} from '@db/repositories/client.repository';
import { ClientEntity, ClientRelation } from '@db/entities/client.entity';
import { ClientCreateDto } from '@client/dto/client.create.dto';
import { DateTime } from 'luxon';
import { ClientUpdateDto } from '@client/dto/client.update.dto';

@Injectable()
export class ClientService {
  private readonly clients: ClientRepository;

  constructor(
    @InjectRepository(ClientEntity)
    clients: Repository<ClientEntity>,
  ) {
    this.clients = clients.extend(ClientRepository);
  }

  public list(
    query?: ClientListWhereOptions,
    options?: { relations?: ClientRelation[] },
  ): Promise<ClientEntity[]> {
    return this.clients.filter(query, options);
  }

  public getById(
    clientId: string,
    options?: { relations?: ClientRelation[] },
  ): Promise<ClientEntity> {
    let relationQb;

    if (options?.relations) {
      relationQb = (query: SelectQueryBuilder<ClientEntity>) => {
        const relations = new Set(options.relations);

        if (relations.has('service')) {
          query.innerJoinAndSelect('clients.service', 'service');
        }
      };
    }

    return this.clients.getById(clientId, { alias: 'clients', relationQb });
  }

  public async createClient(payload: ClientCreateDto): Promise<ClientEntity> {
    const list =
      payload.list ??
      `${DateTime.local().month}/${DateTime.local().plus({ months: 6 }).month}`;

    return this.clients.save(
      this.clients.create({
        name: payload.name,
        serviceId: payload.serviceId,
        type: payload.type,
        address: payload.address,
        comment: payload.comment,
        lat: payload.lat,
        lng: payload.lng,
        phone: payload.phone,
        email: payload.email,
        image: '',
        isMarked: false,
        isProblematic: false,
        list,
      }),
    );
  }

  public async updateClient(
    clientId: string,
    payload: ClientUpdateDto,
  ): Promise<ClientEntity> {
    const client = await this.clients.getById(clientId);
    if (payload.name) {
      client.name = payload.name;
    }

    if (payload.serviceId) {
      client.serviceId = payload.serviceId;
    }

    if (payload.type) {
      client.type = payload.type;
    }

    if (payload.address) {
      client.address = payload.address;
    }

    if (payload.comment) {
      client.comment = payload.comment;
    }

    if (payload.lat) {
      client.lat = payload.lat;
    }

    if (payload.lng) {
      client.lng = payload.lng;
    }

    if (payload.phone) {
      client.phone = payload.phone;
    }

    if (payload.email) {
      client.email = payload.email;
    }

    if (typeof payload.isMarked !== 'undefined') {
      client.isMarked = payload.isMarked;
    }

    if (typeof payload.isProblematic !== 'undefined') {
      client.isProblematic = payload.isProblematic;
    }

    if (payload.list) {
      client.list = payload.list;
    }

    return this.clients.save(client);
  }

  public async deleteClient(clientId: string): Promise<void> {
    const client = await this.clients.getById(clientId);

    await this.clients.softRemove(client);
  }
}
