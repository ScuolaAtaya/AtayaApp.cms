import { Media } from './../media';
import { Work } from '../work';

export class Write  extends Work {
    audio: Media;
    picture: Media;
    word: string;
    letters: string[];
}
