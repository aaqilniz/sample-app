import {model} from '@loopback/repository';
import {Post} from './post.model';

@model()
export class Parcel extends Post {

  constructor(data?: Partial<Parcel>) {
    super(data);
  }
}

export interface ParcelRelations {
  // describe navigational properties here
}

export type ParcelWithRelations = Parcel & ParcelRelations;
