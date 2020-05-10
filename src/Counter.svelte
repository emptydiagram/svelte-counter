<script>
  let count = 0;

  function handleClick() {
      count += 1;
  }

</script>

<div>
  <p>Clicked {count}</p>
  <button on:click={handleClick}>Inc</button>
</div>
