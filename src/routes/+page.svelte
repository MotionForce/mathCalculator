<script lang="ts">
  import Katex from "svelte-katex";
  import ParamSelector from "$lib/components/paramSelector.svelte";
  import { storage } from "svelte-legos";
  import { writable } from "svelte/store";
  import Plot from "$lib/components/plot.svelte";

  let precision = storage(writable(5), "precision");

  let a = storage(writable(1), "a");
  let h = storage(writable(0), "h");
  let k = storage(writable(0), "k");

  let forme = storage(
    writable<"canonique" | "generale" | "factorisee">("canonique"),
    "forme",
  );

  let num_type = false;

  $: precision_ = $precision < 1 || $precision > 10 ? 5 : $precision;
  $: r_a = $a === null ? 1 : parseFloat($a.toPrecision(precision_));
  $: r_h = $h === null ? 1 : parseFloat($h.toPrecision(precision_));
  $: r_k = $k === null ? 1 : parseFloat($k.toPrecision(precision_));
  $: sol_1 =
    $a !== 0
      ? parseFloat(($h - Math.sqrt(-$k / $a)).toPrecision(precision_))
      : null;
  $: sol_2 =
    $a !== 0
      ? parseFloat(($h + Math.sqrt(-$k / $a)).toPrecision(precision_))
      : null;
</script>

<div
  class="lg:m-10 p-4 md:p-10 flex flex-col space-y-10 bg-surface-300-600-token lg:rounded-3xl"
>
  <h1 class="h1 font-bold">
    Calculatrice de propriété de fonction quadratique
  </h1>
  <div class="p-7 flex flex-col space-y-5 bg-surface-500-400-token rounded-2xl">
    <ParamSelector
      bind:precision={precision_}
      bind:a={$a}
      bind:h={$h}
      bind:k={$k}
      bind:forme={$forme}
      bind:num_type
    />
    {#if num_type}
      {#if $a !== 0}
        <hr />
        <h2 class="h2">Les propriétés</h2>
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
                  <Katex>dom(f)=\mathbb{"{R}"}</Katex>
                </td>
              </tr>
              <tr>
                <th>Image</th>
                <td>
                  <Katex
                    >ima(f)={r_a > 0 === true
                      ? `]-\\infty,${r_k}]`
                      : `[${r_k},+\\infty[`}</Katex
                  >
                </td>
              </tr>
              <tr>
                <th>Valeur initiale</th>
                <td>
                  <Katex
                    >f(0)={parseFloat(
                      ((-$h) ** 2 * $a + $k).toPrecision(precision_),
                    )}</Katex
                  >
                </td>
              </tr>
              <tr>
                <th>Zéros</th>
                <td>
                  <Katex>
                    {#if $k === 0}
                      f(x)=0\space\forall\space x={r_h}
                    {:else if $a * $k > 0}
                      f(x)=0\space\forall\space x\in{"\\{\\}"}
                    {:else}
                      f(x)=0\space\forall\space x\in{"\\{"}{sol_1},{sol_2}{"\\}"}
                    {/if}
                  </Katex>
                </td>
              </tr>
              <tr>
                <th>Croissance</th>
                <td>
                  {#if $a > 0}
                    <Katex>
                      f\nearrow\space\forall\space x\in{`[${r_h},+\\infty[`}
                    </Katex>
                  {:else}
                    <Katex>
                      f\nearrow\space\forall\space x\in{`]-\\infty,${r_h}]`}
                    </Katex>
                  {/if}
                </td>
              </tr>
              <tr>
                <th>Décroissance</th>
                <td>
                  {#if $a > 0}
                    <Katex>
                      f\searrow\space\forall\space x\in{`]-\\infty,${r_h}]`}
                    </Katex>
                  {:else}
                    <Katex>
                      f\searrow\space\forall\space x\in{`[${r_h},+\\infty[`}
                    </Katex>
                  {/if}
                </td>
              </tr>
              <tr>
                <th>Maximum</th>
                <td>
                  {#if $a > 0}
                    <p class="text-lg">aucun</p>
                  {:else}
                    <Katex>{r_k}</Katex>
                  {/if}
                </td>
              </tr>
              <tr>
                <th>Minimum</th>
                <td>
                  {#if $a > 0}
                    <Katex>{r_k}</Katex>
                  {:else}
                    <p class="text-lg">aucun</p>
                  {/if}
                </td>
              </tr>
              <tr>
                <th>Signe positif</th>
                <td>
                  {#if $a >= 0 && $k >= 0}
                    <Katex>
                      f(x)\geq0\space\forall\space x\in\mathbb{"{R}"}
                    </Katex>
                  {:else if $a < 0 && $k < 0}
                    <Katex>
                      f(x)\geq0\space\forall\space x\in\mathbb{"\\{\\}"}
                    </Katex>
                  {:else if $a < 0 && $k === 0}
                    <Katex>
                      f(x)\geq0\space\forall\space x={r_h}
                    </Katex>
                  {:else if $a < 0 && $k > 0}
                    <Katex>
                      f(x)\geq0\space\forall\space x\in[{sol_1},{sol_2}]
                    </Katex>
                  {:else if $a > 0 && $k < 0}
                    <Katex>
                      f(x)\geq0\space\forall\space x\in]-\infty,{sol_1}]\cup[{sol_2},+\infty[
                    </Katex>
                  {/if}
                </td>
              </tr>
              <tr>
                <th>Signe négatif</th>
                <td>
                  {#if $a > 0 && $k > 0}
                    <Katex>
                      f(x)\leq0\space\forall\space x\in\mathbb{"\\{\\}"}
                    </Katex>
                  {:else if $a <= 0 && $k <= 0}
                    <Katex>
                      f(x)\leq0\space\forall\space x\in\mathbb{"{R}"}
                    </Katex>
                  {:else if $a > 0 && $k === 0}
                    <Katex>
                      f(x)\leq0\space\forall\space x={r_h}
                    </Katex>
                  {:else if $a > 0 && $k < 0}
                    <Katex>
                      f(x)\leq0\space\forall\space x\in[{sol_1},{sol_2}]
                    </Katex>
                  {:else if $a < 0 && $k > 0}
                    <Katex>
                      f(x)\leq0\space\forall\space x\in]-\infty,{sol_1}]\cup[{sol_2},+\infty[
                    </Katex>
                  {/if}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {#key $a}
          {#key $h}
            {#key $k}
              {#if num_type}
                {#if $a !== 0}
                  <Plot a={$a} h={$h} k={$k} />
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
