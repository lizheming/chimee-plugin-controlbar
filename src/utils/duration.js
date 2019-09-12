export default duration => {
  const min = ~~(duration / 60);
  const sec = Math.floor(duration % 60);
  if (isNaN(min) || isNaN(sec)) return '';
  return `${min >= 10 ? min : '0' + min}:${sec >= 10 ? sec : '0' + sec}`;
};