export function debounce(f, ms = 500) {
  let timer;

  return function (args) {
    if (timer)
      clearTimeout(timer);

    timer = setTimeout(() => f(args), ms);
  }
}
