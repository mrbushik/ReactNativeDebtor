import fs from "node:fs";
import { EventEmitter } from "node:events";

type Watcher = fs.FSWatcher & EventEmitter;
type WatchCallback = (
  eventType: string,
  filename: string | Buffer | null,
) => void;
type WatchOptions =
  | fs.WatchOptions
  | BufferEncoding
  | "buffer"
  | null
  | undefined;

const originalWatch = fs.watch.bind(fs);

function createNoopWatcher(): Watcher {
  const watcher = new EventEmitter() as Watcher;
  watcher.close = () => {};
  watcher.ref = () => watcher;
  watcher.unref = () => watcher;
  return watcher;
}

fs.watch = function patchedWatch(
  path: fs.PathLike,
  options?: WatchOptions | WatchCallback,
  listener?: WatchCallback,
): fs.FSWatcher {
  let watchOptions = options;
  let callback = listener;

  if (typeof watchOptions === "function") {
    callback = watchOptions;
    watchOptions = undefined;
  }

  if (
    watchOptions &&
    typeof watchOptions === "object" &&
    "recursive" in watchOptions &&
    watchOptions.recursive
  ) {
    const watcher = createNoopWatcher();

    if (typeof callback === "function") {
      watcher.on("change", callback);
    }

    return watcher;
  }

  return (originalWatch as any)(path, watchOptions, callback);
} as typeof fs.watch;
