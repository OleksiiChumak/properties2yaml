export class PropertiesError extends Error {

}

const DEFAULT_PROPERTY_NAME = 'value';
const DEFAULT_PROPERTY_KEY_VALUE_SEPARATOR = '=';

export function stringifyProperties(obj: any): string {
  if (isSimpleValue(obj)) {
    return toProperty(DEFAULT_PROPERTY_NAME, obj);
  }
  return propertyToString(obj).join('\n');
}

export function parseProperties(props: string): any {
  const lines: string[] = [];
  let nextLine = 0;
  props.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine.length === 0 || trimmedLine[0] === '#' || trimmedLine[0] === '!') {
      return;
    }
    if (trimmedLine[trimmedLine.length - 1] === '\\') {
      appendToCurrentLine(lines, nextLine, trimmedLine.substr(0, trimmedLine.length - 1));
    } else {
      appendToCurrentLine(lines, nextLine++, trimmedLine);
    }
  });
  const res = {};
  lines.map(value => normalizeKeyValueSeparator(value))
    .map(value => splitToKeyValue(value))
    .map(value => [stringToSimpleValue(value[0]), stringToSimpleValue(value[1])])
    .forEach(value => res[value[0]] = value[1]);
  return res;
}

export function plainObjectToComplex(obj: any): any {
  const props = Object.keys(obj).map(key => ({
    path: splitKey(key),
    value: obj[key]
  }));
  const res = {};
  for (const prop of props) {
    let curObj = res;
    for (let i = 0; i < prop.path.length - 1; i++) {
      const key = prop.path[i];
      if (typeof curObj[key] === 'undefined') {
        curObj[key] = {};
      }
      curObj = curObj[key];
    }
    curObj[prop.path[prop.path.length - 1]] = prop.value;
  }
  return optimizeObject(res);
}

function optimizeObject(obj): any {
  if (isSimpleValue(obj)) {
    return obj;
  }
  const indexes = Object.keys(obj).map(value => Number(value));
  const isArray = indexes.every(value => !isNaN(value));
  const res = isArray ? [] : {};
  if (isArray) {
    indexes.forEach(key => res[key] = optimizeObject(obj[key]));
  } else {
    Object.keys(obj).forEach(key => res[key] = optimizeObject(obj[key]));
  }
  return res;
}

function splitKey(key: string): string [] {
  const res = [];
  const props = key.split('.').map(value => parseArrayKeyIndex(value));
  for (const prop of props) {
    for (const subKey of prop) {
      res.push(subKey);
    }
  }
  return res;
}

function parseArrayKeyIndex(key: string): string[] {
  if (key.length < 3) {
    return [key];
  }
  if (key[key.length - 1] !== ']') {
    return [key];
  }
  let i = key.length - 2;
  for (; i > 0; i--) {
    if (key[i] < '0' || key[i] > '9') {
      break;
    }
  }
  if (key[i] !== '[') {
    return [key];
  }
  if (i === key.length - 2) {
    return [key];
  }

  const firstKey = key.substr(0, i);
  const secondKey = key.substr(i + 1, key.length - 2 - i);

  if (firstKey.length > 0) {
    return [firstKey, secondKey];
  } else {
    return [secondKey];
  }
}

function stringToSimpleValue(value: string): any {
  let res = '';
  for (let i = 0; i < value.length; i++) {
    let nextAppend: string;
    const currentChar = value[i];
    if (currentChar === '\\' && i !== value.length - 1) {
      const nextChar = value[++i];
      switch (nextChar) {
        case 'n':
          nextAppend = '\n';
          break;
        case 't':
          nextAppend = '\t';
          break;
        case 'u':
          if (i < value.length - 4) {
            const charCodeStr = value.substr(i + 1, 4);
            nextAppend = String.fromCodePoint(parseInt(charCodeStr, 16));
            i += 4;
          } else {
            nextAppend = '\\' + nextChar;
          }
          break;
        default:
          nextAppend = nextChar;
          break;
      }
    } else {
      nextAppend = currentChar;
    }
    res += nextAppend;
  }
  return res;
}


function splitToKeyValue(line: string): [string, string] {
  const separatorIndex = line.indexOf(DEFAULT_PROPERTY_KEY_VALUE_SEPARATOR);
  if (separatorIndex === -1) {
    return [line.trim(), ''];
  } else {
    return [line.substr(0, separatorIndex).trim(), line.substr(separatorIndex + 1).trim()];
  }
}

function normalizeKeyValueSeparator(line: string): string {
  const colonIndex = line.indexOf(':');
  const separatorIndex = line.indexOf(DEFAULT_PROPERTY_KEY_VALUE_SEPARATOR);
  if (colonIndex !== -1 && (colonIndex < separatorIndex || separatorIndex === -1)) {
    return line.replace(':', DEFAULT_PROPERTY_KEY_VALUE_SEPARATOR);
  }
  return line;
}

function appendToCurrentLine(lines: string[], currentLine: number, line: string): void {
  if (typeof lines[currentLine] === 'undefined') {
    lines[currentLine] = line;
  } else {
    lines[currentLine] += line;
  }
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
  return `${key}${DEFAULT_PROPERTY_KEY_VALUE_SEPARATOR}${simpleValueToString(value)}`;
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
