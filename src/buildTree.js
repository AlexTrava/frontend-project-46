import _ from 'lodash';

const getComparisonResult = (parseData1, parseData2) => {
  const uniqKeys = _.sortBy(_.union(_.keys(parseData1), _.keys(parseData2)));
  const noChange = '    ';
  const findChange = '  ';
  const result = uniqKeys.map((key) => {
    if (!_.has(parseData1, key)) {
      return `${findChange}+ ${key}: ${parseData2[key]}`;
    }
    if (!_.has(parseData2, key)) {
      return `${findChange}- ${key}: ${parseData1[key]}`;
    }
    if (!_.isEqual(parseData1[key], parseData2[key])) {
      return `${findChange}- ${key}: ${parseData1[key]}\n${findChange}+ ${key}: ${parseData2[key]}`;
    }
    if (_.isEqual(parseData1[key], parseData2[key])) {
      return `${noChange}${key}: ${parseData1[key]}`;
    }
  });
  return `{\n${[...result].join('\n')}\n}`;
};

export default getComparisonResult;
