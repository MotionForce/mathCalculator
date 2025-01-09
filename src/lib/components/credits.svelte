<script lang="ts">
    import type {SvelteComponent} from 'svelte';

    import {getModalStore} from '@skeletonlabs/skeleton';

    export let parent: SvelteComponent;

    const modalStore = getModalStore();

</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
    <div class="card p-4 w-modal space-y-3">
        <header class="h2">{$modalStore[0].title ?? '(title missing)'}</header>
        <div class="w-full border-t-2 border-gray-600"></div>
        <p>Pour la structure du site-web :</p>
        <ul class="list">
            <li><a href="https://svelte.dev/"><u>Svelte et SvelteKit</u></a></li>
            <li><a href="https://github.com/ankurrsinghal/svelte-legos"><u>Svelte Legos</u></a> (seulement pour la version précédente, pas la version actuelle</li>
        </ul>
        <div class="w-full border-t-2 border-gray-600"></div>
        <p>Pour l'interface utilisateur :</p>
        <ul class="list">
            <li><a href="https://www.skeleton.dev/"><u>Skeleton</u></a></li>
            <li><a href="https://tailwindcss.com/"><u>TailwindCSS</u></a></li>
        </ul>
        <div class="w-full border-t-2 border-gray-600"></div>
        <p>Pour toutes les fonctionalités mathématiques :</p>
        <ul class="list">
            <li><a href="https://plotly.com/javascript/"><u>Plotly</u></a></li>
            <li><a href="https://github.com/aknakos/sveltekit-plotly"><u>Svelte Plotly wrapper</u></a></li>
            <li><a href="https://mathjs.org/"><u>MathJS</u></a></li>
            <li>
                <a href="https://github.com/kelvinsjk/mathlified/tree/main/packages/svelte-katex"><u>Svelte-Katex</u></a>
            </li>
        </ul>
        <footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonPositive}"
                    on:click={() => {modalStore.close();}}>Fermer</button>
        </footer>
    </div>
{/if}