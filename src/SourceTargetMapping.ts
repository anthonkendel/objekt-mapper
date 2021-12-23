export type SourceTargetMapping<Source, Target> = {
  [Key in keyof Target]: keyof Source | ((source: Source) => unknown);
};
