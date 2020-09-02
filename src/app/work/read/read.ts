import { Answer } from './../answer';
import { Media } from './../media';
import { Work } from '../work';
import { Marker } from '../marker';

export class Read extends Work {
    picture: Media;
    options: Answer[];
    markers: Marker[];
}
