import {stringifyProperties} from './properties-utils';
import {safeLoad} from 'js-yaml';

describe('PropertiesUtils', () => {
  it('should convert one property yaml', () => {
    const testObj = {property: 'value'};
    expect(stringifyProperties(testObj)).toEqual('property=value');
  });

  it('should convert array yaml', () => {
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
