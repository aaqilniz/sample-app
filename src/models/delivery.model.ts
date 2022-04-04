import {Entity, hasOne, model, property} from '@loopback/repository';
import {Post} from '.';

@model()
export class Delivery extends Entity {
  constructor(data?: Partial<Delivery>) {
    super(data);
  }
  @hasOne(() => Post, {
    polymorphic: {
      discriminator: 'post_type',
    },
  })
  post: Post;
  @property({type: 'string', required: true})
  // eslint-disable-next-line @typescript-eslint/naming-convention
  post_type: string;
  @property({type: 'string', id: true, generated: true})
  id: string;
}

export interface DeliveryRelations {
  // describe navigational properties here
}

export type DeliveryWithRelations = Delivery & DeliveryRelations;
