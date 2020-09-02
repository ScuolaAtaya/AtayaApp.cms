import { Option } from './../options';
import { Media } from './../media';
import { Work } from '../work';
import { Marker } from '../marker';

export class Read extends Work {
    picture: Media;
    options: Option[];
    markers: Marker[];
}
