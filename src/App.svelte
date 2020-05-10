<script>
  import Counter from './Counter.svelte'
  import TodoList from './TodoList.svelte';

  export let name;

  function handleCreateItem(event) {
    items = [...items,
      {text: event.detail.item, completed: false}
    ];
  }
</script>

<main>
  <h1>Hello {name}!</h1>
  <Counter />
  <hr />
  <TodoList />
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
    font-size: 2em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
