import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('A440', () => {
  assert.equal(api.pitchFrequency(69), 440);
  assert.equal(api.frequencyPitch(440), 69);
});
test('octave', () => {
  assert.equal(api.pitchFrequency(81), 880);
});
test('middle C reference', () => {
  assert.ok(Math.abs(api.pitchFrequency(60) - 261.6255653005986) < 1e-10);
});
test('19 divisions', () => {
  assert.equal(api.pitchFrequency(19, 100, 0, 19), 200);
});
test('domain and overflow', () => {
  assert.throws(() => api.pitchFrequency(1, 0));
  assert.throws(() => api.pitchFrequency(1, 440, 69, 0));
  assert.throws(() => api.pitchFrequency(1e6));
  assert.throws(() => api.frequencyPitch(0));
});
test('logarithmic interval oracle', () => {
  for (let n = 0; n <= 127; n++) {
    const f = api.pitchFrequency(n);
    assert.ok(Math.abs(api.frequencyPitch(f) - n) < 1e-12);
    assert.ok(Math.abs(api.pitchFrequency(n + 12) / f - 2) < 1e-12);
  }
});
