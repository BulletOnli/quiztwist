export type UploadFileResponse = {
  readonly name: string;
  readonly size: number;
  readonly type: string;
  readonly customId: string | null;
  readonly key: string;
  readonly url: string;
  readonly serverData: string | null;
};
