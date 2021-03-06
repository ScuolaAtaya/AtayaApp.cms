import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'ms-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
    @Input() showTime: boolean;
    trackSize: number;
    currentTime: number;
    audio: HTMLAudioElement;
    playButtonIcon: string;
    dragging: boolean;
    playing: boolean;
    loading: boolean;
    _audioSource: string;

    constructor() {
        this.playButtonIcon = 'play_arrow';
        this.showTime = true;
        this.dragging = false;
        this.playing = false;
        this.loading = false;
    }

    @Input()
    set audioSource(audio: string) {
        this._audioSource = audio;
        this.resetAudio();
    }

    ngOnInit() { }

    ngOnDestroy() {
        if (this.audio !== undefined) {
            this.audio.pause();
        }
    }

    toggleAudio() {
        if (this.playing) {
            this.playButtonIcon = 'play_arrow';
            this.playing = false;
            if (this.audio !== undefined) {
                this.audio.pause();
            }
        } else {
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
        this.loading = true;
        this.audio = new Audio();
        this.audio.src = this._audioSource;
        this.audio.load();
        this.audio.addEventListener('loadedmetadata', () => {
            this.loading = false;
            this.trackSize = this.audio.duration
        });
        this.audio.addEventListener('timeupdate', () => {
            if (!this.dragging) {
                this.currentTime = this.audio.currentTime;
            }
        });
    }

    formatSeconds(seconds: number) {
        try {
            const date = new Date(null);
            date.setSeconds(seconds !== undefined ? seconds : 0);
            return date.toISOString().substr(14, 5);
        } catch (e) {
            return '00:00';
        }
    }

    seekAudio(event: any) {
        this.audio.currentTime = event.value;
    }

    setDragging(isDragging: boolean) {
        this.dragging = isDragging;
        if (isDragging) {
            addEventListener('mouseup', () => this.dragging = false);
        }
    }
}
