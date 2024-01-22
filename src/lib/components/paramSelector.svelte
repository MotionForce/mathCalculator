<script lang="ts">
  import Katex from "svelte-katex";
  import { RangeSlider } from "@skeletonlabs/skeleton";
  import { dev } from "$app/environment";

  function findSolution() {
    if (a !== 0) {
      x1 = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
      x2 = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
    }
  }

  function logVars() {
    if (dev) {
      console.log(JSON.stringify({ a, b, c, h, k, x1, x2 }, null, 2));
    }
  }

  function updateFactorisee() {
    h = (x1 + x2) / 2;
    k = a * (h - x1) * (h - x2);
    b = -a * x1 - a * x2;
    c = a * x1 * x2;
    logVars();
  }

  function updateGenerale() {
    h = -b / (2 * a);
    k = (4 * a * c - b ** 2) / (4 * a);
    findSolution();
    logVars();
  }

  function updateCanonique() {
    b = -2 * a * h;
    c = a * h ** 2 + k;
    findSolution();
    logVars();
  }

  export let precision: number = 5;

  export let a: number = 0;
  export let h: number = 0;
  export let k: number = 0;

  export let forme: "canonique" | "generale" | "factorisee" = "canonique";

  export let num_type: true | false = false;

  let b: number = -2 * a * h;
  let c: number = a * h ** 2 + k;

  let x1: number = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
  let x2: number = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);

  $: num_type =
    typeof a === "number" &&
    typeof b === "number" &&
    typeof c === "number" &&
    typeof h === "number" &&
    typeof k === "number" &&
    typeof x1 === "number" &&
    typeof x2 === "number";
</script>

<select class="select" bind:value={forme}>
  <option value="canonique">Forme canonique</option>
  <option value="generale">Forme générale</option>
  <option value="factorisee">Forme factorisée</option>
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
      <input
        type="number"
        title="Entrer h"
        class="input"
        bind:value={h}
        on:change={updateCanonique}
        on:input={updateCanonique}
      />
    </label>
    <label class="label">
      <span>k</span>
      <input
        type="number"
        title="Entrer k"
        class="input"
        bind:value={k}
        on:change={updateCanonique}
        on:input={updateCanonique}
      />
    </label>
  </div>
  {#if typeof a === "number" && typeof h === "number" && typeof k === "number"}
    <Katex
      >f(x)={a.toPrecision(precision)}(x{h < 0
        ? `+${h.toPrecision(5).toString().replace("-", "")}`
        : `-${h.toPrecision(5)}`})^2{k > 0 ? "+" : ""}{k.toPrecision(5)}</Katex
    >
  {/if}
{:else if forme === "generale"}
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
        on:change={updateGenerale}
        on:input={updateGenerale}
      />
    </label>
    <label class="label">
      <span>c</span>
      <input
        type="number"
        title="Entrer c"
        class="input"
        bind:value={c}
        on:change={updateGenerale}
        on:input={updateGenerale}
      />
    </label>
  </div>
  {#if typeof a === "number" && typeof b === "number" && typeof c === "number"}
    <Katex
      >f(x)={a.toPrecision(precision)}x^2{b > 0 ? "+" : ""}{b.toPrecision(
        precision,
      )}x{c > 0 ? "+" : ""}{c.toPrecision(precision)}</Katex
    >
  {/if}
{:else}
  <h2 class="h2">Entrer les variables de la forme factorisée (a, x1 et x2).</h2>
  <div class="flex flex-col lg:flex-row lg:space-x-5">
    <label class="label">
      <span>a</span>
      <input type="number" title="Entrer a" class="input" bind:value={a} />
    </label>
    <label class="label">
      <span>Solution 1</span>
      <input
        type="number"
        title="Entrer x1"
        class="input"
        bind:value={x1}
        on:change={updateFactorisee}
        on:input={updateFactorisee}
      />
    </label>
    <label class="label">
      <span>Solution 2</span>
      <input
        type="number"
        title="Entrer x2"
        class="input"
        bind:value={x2}
        on:change={updateFactorisee}
        on:input={updateFactorisee}
      />
    </label>
  </div>
  {#if typeof a === "number" && typeof x1 === "number" && typeof x2 === "number"}
    <Katex
      >f(x)={a.toPrecision(precision)}(x{x1 > 0 ? "-" : "+"}{x1.toPrecision(
        precision,
      )})(x{x2 > 0 ? "-" : "+"}{x2.toPrecision(precision)})</Katex
    >
  {/if}
{/if}
