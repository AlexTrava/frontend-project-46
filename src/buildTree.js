import _ from 'lodash';

const getComparisonResult = (parseData1, parseData2) => {
  const uniqKeys = _.sortBy(_.union(_.keys(parseData1), _.keys(parseData2)));
  const result = uniqKeys.map((key) => {
    if (_.isObject(parseData1[key]) && _.isObject(parseData2[key])) {
      return { type: 'nested', key, children: getComparisonResult(parseData1[key], parseData2[key]) };
    }
    if (!_.has(parseData1, key)) {
      return { type: 'added', key, value: parseData2[key] };
    }
    if (!_.has(parseData2, key)) {
      return { type: 'removed', key, value: parseData1[key] };
    }
    if (!_.isEqual(parseData1[key], parseData2[key])) {
      return {
        type: 'changed', key, value1: parseData1[key], value2: parseData2[key],
      };
    }
    return { type: 'unchanged', key, value: parseData1[key] };
  });
  return result;
};

export default getComparisonResult;
