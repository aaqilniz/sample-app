import {model} from '@loopback/repository';
import {Post} from './post.model';

@model()
export class Letter extends Post {
  constructor(data?: Partial<Letter>) {
    super(data);
  }
}

export interface LetterRelations {
  // describe navigational properties here
}

export type LetterWithRelations = Letter & LetterRelations;
