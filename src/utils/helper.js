import ShortUniqueId from 'short-unique-id';

export const uniqueId = () => { return new ShortUniqueId()}

export function SortArrayOfObj(ArrayOfObj,sortingKey){
  var sortedArray = ArrayOfObj.sort(function(a,b) {
    if (a[sortingKey] > b[sortingKey])
      return -1;
    if (a[sortingKey] < b[sortingKey])
      return 1;
    return 0;
  });
  return sortedArray;
}