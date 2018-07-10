export const intToRGB = (num) => {
  num >>>= 0;
  let b = num & 0xFF,
    g = (num & 0xFF00) >>> 8,
    r = (num & 0xFF0000) >>> 16;
  return [r, g, b];
};

export const color = (c, m, f, d) => {
  d = Math.round(f ? f : 0.2 * 256) * (m ? -1 : 1);

  function k(i) {
    return Math[m ? 'max' : 'min'](c[i] + d, m ? 0 : 255)
  }

  return [k(0), k(1), k(2)]
};

export const getDateObj = (date) => {
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    minutes: minutes,
    hours: date.getHours()
  }
};

export const isToday = (date) => {
  return new Date().getDate() === date.getDate();
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

