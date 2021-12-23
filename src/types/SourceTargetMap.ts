export type SourceTargetMap<Source = any, Target = any> = {
  [Key in keyof Target]:
    | null
    | undefined
    | keyof Source
    | ((source: Source) => unknown);
};
