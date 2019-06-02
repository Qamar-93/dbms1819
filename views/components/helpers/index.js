const changeDate =date => {
  if (date) {
    const year = date.split('T')[0];

    return year;
  }
};

module.exports = {
  changeDate
};
