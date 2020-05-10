import Counter from './Counter.svelte'
import { render, fireEvent } from '@testing-library/svelte'

it('it works', async () => {
  const { getByText, getByTestId } = render(Counter);

  const increment = getByText('Inc');
  const decrement = getByText('Dec');
  const counter = getByText(/^Clicked/);

  await fireEvent.click(increment);
  await fireEvent.click(increment);
  await fireEvent.click(increment);
  await fireEvent.click(decrement);

  expect(counter.textContent).toBe('Clicked 2');

/*
  // with jest-dom
  expect(counter).toHaveTextContent('2')
*/
})