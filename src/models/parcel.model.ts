import {model, property} from '@loopback/repository';
import {Post} from './post.model';

@model()
export class Parcel extends Post {
  // 625fda9beaabe10a826c6ea8
  @property({type: 'string', id: true})
  parcelTo: string;
  constructor(data?: Partial<Parcel>) {
    super(data);
  }
}

export interface ParcelRelations {
  // describe navigational properties here
}

export type ParcelWithRelations = Parcel & ParcelRelations;
