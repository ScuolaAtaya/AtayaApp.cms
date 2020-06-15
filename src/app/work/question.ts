import { Answer } from './answer';
import { Media } from './media';

export class Question {
  body: string;
  audio: Media;
  picture: Media;
  answers: any;
}
