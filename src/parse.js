const parse = (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    default:
      throw new Error(`${format} is wrong format file.`);
  }
};

export default parse;
