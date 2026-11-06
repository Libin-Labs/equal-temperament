function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
export function pitchFrequency(
  step: number,
  referenceHz = 440,
  referenceStep = 69,
  divisions = 12,
): number {
  finite(step, -1e6, 1e6);
  finite(referenceStep, -1e6, 1e6);
  finite(referenceHz, Number.MIN_VALUE);
  integer(divisions, 1, 1200);
  return finite(referenceHz * 2 ** ((step - referenceStep) / divisions), Number.MIN_VALUE);
}
export function frequencyPitch(
  hz: number,
  referenceHz = 440,
  referenceStep = 69,
  divisions = 12,
): number {
  finite(hz, Number.MIN_VALUE);
  finite(referenceHz, Number.MIN_VALUE);
  finite(referenceStep, -1e6, 1e6);
  integer(divisions, 1, 1200);
  return finite(referenceStep + divisions * (Math.log2(hz) - Math.log2(referenceHz)));
}
