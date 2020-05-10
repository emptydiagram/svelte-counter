<script>
	import { createEventDispatcher } from 'svelte';

  let items = [
    { text: 'wash the lawn', completed: false },
    { text: 'dance', completed: false }
  ];

	const dispatch = createEventDispatcher();

  let newItemText = '';
  let editingItem = null;
  let editingItemText;

  function triggerSubmit(event) {
    items = [...items,
      {text: newItemText, completed: false}
    ];
    newItemText = '';
  }

  function toggleCompletion(i) {
    items[i].completed = !items[i].completed;
  }

  function editItem(i) {
    editingItem = i;
    editingItemText = items[i].text;
  }

  function saveEdit(event) {
    console.log('saveEdit, editingItem = ', editingItem, event);
    let i = editingItem;
    items[i].text = editingItemText;
    editingItem = null;
  }

  function cancelEdit(event) {
    editingItem = null;
  }
</script>

<h1>Todo</h1>

<input on:input={(e) => { newItemText = e.target.value; }} type="text" aria-label="new-todo-item" placeholder="What todo" value={newItemText} />
<input on:click={triggerSubmit} type="submit" value="Submit" />

<ul>
  {#each items as item, i}
    <li>
      <input type="checkbox" checked={item.completed} on:input={() => toggleCompletion(i)} />
      {#if editingItem !== i}
        <span data-testid="todo-item" on:dblclick={() => editItem(i)}>
          {#if item.completed}
            <strike>{item.text}</strike>
          {:else}
            {item.text}
          {/if}
        </span>
      {:else}
        <input type="text" placeholder="Item text" bind:value={editingItemText} />
        <button on:click={saveEdit}>Save</button>
        <button on:click={cancelEdit}>Cancel</button>
      {/if}
    </li>
  {/each}
</ul>

<style>
ul {
  text-align: left;
  list-style-type: none;
  padding: 0;
  border-top: 1px solid green;
}

li {
  border-bottom: 1px solid green;
  padding: 0.5em;
}
</style>
