import Counter from './Counter.svelte'
import { render, fireEvent } from '@testing-library/svelte'

it('it works', async () => {
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

/*
  // with jest-dom
  expect(counter).toHaveTextContent('2')
*/
})
