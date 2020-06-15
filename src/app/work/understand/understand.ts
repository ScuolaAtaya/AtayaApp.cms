import { Question } from './../question';
import { Media } from './../media';
import { Work } from '../work';

export class Understand extends Work {
    video_url: Media;
    audio: Media;
    questions: Question[];
}
