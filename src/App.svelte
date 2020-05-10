<script>
  import TodoList from './TodoList.svelte';

  export let name;

  let count = 0;
  let items = [
    { text: 'one', completed: false },
    { text: '2', completed: false },
    { text: 'threeve', completed: false }
  ];

  function handleClick() {
      count += 1;
  }

  function handleCreateItem(event) {
    items = [...items,
      {text: event.detail.item, completed: false}
    ];
  }

  function handleToggleItem(event) {
    let i = event.detail.index;
    items[i].completed = !items[i].completed;
  }

  function handleSaveItem(event) {
    let i = event.detail.index;
    items[i].text = event.detail.text;
  }
</script>

<main>
  <div>
    <h1>Hello {name}!</h1>
    <p>Clicked {count}</p>
    <button on:click={handleClick}>Inc</button>
  </div>
  <TodoList
    on:createItem={handleCreateItem}
    on:toggleItem={handleToggleItem}
    on:saveItem={handleSaveItem}
    items={items}
  />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
