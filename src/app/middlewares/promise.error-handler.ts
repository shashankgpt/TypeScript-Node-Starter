export default function to<T, T2>(promise: Promise<T | T2>) {
  return promise.then((data: T | T2) => {
    return data;
  })
  .catch((err) => {
    console.log(err);
    return false;
  });
}
