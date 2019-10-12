export class PropertiesError extends Error {

}

export function stringifyProperties(obj: any): string {
  if (Object.keys(obj).length === 0) {
    throw new PropertiesError('Cannot convert constant to properties');
  } else if (obj instanceof Array) {
    throw new PropertiesError('Cannot convert Array to properties');
  }
  return this.propertyToString(obj).join('\n');
}

function propertyToString(obj: any, prefix: string = ''): string[] {
  if (this.isSimpleValue(obj)) {
    return [`${prefix}=${this.simpleValueToString(obj)}`];
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
    res.push(...this.propertyToString(obj[key], newPrefix));
  }
  return res;
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
