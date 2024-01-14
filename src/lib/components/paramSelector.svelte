<script lang="ts">
  import Katex from "svelte-katex";
  import { RangeSlider } from "@skeletonlabs/skeleton";

  function updateH(b: number) {
    h = -b / (2 * a);
  }

  function updateK(c: number) {
    console.log(c);
    k = (4 * a * c - b ** 2) / (4 * a);
  }

  export let precision: number = 5;

  export let a: number = 0;
  export let h: number = 0;
  export let k: number = 0;

  export let forme: "canonique" | "generale" = "canonique";

  let b: number = -2 * a * h;
  let c: number = a * h ** 2 + k;
</script>

<select class="select" bind:value={forme}>
  <option value="canonique">Forme canonique</option>
  <option value="generale">Forme générale</option>
</select>
<RangeSlider
  name="range-slider"
  bind:value={precision}
  min={1}
  max={10}
  step={1}
  ticked
>
  <div class="flex justify-between items-center">
    <div class="font-bold">Nombre de decimales</div>
    <div class="text-xs">{precision - 1} / 9</div>
  </div>
</RangeSlider>
<hr />
{#if forme === "canonique"}
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
  <Katex
    >f(x)={a.toPrecision(precision)}(x{h > 0 ? "-" : "+"}{h.toPrecision(
      5,
    )})^2{k > 0 ? "+" : ""}{k.toPrecision(5)}</Katex
  >
{:else}
  <h2 class="h2">Entrer les variables de la forme générale (a, b et c).</h2>
  <div class="flex flex-col lg:flex-row lg:space-x-5">
    <label class="label">
      <span>a</span>
      <input type="number" title="Entrer a" class="input" bind:value={a} />
    </label>
    <label class="label">
      <span>b</span>
      <input
        type="number"
        title="Entrer b"
        class="input"
        bind:value={b}
        on:change={() => updateH(b)}
        on:input={() => updateH(b)}
      />
    </label>
    <label class="label">
      <span>c</span>
      <input
        type="number"
        title="Entrer c"
        class="input"
        bind:value={c}
        on:change={() => updateK(c)}
        on:input={() => updateK(c)}
      />
    </label>
  </div>
  <Katex
    >f(x)={a.toPrecision(precision)}x^2{b > 0 ? "+" : "-"}{b.toPrecision(
      precision,
    )}x{c > 0 ? "+" : ""}{c.toPrecision(precision)}</Katex
  >
{/if}
