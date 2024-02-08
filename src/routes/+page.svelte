<script lang="ts">
  // @ts-expect-error
  import Katex from "svelte-katex";
  import ParamSelector from "$lib/components/paramSelector.svelte";
  import { storage } from "svelte-legos";
  import { writable } from "svelte/store";
  import Plot from "$lib/components/plot.svelte";
  import { evaluate } from "mathjs";
  import {
    croissance,
    decroissance,
    domain,
    image,
    valeur_initiale,
    zeros,
    format_decimal,
    signe_positif,
    signe_negatif,
  } from "$lib/properties";

  let a = storage(writable<string>("1"), "a");
  let h = storage(writable<string>("0"), "h");
  let k = storage(writable<string>("0"), "k");

  let forme = storage(
    writable<"canonique" | "generale" | "factorisee">("canonique"),
    "forme",
  );

  let num_type = false;

  let n_a: number = 1.0;
  let n_h: number = 0.0;
  let n_k: number = 0.0;

  try {
    n_a = $a !== null ? parseFloat(evaluate($a.toString())) : 1.0;
    n_h = $h !== null ? parseFloat(evaluate($h.toString())) : 0.0;
    n_k = $k !== null ? parseFloat(evaluate($k.toString())) : 0.0;
  } catch (e) {
    n_a = 1.0;
    n_h = 0.0;
    n_k = 0.0;
    console.log(e);
  }

  console.log(JSON.stringify({ a, h, k, n_a, n_h, n_k }, null, 2));

  $: sol_1 = n_a !== 0 ? n_h - Math.sqrt(-n_k / n_a) : null;
  $: sol_2 = n_a !== 0 ? n_h + Math.sqrt(-n_k / n_a) : null;
</script>

<!-- {`$a: ${$a} ${typeof $a}, $h: ${$h} ${typeof $h}, $k: ${$k} ${typeof $k}`}
<br />
{`a: ${n_a} ${typeof n_a}, h: ${n_h} ${typeof n_h}, k: ${n_k} ${typeof n_k}`} -->
<div
  class="lg:m-10 p-4 md:p-10 flex flex-col space-y-10 bg-surface-300-600-token lg:rounded-3xl"
>
    <h1 class="h1 font-bold">
      Calculatrice de propriété de fonction quadratique
    </h1>
  <div class="p-7 flex flex-col space-y-5 bg-surface-500-400-token rounded-2xl">
    <ParamSelector
      bind:s_a={$a}
      bind:s_h={$h}
      bind:s_k={$k}
      bind:a={n_a}
      bind:h={n_h}
      bind:k={n_k}
      bind:forme={$forme}
      bind:num_type
    />
    {#if num_type}
      {#if n_a !== 0}
        <hr />
        <h2 class="h2">Les propriétés</h2>
        <p>Certaines erreurs peuvent survenir dans le calcul des décimales.</p>
        <div class="table-container">
          <table class="table table-hover">
            <thead>
              <tr>
                <th class="w-fit min-w-56">Propriété</th>
                <th class="w-full">Valeur</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Domaine</th>
                <td>
                  <Katex>{domain()}</Katex>
                </td>
              </tr>
              <tr>
                <th>Image</th>
                <td>
                  <Katex>{image(n_a, n_k)}</Katex>
                </td>
              </tr>
              <tr>
                <th>Valeur initiale</th>
                <td>
                  <Katex>{valeur_initiale(n_a, n_h, n_k)}</Katex>
                </td>
              </tr>
              <tr>
                <th>Zéros</th>
                <td>
                  <Katex>{zeros(n_a, n_h, n_k, sol_1, sol_2)}</Katex>
                </td>
              </tr>
              <tr>
                <th>Croissance</th>
                <td>
                  <Katex>{croissance(n_a, n_h)}</Katex>
                </td>
              </tr>
              <tr>
                <th>Décroissance</th>
                <td>
                  <Katex>{decroissance(n_a, n_h)}</Katex>
                </td>
              </tr>
              <tr>
                <th>Maximum</th>
                <td>
                  {#if n_a > 0}
                    <p class="text-lg">aucun</p>
                  {:else}
                    <Katex>{format_decimal(n_k)}</Katex>
                  {/if}
                </td>
              </tr>
              <tr>
                <th>Minimum</th>
                <td>
                  {#if n_a > 0}
                    <Katex>{format_decimal(n_k)}</Katex>
                  {:else}
                    <p class="text-lg">aucun</p>
                  {/if}
                </td>
              </tr>
              <tr>
                <th>Signe positif</th>
                <td>
                  <Katex>{signe_positif(n_a, n_h, n_k, sol_1, sol_2)}</Katex>
                </td>
              </tr>
              <tr>
                <th>Signe négatif</th>
                <td>
                  <Katex>{signe_negatif(n_a, n_h, n_k, sol_1, sol_2)}</Katex>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {#key n_a}
          {#key n_h}
            {#key n_k}
              {#if num_type}
                {#if n_a !== 0}
                  <Plot a={n_a} h={n_h} k={n_k} />
                {/if}
              {/if}
            {/key}
          {/key}
        {/key}
      {/if}
    {:else}
      <h4 class="h4">
        S'il vous plaît inscrivez les valeurs numériques pour les paramètres
        ci-dessus.
      </h4>
    {/if}
  </div>
</div>
