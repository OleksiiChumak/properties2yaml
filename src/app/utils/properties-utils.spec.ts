import {parseProperties, stringifyProperties} from './properties-utils';
import {safeLoad} from 'js-yaml';

describe('PropertiesUtils', () => {

  it('should parse path property', () => {
    const testObj = 'path=c:\\\\wiki\\\\templates';
    const res = parseProperties(testObj);
    expect(res).toEqual({
      path: 'c:\\wiki\\templates'
    });
  });

  it('should parse unicode property', () => {
    const testObj = 'tab : \\u0009';
    const res = parseProperties(testObj);
    expect(res).toEqual({
      tab: '\t'
    });
  });

  it('should not parse unicode property', () => {
    const testObj = 'tab : \\u000';
    const res = parseProperties(testObj);
    expect(res).toEqual({
      tab: '\\u000'
    });
  });

  it('should parse properties', () => {
    const testObj = `# You are reading the ".properties" entry.
! The exclamation mark can also mark text as comments.
# The key characters =, and : should be written with
# a preceding backslash to ensure that they are properly loaded.
# However, there is no need to precede the value characters =, and : by a backslash.
website = https://en.wikipedia.org/
language = English
# The backslash below tells the application to continue reading
# the value onto the next line.
message = Welcome to \\
          Wikipedia!
# Add spaces to the key
key\\ with\\ spaces = This is the value that could be looked up with the key "key with spaces".
aa\\taa:xx
# Unicode
tab : \\u0009
# If you want your property to include a backslash, it should be escaped by another backslash
path=c:\\\\wiki\\\\templates
# However, some editors will handle this automatically
   multiline:line1\\n\\
line2
novalue:
:nokey
duplicate:val1
duplicate:val2
bbbb
#==============
lll\\
2222:fefefef`;
    const res = parseProperties(testObj);
    expect(res).toEqual({
      website: 'https://en.wikipedia.org/',
      tab: '\t',
      'aa\taa': 'xx',
      multiline: 'line1\nline2',
      bbbb: '',
      language: 'English',
      novalue: '',
      duplicate: 'val2',
      'key with spaces': 'This is the value that could be looked up with the key "key with spaces".',
      lll2222: 'fefefef',
      '': 'nokey',
      path: 'c:\\wiki\\templates',
      message: 'Welcome to Wikipedia!'
    });
  });

  it('should convert simple property', () => {
    const testObj = 'xxxx';
    expect(stringifyProperties(testObj)).toEqual('value=xxxx');
  });

  it('should convert one property yaml', () => {
    const testObj = {property: 'value'};
    expect(stringifyProperties(testObj)).toEqual('property=value');
  });

  it('should convert array', () => {
    const testObj = [1, 2, 3, {property: 'value'}];
    expect(stringifyProperties(testObj)).toEqual('[0]=1\n' +
      '[1]=2\n' +
      '[2]=3\n' +
      '[3].property=value');
  });

  it('should convert one property array', () => {
    const testObj = {property: [1, 2, 3, 4]};
    expect(stringifyProperties(testObj)).toEqual('property[0]=1\n' +
      'property[1]=2\n' +
      'property[2]=3\n' +
      'property[3]=4');
  });

  it('should convert complicated yaml', () => {
    const testObj = safeLoad('---\n' +
      '# An employee record\n' +
      'name: Martin D\'vloper\n' +
      'job: Developer\n' +
      'skill: Elite\n' +
      'employed: True\n' +
      'foods:\n' +
      '    - Apple\n' +
      '    - Orange\n' +
      '    - Strawberry\n' +
      '    - Mango\n' +
      'languages:\n' +
      '    perl: Elite\n' +
      '    python: Elite\n' +
      '    pascal: Lame\n' +
      'education: |\n' +
      '    4 GCSEs\n' +
      '    3 A-Levels\n' +
      '    BSc in the Internet of Things');
    expect(stringifyProperties(testObj)).toEqual('name=Martin D\'vloper\n' +
      'job=Developer\n' +
      'skill=Elite\n' +
      'employed=true\n' +
      'foods[0]=Apple\n' +
      'foods[1]=Orange\n' +
      'foods[2]=Strawberry\n' +
      'foods[3]=Mango\n' +
      'languages.perl=Elite\n' +
      'languages.python=Elite\n' +
      'languages.pascal=Lame\n' +
      'education=4 GCSEs\\\n' +
      '3 A-Levels\\\n' +
      'BSc in the Internet of Things\\\n');
  });

});
