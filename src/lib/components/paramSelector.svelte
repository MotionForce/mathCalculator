<script lang="ts">
  // @ts-expect-error
  import Katex from "svelte-katex";
  import { dev } from "$app/environment";
  import { evaluate } from "mathjs";
  import { format_decimal } from "$lib/properties";

  function eval_s(s: string) {
    if (s === "") {
      return null;
    }
    try {
      return evaluate(s.toString());
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  function findSolution() {
    if (a !== null && b !== null && c !== null) {
      if (a !== 0) {
        x1 = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
        x2 = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
      }
    }
  }

  function logVars() {
    if (dev) {
      console.log(JSON.stringify({ a, b, c, h, k, x1, x2 }, null, 2));
    }
  }

  function updateFactorisee() {
    try {
      x1 = s_x1 !== "" ? evaluate(s_x1.toString()) : null;
      x2 = s_x2 !== "" ? evaluate(s_x2.toString()) : null;
    } catch (e) {
      x1 = 0;
      x2 = 0;
    }
    h = (x1 + x2) / 2;
    k = a * (h - x1) * (h - x2);
    b = -a * x1 - a * x2;
    c = a * x1 * x2;
    logVars();
  }

  function updateGenerale() {
    try {
      b = s_b !== "" ? evaluate(s_b.toString()) : null;
      c = s_c !== "" ? evaluate(s_c.toString()) : null;
    } catch (e) {
      b = 0;
      c = 0;
    }
    h = -b / (2 * a);
    k = (4 * a * c - b ** 2) / (4 * a);
    findSolution();
    logVars();
  }

  function updateCanonique() {
    try {
      a = s_a !== "" ? evaluate(s_a.toString()) : null;
      h = s_h !== "" ? evaluate(s_h.toString()) : null;
    } catch (e) {
      a = 0;
      h = 0;
    }
    b = -2 * a * h;
    c = a * h ** 2 + k;
    findSolution();
    logVars();
  }

  export let s_a: string = "0";
  export let s_h: string = "0";
  export let s_k: string = "0";

  export let forme: "canonique" | "generale" | "factorisee" = "canonique";

  export let num_type: true | false = false;

  export let a: number = 1;
  export let h: number = 0;
  export let k: number = 0;

  let b: number = -2 * a * h;
  let c: number = a * h ** 2 + k;
  let s_b: string = b.toString();
  let s_c: string = c.toString();

  let x1: number = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
  let x2: number = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
  let s_x1: string = x1.toString();
  let s_x2: string = x2.toString();

  $: a = eval_s(s_a);
  $: h = eval_s(s_h);
  $: k = eval_s(s_k);

  $: if (
    typeof a === "number" &&
    typeof b === "number" &&
    typeof c === "number" &&
    typeof h === "number" &&
    typeof k === "number" &&
    typeof x1 === "number" &&
    typeof x2 === "number"
  ) {
    num_type = true;
  } else {
    num_type = false;
  }
</script>

<!-- {`a: ${a} ${typeof a}, h: ${h} ${typeof h}, k: ${k} ${typeof k}`} -->
<select class="select" bind:value={forme}>
  <option value="canonique">Forme canonique</option>
  <option value="generale">Forme générale</option>
  <option value="factorisee">Forme factorisée</option>
</select>
<hr />
{#if forme === "canonique"}
  <h2 class="h2">Entrer les variables de la forme canonique (a, h et k).</h2>
  <div class="flex flex-col lg:flex-row lg:space-x-5">
    <label class="label">
      <span>a</span>
      <input type="text" title="Entrer a" class="input" bind:value={s_a} />
    </label>
    <label class="label">
      <span>h</span>
      <input
        type="text"
        title="Entrer h"
        class="input"
        bind:value={s_h}
        on:change={updateCanonique}
        on:input={updateCanonique}
      />
    </label>
    <label class="label">
      <span>k</span>
      <input
        type="text"
        title="Entrer k"
        class="input"
        bind:value={s_k}
        on:change={updateCanonique}
        on:input={updateCanonique}
      />
    </label>
  </div>
  {#if typeof a === "number" && typeof h === "number" && typeof k === "number"}
    <Katex
      >f(x)={format_decimal(a)}(x{h < 0
        ? `+${format_decimal(h).replace("-", "")}`
        : `-${format_decimal(h)}`})^2{k > 0 ? "+" : ""}{format_decimal(
        k,
      )}</Katex
    >
  {/if}
{:else if forme === "generale"}
  <h2 class="h2">Entrer les variables de la forme générale (a, b et c).</h2>
  <div class="flex flex-col lg:flex-row lg:space-x-5">
    <label class="label">
      <span>a</span>
      <input type="text" title="Entrer a" class="input" bind:value={s_a} />
    </label>
    <label class="label">
      <span>b</span>
      <input
        type="text"
        title="Entrer b"
        class="input"
        bind:value={s_b}
        on:change={updateGenerale}
        on:input={updateGenerale}
      />
    </label>
    <label class="label">
      <span>c</span>
      <input
        type="text"
        title="Entrer c"
        class="input"
        bind:value={s_c}
        on:change={updateGenerale}
        on:input={updateGenerale}
      />
    </label>
  </div>
  {#if typeof a === "number" && typeof b === "number" && typeof c === "number"}
    <Katex
      >f(x)={format_decimal(a)}x^2{b > 0 ? "+" : ""}{format_decimal(b)}x{c > 0
        ? "+"
        : ""}+{format_decimal(c)}</Katex
    >
  {/if}
{:else}
  <h2 class="h2">Entrer les variables de la forme factorisée (a, x1 et x2).</h2>
  <div class="flex flex-col lg:flex-row lg:space-x-5">
    <label class="label">
      <span>a</span>
      <input type="text" title="Entrer a" class="input" bind:value={s_a} />
    </label>
    <label class="label">
      <span>Solution 1</span>
      <input
        type="text"
        title="Entrer x1"
        class="input"
        bind:value={s_x1}
        on:change={updateFactorisee}
        on:input={updateFactorisee}
      />
    </label>
    <label class="label">
      <span>Solution 2</span>
      <input
        type="text"
        title="Entrer x2"
        class="input"
        bind:value={s_x2}
        on:change={updateFactorisee}
        on:input={updateFactorisee}
      />
    </label>
  </div>
  {#if typeof a === "number" && typeof x1 === "number" && typeof x2 === "number"}
    <Katex
      >f(x)={format_decimal(a)}(x{x1 > 0 ? "-" : "+"}{format_decimal(
        x1,
      )})(x{x2 > 0 ? "-" : "+"}{format_decimal(x2)})</Katex
    >
  {/if}
{/if}
