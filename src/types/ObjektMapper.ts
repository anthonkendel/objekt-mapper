import { isDefined, isFunction, isString } from "../functions";
import { SourceTargetMap } from "./SourceTargetMap";

/**
 * @class Mapper
 *
 * Supports mapping to and from target and source objects.
 *
 * Each instance will keep track of its mappings and will not care about another instances.
 */
export class ObjektMapper {
  private readonly maps: Record<string, SourceTargetMap> = {};

  map<Source, Target>(key: string, source: Source): Target {
    const mapping = this.maps[key];

    if (!mapping) throw new Error(`${key} map not found!`);

    const _source = source as Record<string, unknown>;

    const result = Object.entries(mapping).reduce((result, current) => {
      const [key, functionOrKey] = current;

      if (isFunction(functionOrKey)) {
        result[key] = functionOrKey(_source);
      } else if (isString(functionOrKey) && functionOrKey in _source) {
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

export default ObjektMapper;
