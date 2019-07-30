import { fun } from './test-config';
fun.cleanup;

import { mockUser, getMockSource } from './mocks';
import { createCharge } from '../src/charges';
import { createCustomer } from '../src/customers';

let user: any;

beforeAll(async () => {
  user = await mockUser();
  await createCustomer(user.uid);
});

test('createCharge creates a charge', async () => {
  const amount = 100;
  const mockSource = await getMockSource();
  const charge = await createCharge(user.uid, mockSource.id, amount);

  expect(charge.id).toContain('ch_');
  expect(charge.amount).toBe(amount);
});
