import { isDefined, isFunction, isString } from "../functions";
import { SourceTargetMap } from "./SourceTargetMap";

/**
 * @class SimpleMapper
 *
 * Supports mapping to and from source and target objects.
 *
 * Each instance will keep track of its mappings but will not care about another instances.
 */
export class SimpleMapper {
  private readonly maps: Record<string, SourceTargetMap> = {};

  map<Source, Target>(key: string, source: Source): Target {
    const mapping = this.maps[key];

    if (!mapping) throw new Error(`${key} map not found!`);

    const _source = source as Record<string, unknown>;

    const result = Object.entries(mapping).reduce((result, current) => {
      const [key, functionOrKey] = current;

      if (isFunction(functionOrKey)) {
        result[key] = functionOrKey(source);
      } else if (isString(functionOrKey) && functionOrKey in source) {
        result[key] = _source[functionOrKey];
      } else if (!isDefined(functionOrKey) && key in _source) {
        result[key] = _source[key];
      } else {
        result[key] = null;
      }

      return result;
    }, {} as Record<string, unknown>);

    return result as Target;
  }

  createMap<Source, Target>(
    key: string,
    mapping: SourceTargetMap<Source, Target>
  ) {
    this.maps[key] = mapping;
  }
}
