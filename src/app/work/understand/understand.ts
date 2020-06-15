import { Question } from './../question';
import { Media } from './../media';
import { Work } from '../work';
import { Answer } from '../answer';

export class Understand extends Work {
    video_url: Media;
    audio: Media;
    questions: UnderstandQuestion[];
}

export class UnderstandQuestion extends Question {
    answers: Answer[];
}
