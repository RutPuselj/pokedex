export function save(key, value) {
  localStorage.setItem(key, value);
}

export function read(key) {
  return localStorage.getItem(key);
}
