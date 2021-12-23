import { SourceTargetMapping } from "./SourceTargetMapping";

export class SimpleMapper {
  private readonly mappings: Record<
    string,
    SourceTargetMapping<object, object>
  > = {};

  map<Source, Target>(mappingKey: string, source: Source): Target {
    const mapping = this.mappings[mappingKey];
    if (!mapping) throw new Error(`${mappingKey} mapping not found!`);

    const result = Object.entries(mapping).reduce((target, current) => {
      const [key, mapper] = current;

      if (typeof mapper === "function") {
        target[key] = mapper(source);
      }

      if (mapper in source) {
        target[key] = (source as Record<string, unknown>)[mapper];
      }

      return target;
    }, {} as Record<string, unknown>);

    return result as Target;
  }

  createMapping<Source, Target>(
    mappingKey: string,
    mapping: SourceTargetMapping<Source, Target>
  ) {
    this.mappings[mappingKey] = mapping;
  }
}
