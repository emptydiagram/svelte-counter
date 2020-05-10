import TodoList from './TodoList.svelte'
import { render, fireEvent } from '@testing-library/svelte'

it('adding an item works', async () => {
  const { getByLabelText, getByRole, getAllByTestId, getByText } = render(TodoList);

  let newEntryInput = getByLabelText('new-todo-item');
  let newEntrySubmit = getByText('Submit');
  let list = getByRole('list');
  let items = getAllByTestId('todo-item');

  expect(newEntryInput.value).toBe('');
  const initNumItems = 2;
  expect(list.children.length).toBe(initNumItems);
  expect(items.length).toBe(initNumItems);
  expect(items[0].textContent).toBe('wash the lawn');
  expect(items[1].textContent).toBe('dance');

  await fireEvent.input(newEntryInput, { target: { value: 'aBc' } });
  expect(newEntryInput.value).toBe('aBc');

  await fireEvent.click(newEntrySubmit);
  expect(newEntryInput.value).toBe('');
  expect(list.children.length).toBe(initNumItems+1);
  items = getAllByTestId('todo-item');
  expect(items.length).toBe(initNumItems+1);
  expect(items[initNumItems].textContent).toBe('aBc');


/*
  // with jest-dom
  expect(counter).toHaveTextContent('2')
*/
})
