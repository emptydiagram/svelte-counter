import Counter from './Counter.svelte'
import { render, fireEvent } from '@testing-library/svelte'

it('counts up', async () => {
  const { getByText } = render(Counter);

  const increment = getByText('Inc');
  const counter = getByText(/^Count:/);

  expect(counter.textContent).toBe('Count: 0');

  await fireEvent.click(increment);
  expect(counter.textContent).toBe('Count: 1');

  await fireEvent.click(increment);
  expect(counter.textContent).toBe('Count: 2');

  await fireEvent.click(increment);
  expect(counter.textContent).toBe('Count: 3');
})

it('counts down', async () => {
  const { getByText } = render(Counter);

  const decrement = getByText('Dec');
  const counter = getByText(/^Count:/);

  expect(counter.textContent).toBe('Count: 0');

  await fireEvent.click(decrement);
  expect(counter.textContent).toBe('Count: -1');

  await fireEvent.click(decrement);
  expect(counter.textContent).toBe('Count: -2');

  await fireEvent.click(decrement);
  expect(counter.textContent).toBe('Count: -3');
})

it('goes up and down', async () => {
  const { getByText } = render(Counter);

  const increment = getByText('Inc');
  const decrement = getByText('Dec');
  const counter = getByText(/^Count:/);

  expect(counter.textContent).toBe('Count: 0');

  await fireEvent.click(increment);
  await fireEvent.click(increment);
  await fireEvent.click(increment);
  expect(counter.textContent).toBe('Count: 3');

  await fireEvent.click(decrement);
  expect(counter.textContent).toBe('Count: 2');

  await fireEvent.click(decrement);
  expect(counter.textContent).toBe('Count: 1');

/*
  // with jest-dom
  expect(counter).toHaveTextContent('2')
*/
})

it('goes down and up', async () => {
  const { getByText } = render(Counter);

  const increment = getByText('Inc');
  const decrement = getByText('Dec');
  const counter = getByText(/^Count:/);

  expect(counter.textContent).toBe('Count: 0');

  await fireEvent.click(decrement);
  await fireEvent.click(decrement);
  await fireEvent.click(decrement);
  expect(counter.textContent).toBe('Count: -3');

  await fireEvent.click(increment);
  expect(counter.textContent).toBe('Count: -2');

  await fireEvent.click(increment);
  expect(counter.textContent).toBe('Count: -1');
})
