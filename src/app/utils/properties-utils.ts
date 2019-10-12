export class PropertiesError extends Error {

}

const DEFAULT_PROPERTY_NAME = 'value';

export function stringifyProperties(obj: any): string {
  if (isSimpleValue(obj)) {
    return toProperty(DEFAULT_PROPERTY_NAME, obj);
  }
  return propertyToString(obj).join('\n');
}

function propertyToString(obj: any, prefix: string = ''): string[] {
  if (isSimpleValue(obj)) {
    return [toProperty(prefix, obj)];
  }
  const res: string[] = [];
  const isArray: boolean = obj instanceof Array;
  for (const key of Object.keys(obj)) {
    let newPrefix: string;
    if (isArray) {
      newPrefix = `${prefix}[${key}]`;
    } else {
      newPrefix = (prefix ? `${prefix}.` : '') + key;
    }
    res.push(...propertyToString(obj[key], newPrefix));
  }
  return res;
}

function toProperty(key: string, value: any) {
  return `${key}=${simpleValueToString(value)}`;
}

function simpleValueToString(obj: any): string {
  if (typeof obj === 'string') {
    return obj.replace(/\n/g, '\\\n');
  } else {
    return obj.toString();
  }
}

function isSimpleValue(obj: any): boolean {
  if (typeof obj === 'string') {
    return true;
  } else if (Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
}
