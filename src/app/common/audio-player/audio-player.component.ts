import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'ms-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
    trackSize: number;
    currentTime: number;
    audio: HTMLAudioElement;
    playButtonIcon = 'play_arrow';
    dragging = false;
    playing = false;
    loading = false;
    _audioSource: string;
    // @Input() audioSource: string;
    @Input() showTime = true;

    constructor() {
    }

    @Input()
    set audioSource(audio: string) {
        console.log('resetting: ' + audio);
        this._audioSource = audio;
        this.resetAudio();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.audio.pause()
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

    resetAudio() {
        if (this.audio !== undefined) {
            this.audio.currentTime = 0;
            this.playing = false;
            this.audio.src = this._audioSource;
        }
    }

    setupAudio() {
        // stuff and things
        this.loading = true;
        this.audio = new Audio();
        this.audio.src = this._audioSource;
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
        return date.toISOString().substr(14, 5)
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
