const toJSON = (data) => {
  if (typeof data === 'undefined') throw new TypeError('data is undefined');
  return data.json();
};
export default toJSON;
