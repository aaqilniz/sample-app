import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Delivery, DeliveryWithRelations} from '.';

@model()
export class Post extends Entity {
  @property({type: 'number', id: true, generated: true})
  id: number;
  @belongsTo(() => Delivery)
  deliveryId: string;

  constructor(data?: Partial<Post>) {
    super(data);
  }
}

export interface PostRelations {
  // describe navigational properties here
  delivery?: DeliveryWithRelations;
}

export type PostWithRelations = Post & PostRelations;
