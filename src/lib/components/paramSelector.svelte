<script lang="ts">
  import Katex from "svelte-katex";

  export let a: number = 0;
  export let h = 0;
  export let k = 0;
</script>

<h2 class="h2">Entrer les variables de la forme canonique (a, h et k).</h2>
<div class="flex flex-col lg:flex-row lg:space-x-5">
  <label class="label">
    <span>a</span>
    <input type="number" title="Entrer a" class="input" bind:value={a} />
  </label>
  <label class="label">
    <span>h</span>
    <input type="number" title="Entrer h" class="input" bind:value={h} />
  </label>
  <label class="label">
    <span>k</span>
    <input type="number" title="Entrer k" class="input" bind:value={k} />
  </label>
</div>
<Katex>f(x)={a}(x{h > 0 ? "-" : "+"}{h})^2{k > 0 ? "+" : "-"}{k}</Katex>
