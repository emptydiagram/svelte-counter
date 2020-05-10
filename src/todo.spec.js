import TodoList from './TodoList.svelte'
import { render, fireEvent } from '@testing-library/svelte'

it('adds a new item when clicking submit', async () => {
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

it('toggles completion status correctly', async () => {
  const { getByLabelText, getAllByTestId, getByText } = render(TodoList);

  let newEntryInput = getByLabelText('new-todo-item');
  let newEntrySubmit = getByText('Submit');
  let items = getAllByTestId('todo-item');
  let toggles = getAllByTestId('completion-toggle');

  expect(newEntryInput.value).toBe('');
  const initNumItems = 2;
  expect(items.length).toBe(initNumItems);
  expect(items[0].classList.contains('completed')).toBe(false);
  expect(items[1].classList.contains('completed')).toBe(false);

  await fireEvent.input(toggles[1]);
  expect(items[1].classList.contains('completed')).toBe(true);

  await fireEvent.input(toggles[1]);
  expect(items[1].classList.contains('completed')).toBe(false);
})

it('updates an entry when you edit and save', async () => {
  const { getByLabelText, getAllByTestId, getByTestId, getByText } = render(TodoList);

  let newEntryInput = getByLabelText('new-todo-item');
  let newEntrySubmit = getByText('Submit');
  let items = getAllByTestId('todo-item');

  expect(newEntryInput.value).toBe('');
  const initNumItems = 2;
  expect(items.length).toBe(initNumItems);
  expect(items[1].textContent).toBe('dance');

  await fireEvent.dblClick(items[1]);
  let editEntryInput = getByTestId("edit-todo-item");
  let saveEditButton = getByTestId("save-item-edit");

  const newEntryText = 'solve puzzle';
  await fireEvent.input(editEntryInput, { target: { value: newEntryText} });
  expect(editEntryInput.value).toBe(newEntryText);

  await fireEvent.click(saveEditButton);
  items = getAllByTestId('todo-item');
  expect(items[1].textContent).toBe(newEntryText);
})

it('doesnt update an entry when you edit and cancel', async () => {
  const { getByLabelText, getAllByTestId, getByTestId, getByText } = render(TodoList);

  let newEntryInput = getByLabelText('new-todo-item');
  let newEntrySubmit = getByText('Submit');
  let items = getAllByTestId('todo-item');

  expect(newEntryInput.value).toBe('');
  const initNumItems = 2;
  expect(items.length).toBe(initNumItems);
  expect(items[1].textContent).toBe('dance');

  await fireEvent.dblClick(items[1]);
  let editEntryInput = getByTestId("edit-todo-item");
  let cancelEditButton = getByTestId("cancel-item-edit");

  const newEntryText = 'abcdefg';
  await fireEvent.input(editEntryInput, { target: { value: newEntryText} });
  expect(editEntryInput.value).toBe(newEntryText);

  await fireEvent.click(cancelEditButton);
  items = getAllByTestId('todo-item');
  expect(items[1].textContent).toBe('dance');
})
