<script>
	import { createEventDispatcher } from 'svelte';

  export let items;

	const dispatch = createEventDispatcher();

  let newItemText;
  let editingItem = null;
  let editingItemText;

  function triggerSubmit() {
    dispatch('createItem', {
      item: newItemText
    });
    newItemText = '';
  }

  function toggleCompletion(i) {
    dispatch('toggleItem', {
      index: i
    });
  }

  function editItem(i) {
    editingItem = i;
    editingItemText = items[i].text;
  }

  function saveEdit(event) {
    console.log('saveEdit, editingItem = ', editingItem, event);
    dispatch('saveItem', {
      index: editingItem,
      text: editingItemText,
    });
    editingItem = null;
  }

  function cancelEdit(event) {
    editingItem = null;
  }
</script>

<h1>Todo</h1>

<input bind:value={newItemText} type="text" placeholder="What todo" />
<input on:click={triggerSubmit} type="submit" value="Submit" />

<ul>
  {#each items as item, i}
    <li>
      <input type="checkbox" checked={item.completed} on:input={() => toggleCompletion(i)} />
      {#if editingItem !== i}
        <span on:dblclick={() => editItem(i)}>
          {#if item.completed}
            <strike>{item.text}</strike>
          {:else}
            {item.text}
          {/if}
        </span>
      {:else}
        <input type="text" bind:value={editingItemText} />
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
