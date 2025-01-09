<script lang="ts">
    import {dev} from "$app/environment";
    import {evaluate, string} from "mathjs";

    function update_forme(e: Event, button_trigger = false) {
        if (!button_trigger) {
            forme = (e.target as HTMLSelectElement).value as
                | "canonique"
                | "generale"
                | "factorisee";
        }
        console.log(forme);
        if (forme === "canonique") {
            try {
                b = string(evaluate(`-2 * ${a} * ${h}`));
                c = string(evaluate(`${a} * (${h})^2 + ${k}`));
                x1 = string(evaluate(`${h} - sqrt(-${k} / ${a})`));
                x2 = string(evaluate(`${h} + sqrt(-${k} / ${a})`));
            } catch (error) {
                console.warn(error);
                b = "0";
                c = "0";
                x1 = "0";
                x2 = "0";
            } finally {
                return;
            }
        }
        if (forme === "generale") {
            try {
                h = string(evaluate(`-1 * ${b} / 2 / ${a}`));
                k = string(evaluate(`-1 * ((${b}) ^ 2) / 4 / ${a} + ${c}`));
                x1 = string(
                    evaluate(`(-1 * ${b} - sqrt((${b}) ^ 2 - 4 * ${a} * ${c})) / 2 / ${a}`),
                );
                x2 = string(
                    evaluate(`(-1 * ${b} + sqrt((${b}) ^ 2 - 4 * ${a} * ${c})) / 2 / ${a}`),
                );
            } catch (error) {
                console.warn(error);
                h = "0";
                k = "0";
                x1 = "0";
                x2 = "0";
            } finally {
                return;
            }
        }
        if (forme === "factorisee") {
            try {
                h = string(evaluate(`(${x1} + ${x2}) / 2`));
                k = string(evaluate(`(${a}(${h} - ${x1})(${h} - ${x2}))`));
                b = string(evaluate(`-1 * ${a} * ${x1} - ${a} * ${x2}`));
                c = string(evaluate(`${a} * ${x1} * ${x2}`));
            } catch (error) {
                console.warn(error);
                h = "0";
                k = "0";
                b = "0";
                c = "0";
            } finally {
                return;
            }
        }
    }

    export let forme: "canonique" | "generale" | "factorisee" = "canonique";

    export let a: string = "1";
    export let h: string = "0";
    export let k: string = "0";

    let b: string = "0";
    let c: string = "0";
    let x1: string = "0";
    let x2: string = "0";

    const formes_vars = {
        canonique: {
            name: "canonique",
            vars: ["a", "h", "k"],
        },
        generale: {
            name: "générale",
            vars: ["a", "b", "c"],
        },
        factorisee: {
            name: "factorisée",
            vars: ["a", "x1", "x2"],
        },
    };
</script>

{#if dev}
    {`a: ${a} ${typeof a}, h: ${h} ${typeof h}, k: ${k} ${typeof k}`}
    <br/>
    {`b: ${b} ${typeof b}, c: ${c} ${typeof c}, x1: ${x1} ${typeof x1}, x2: ${x2} ${typeof x2}`}
    <br/>
    {`forme: ${forme} ${typeof forme}`}
{/if}
<select class="select" bind:value={forme} on:focus={(e) => update_forme(e)}>
    <option value="canonique">Forme canonique</option>
    <option value="generale">Forme générale</option>
    <option value="factorisee">Forme factorisée</option>
</select>
<hr/>
<h2 class="h2">
    Entrer les variables de la forme {formes_vars[forme].name}
    ({formes_vars[forme].vars.join(", ")}).
</h2>
<div class="flex flex-col lg:flex-row lg:space-x-5">
    <label class="label">
        <span>a</span>
        <input type="text" title="Entrer a" class="input" bind:value={a}/>
    </label>
    {#if forme === "canonique"}
        <label class="label">
            <span>h</span>
            <input type="text" title="Entrer h" class="input" bind:value={h}/>
        </label>
        <label class="label">
            <span>k</span>
            <input type="text" title="Entrer k" class="input" bind:value={k}/>
        </label>
    {:else if forme === "generale"}
        <label class="label">
            <span>b</span>
            <input type="text" title="Entrer b" class="input" bind:value={b}/>
        </label>
        <label class="label">
            <span>c</span>
            <input type="text" title="Entrer c" class="input" bind:value={c}/>
        </label>
    {:else if forme === "factorisee"}
        <label class="label">
            <span>x1</span>
            <input type="text" title="Entrer x1" class="input" bind:value={x1}/>
        </label>
        <label class="label">
            <span>x2</span>
            <input type="text" title="Entrer x2" class="input" bind:value={x2}/>
        </label>
    {/if}
</div>
<button
        class="button variant-filled rounded-2xl w-fit h-fit px-5 py-3"
        on:click={(e) => update_forme(e, true)}>Calculer
</button
>

