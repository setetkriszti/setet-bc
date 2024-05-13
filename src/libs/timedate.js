export function timeDate(str) {

    return str.replace('T', ' ').substring(0, 16);
  }