export function getCurrentTime(headers) {
  const testTime = headers.get('x-test-now-ms');
  // If in test mode and the header exists, use the fake time
  if (process.env.TEST_MODE === '1' && testTime) {
    return parseInt(testTime, 10);
  }
  // Otherwise, use real time
  return Date.now();
}