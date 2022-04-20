import {model, property} from '@loopback/repository';
import {Post} from './post.model';

@model()
export class Letter extends Post {
  @property({type: 'string', id: true})
  letterTo: string;
  constructor(data?: Partial<Letter>) {
    super(data);
  }
}

export interface LetterRelations {
  // describe navigational properties here
}

export type LetterWithRelations = Letter & LetterRelations;
