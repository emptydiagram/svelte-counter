<script>
  let count = 0;

  function handleIncClick() {
      count += 1;
  }
  function handleDecClick() {
      count -= 1;
  }

</script>

<div>
  <p>Count: {count}</p>
  <button on:click={handleIncClick}>Inc</button>
  <button on:click={handleDecClick}>Dec</button>
</div>
