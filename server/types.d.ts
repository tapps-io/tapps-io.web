/// <reference types="node" />
/// <reference types="webpack-env" />

import webpack from 'webpack';

declare module 'webpack' {
  interface OutputFileSystem {
    readFile(path: string, callback: (err: Error | undefined | null, contents: Buffer) => void): void;
    readFile(path: string, encoding: string, callback: (err: Error | undefined | null, contents: string) => void): void;
  }
}
