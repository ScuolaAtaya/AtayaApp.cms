import { Answer } from './../answer';
import { Media } from './../media';
import { Work } from '../work';

export class Read extends Work {
    picture: Media;
    options: Answer[];
}
