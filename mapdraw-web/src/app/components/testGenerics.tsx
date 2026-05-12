type Props<T> = {
  doors: T;
};

function Car<T>(props: Props<T>) {
  return <>doors: {props.doors}</>;
}
