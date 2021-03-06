/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import ReactPlayer from "react-player";
import { Dropzone } from "./Dropzone";
import { Embed, Toolbar, DarkMode, Theme } from "sancho";
import debug from "debug";

const log = debug("app:Video");

export interface VideoProps {
  url: string | null;
  children?: React.ReactNode;
  setVideoDuration: (seconds: number) => void;
  setVideoURL: (url: string, canSave: boolean, name?: string) => void;
  player: React.RefObject<ReactPlayer>;
  setCurrentTime: (seconds: number) => void;
}

export const Video: React.FunctionComponent<VideoProps> = ({
  setVideoURL,
  setVideoDuration,
  setCurrentTime,
  children,
  url,
  player
}) => {
  const [playing, setPlaying] = React.useState(true);

  React.useEffect(() => {
    try {
      if (url) {
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      // this is lazy, but will fire with non object url
    }
  }, []);

  const toolbar = (
    <DarkMode>
      {(theme: Theme) => (
        <Toolbar
          compressed
          css={{
            display: "flex",
            flex: "0 0 auto",
            paddingLeft: theme.spaces.sm + " !important",
            paddingRight: theme.spaces.md + " !important",
            justifyContent: "space-between",
            borderBottom: "1px solid",
            borderBottomColor: theme.colors.border.default
          }}
        >
          {children}
        </Toolbar>
      )}
    </DarkMode>
  );

  if (!url) {
    return (
      <DarkMode>
        <div
          css={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {toolbar}
          <div
            css={{
              flex: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Dropzone onRequestAddURL={setVideoURL} />
          </div>
        </div>
      </DarkMode>
    );
  }

  function onProgress(progress: any) {
    // log("progress: %o", progress);
    setCurrentTime(progress.playedSeconds);
  }

  function onDuration(duration: number) {
    log("duration: %s", duration);
    setVideoDuration(duration);
  }

  function onSeek(seconds: number) {
    log("seek: %s", seconds);
  }

  return (
    <div
      css={{
        width: "100%",
        height: "100%"
      }}
    >
      {toolbar}
      <div
        css={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          height: "calc(100% - 49px)"
        }}
      >
        <Embed width={16} height={9}>
          <ReactPlayer
            controls
            playsinline
            width="100%"
            ref={player}
            style={{ height: "100%", display: "flex" }}
            height="auto"
            playing={playing}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            url={url}
            onProgress={onProgress}
            progressInterval={350}
            onSeek={onSeek}
            onDuration={onDuration}
          />
        </Embed>
      </div>
    </div>
  );
};
