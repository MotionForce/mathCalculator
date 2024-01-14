<script lang="ts">
  import Katex from "svelte-katex";
  import ParamSelector from "$lib/components/paramSelector.svelte";
  import { storage } from "svelte-legos";
  import { writable } from "svelte/store";

  let a = storage(writable(1), "a");
  let h = storage(writable(0), "h");
  let k = storage(writable(0), "k");

  $: min = a > 0 ? k : null;
  $: max = a < 0 ? k : null;
</script>

<div
  class="m-10 p-10 flex flex-col space-y-10 bg-surface-300-600-token rounded-3xl"
>
  <h1 class="h1 font-bold">
    Calculatrice de propriété de fonction quadratique
  </h1>
  <div class="p-7 flex flex-col space-y-5 bg-surface-500-400-token rounded-2xl">
    <ParamSelector bind:a={$a} bind:h={$h} bind:k={$k} />
    {#if a !== 0}
      <hr />
      <h2 class="h2">Les propriétés</h2>
      <Katex>dom(f)=\mathbb{"{R}"}</Katex>
      <Katex
        >ima(f)={min === null ? `]-\\infty,${k}]` : `[${min},+\\infty[`}</Katex
      >
      <Katex>f(0)={(-h) ** 2 * a + k}</Katex>
      <Katex>
        {#if k === 0}
          f(x)=0\space\forall\space x={h}
        {:else if a * k > 0}
          f(x)=0\space\forall\space x\in{"\\{\\}"}
        {:else}
          f(x)=0\space\forall\space x\in{"\\{"}{h - Math.sqrt(-k / a)},{h +
            Math.sqrt(-k / a)}{"\\}"}
        {/if}
      </Katex>
    {/if}
  </div>
</div>
