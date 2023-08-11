import { Readable as ReadableStream } from "node:stream";

export type IStorableObject = ReadableStream | Buffer | string;
