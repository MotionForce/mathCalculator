<script lang="ts">
    // @ts-expect-error
    import Katex from "svelte-katex";
    import ParamSelector from "$lib/components/paramSelector.svelte";
    import {writable} from "svelte/store";
    import Plot from "$lib/components/plot.svelte";
    import {
        unequal,
        type Fraction,
        fraction,
        larger,
        typeOf,
        string,
    } from "mathjs";
    import {
        croissance,
        decroissance,
        domain,
        image,
        valeur_initiale,
        zeros,
        signe_positif,
        signe_negatif,
    } from "$lib/properties";
    import {calc_sols, format_decimal} from "$lib/utilities";
    import {dev} from "$app/environment";

    const string_a = writable<string>("1");
    const string_h = writable<string>("0");
    const string_k = writable<string>("0");
    const forme = writable<"canonique" | "generale" | "factorisee">("canonique");

    let a: Fraction | null;
    let h: Fraction | null;
    let k: Fraction | null;

    try {
        a = fraction($string_a);
    } catch (error) {
        console.warn(error);
        a = fraction(1);
    }
    try {
        h = fraction($string_h);
    } catch (error) {
        console.warn(error);
        h = fraction(0);
    }
    try {
        k = fraction($string_k);
    } catch (error) {
        console.warn(error);
        k = fraction(0);
    }

    $: sols = calc_sols(a, h, k);
    $: try {
        a = fraction($string_a);
    } catch (error) {
        console.warn(error);
        a = null;
    }
    $: try {
        h = fraction($string_h);
    } catch (error) {
        console.warn(error);
        h = null;
    }
    $: try {
        k = fraction($string_k);
    } catch (error) {
        console.warn(error);
        k = null;
    }
    $: num_type =
        typeOf(a) === "Fraction" &&
        typeOf(h) === "Fraction" &&
        typeOf(k) === "Fraction" &&
        a !== null &&
        h !== null &&
        k !== null;
</script>

{#if dev}
    {`$a: ${string_a} ${typeof string_a}, $h: ${string_h} ${typeof string_h}, $k: ${string_k} ${typeof string_k}`}
    <br/>
    {`$a: ${a} ${typeof a}, $h: ${h} ${typeof h}, $k: ${k} ${typeof k}`}
    <br/>
    {`sol_1: ${sols[0]} ${typeof sols[0]}, sol_2: ${sols[1]} ${typeof sols[1]}`}
    <br/>
    {`forme: ${$forme} ${typeof $forme}`}
{/if}
<div
        class="lg:m-10 p-4 md:p-10 flex flex-col space-y-10 bg-surface-300-600-token lg:rounded-3xl"
>
    <h1 class="h1 font-bold">
        Calculatrice de propriétés de fonction quadratique
    </h1>
    <div class="p-7 flex flex-col space-y-5 bg-surface-500-400-token rounded-2xl">
        <h4 class="h4">S'il-vous-plait utiliser des points à la place des virgules.</h4>
        <ParamSelector
                bind:a={$string_a}
                bind:h={$string_h}
                bind:k={$string_k}
        />
        {#if num_type && a !== null && h !== null && k !== null && unequal(a, 0)}
            <hr/>
            <h2 class="h2">Les propriétés</h2>
            <div class="flex flex-col xl:flex-row space-x-3">
                <!-- table -->
                <div class="table-container w-full">
                    {#key a}
                        {#key h}
                            {#key k}
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
                                            <Katex>{image(a, k)}</Katex>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Valeur initiale</th>
                                        <td>
                                            <Katex>{valeur_initiale(a, h, k)}</Katex>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Zéros</th>
                                        <td>
                                            <Katex>{zeros(a, h, k, sols)}</Katex>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Croissance</th>
                                        <td>
                                            <Katex>{croissance(a, h)}</Katex>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Décroissance</th>
                                        <td>
                                            <Katex>{decroissance(a, h)}</Katex>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Maximum</th>
                                        <td>
                                            {#if larger(a, 0)}
                                                <p class="text-lg">aucun</p>
                                            {:else}
                                                <Katex>{format_decimal(k)}</Katex>
                                            {/if}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Minimum</th>
                                        <td>
                                            {#if larger(a, 0)}
                                                <Katex>{format_decimal(k)}</Katex>
                                            {:else}
                                                <p class="text-lg">aucun</p>
                                            {/if}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Signe positif</th>
                                        <td>
                                            <Katex>{signe_positif(a, h, k, sols)}</Katex>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Signe négatif</th>
                                        <td>
                                            <Katex>{signe_negatif(a, h, k, sols)}</Katex>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            {/key}
                        {/key}
                    {/key}
                </div>
                <!-- plot -->
                <div class="w-full self-center">
                    {#key a}
                        {#key h}
                            {#key k}
                                {#if num_type && unequal(a, 0)}
                                    <Plot {a} {h} {k}/>
                                {/if}
                            {/key}
                        {/key}
                    {/key}
                </div>
            </div>
        {:else}
            <h4 class="h4">
                S'il vous plaît inscrivez les valeurs numériques pour les paramètres
                ci-dessus.
            </h4>
        {/if}
    </div>
</div>
