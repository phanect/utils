import { PartialDeep } from "type-fest";

/** Return type of the first argument of the given function */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FirstParam<T extends (...args: any[]) => any> = T extends (arg1: infer P1, ...args: any[]) => any ? P1 : never;
/** Return types of the second and the following arguments of the given function */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RestParams<T extends (...args: any[]) => any> = T extends (arg1: any, ...args: infer P2) => any ? P2 : never;

type MapCallbackNonOptional<ReturnedElement> =
  FirstParam<typeof Array.prototype.map<ReturnedElement>>;
type MapCallback<ArrayElement extends FirstParam<MapCallbackNonOptional<ReturnedElement>>, ReturnedElement> = (
  val: ArrayElement,
  ...rest: Partial<RestParams<MapCallbackNonOptional<ReturnedElement>>>
) => ReturnedElement;
type OptionalizedArrayElement<ArrayElement, ReturnedElement> = PartialDeep<FirstParam<MapCallback<ArrayElement, ReturnedElement>>, {
  recurseIntoArrays: true,
}>;
type ModifiableCallback<ArrayElement, ReturnedElement> = (
  val: OptionalizedArrayElement<ArrayElement, ReturnedElement>,
  ...rest: RestParams<MapCallback<ArrayElement, ReturnedElement>>
) => ReturnedElement;

/**
 * Allow modifying the elements of the array given in `Array.prototype.map()`
 * @param mapCallback - Callback function of `Array.prototype.map()`.
 * @returns An alternative callback function for `Array.prototype.map()`.
 * @example
 * messages.map(modifiable((message) => {
 *   delete message.prop;
 *   return message;
 * }));
 */
export const modifiable = <ArrayElement, ReturnedElement>(mapCallback: ModifiableCallback<ArrayElement, ReturnedElement>): MapCallback<ArrayElement, ReturnedElement> => {
  const wrappedCallback: MapCallback<ArrayElement, ReturnedElement> = (val, ...rest) => mapCallback(
    structuredClone(val) as OptionalizedArrayElement<ArrayElement, ReturnedElement>,
    ...structuredClone(rest)
  );

  return wrappedCallback;
};
