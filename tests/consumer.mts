import { pitchFrequency, frequencyPitch } from '@lp-labs/equal-temperament';
if (pitchFrequency(81) !== 880 || frequencyPitch(440) !== 69) throw new Error('Tuning');
// @ts-expect-error invalid argument must be rejected by declarations
pitchFrequency('69');
