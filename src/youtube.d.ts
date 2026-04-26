declare namespace YT {
  class Player {
    constructor(
      elementId: string,
      options: {
        events?: {
          onStateChange?: (event: OnStateChangeEvent) => void;
          onReady?: (event: { target: Player }) => void;
        };
      },
    );
    destroy(): void;
    getPlayerState(): number;
    getCurrentTime(): number;
    getDuration(): number;
  }

  interface OnStateChangeEvent {
    data: number;
    target: Player;
  }

  // PlayerState: -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering, 5 cued
}

interface Window {
  YT: typeof YT;
  onYouTubeIframeAPIReady: () => void;
}
