import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'ms-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
    trackSize: number;
    currentTime: number;
    audio: HTMLAudioElement;
    playButtonIcon = 'play_arrow';
    dragging = false;
    playing = false;
    loading = false;
    @Input() audioSource: string;
    @Input() showTime = true;

    constructor() {
    }

    ngOnInit() {
    }

    toggleAudio() {
        if (this.playing) {
            // Do stuff
            this.playButtonIcon = 'play_arrow';
            this.playing = false;
            if (this.audio !== undefined) {
                this.audio.pause();
            }
        } else {
            // Do other stuff
            this.playButtonIcon = 'pause';
            this.playing = true;
            if (this.audio === undefined) {
                this.setupAudio();
            }
            this.audio.play();
        }
    }

    setupAudio() {
        // stuff and things
        this.loading = true;
        this.audio = new Audio();
        this.audio.src = this.audioSource;
        this.audio.load();
        this.audio.addEventListener('loadedmetadata', (event) => {
            this.loading = false;
            this.trackSize = this.audio.duration
        });
        this.audio.addEventListener('timeupdate', (event) => {
            if (!this.dragging) {
                this.currentTime = this.audio.currentTime;
            }
        });
    }

    formatSeconds(seconds: number) {
        const date = new Date(null);
        date.setSeconds(seconds !== undefined ? seconds : 0); // specify value for SECONDS here
        const result = date.toISOString().substr(14, 5);
        return result
    }

    seekAudio(event) {
        this.audio.currentTime = event.value;
    }

    setDragging(isDragging: boolean) {
        console.log('dragging = ' + isDragging);
        this.dragging = isDragging;
        if (isDragging) {
            addEventListener('mouseup', () => {
                this.dragging = false;
                console.log('dragging = ' + false);
            })
        }
    }

}
