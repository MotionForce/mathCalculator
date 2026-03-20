<script lang="ts">
    import "../app.css";
    import { Dialog, Portal } from "@skeletonlabs/skeleton-svelte";
    interface Props {
        children?: import("svelte").Snippet;
    }

    let { children }: Props = $props();
</script>

{@render children?.()}

<footer>
    <p>
        Site-web créé par Andrey Kovalskiy. Pour tout problème contactez moi à
        l'adresse
        <i>andrey.kovalskiy@outlook.com</i>.
        <Dialog role="alertdialog">
            <Dialog.Trigger class="btn preset-filled">Crédits</Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop
                    class="fixed inset-0 z-50 bg-error-50-950/50"
                />
                <Dialog.Positioner
                    class="fixed inset-0 z-50 flex justify-center items-center"
                >
                    <Dialog.Content
                        class="card preset-filled-error-500 w-md p-4 space-y-2 shadow-xl"
                    >
                        <Dialog.Title class="text-2xl font-bold"
                            >Bibliothèques et librairies utilisées</Dialog.Title
                        >
                        <Dialog.Description>
                            <p>Pour la structure du site-web :</p>
                            <ul class="list">
                                <li>
                                    <a href="https://svelte.dev/"
                                        ><u>Svelte et SvelteKit</u></a
                                    >
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/ankurrsinghal/svelte-legos"
                                        ><u>Svelte Legos</u></a
                                    > (seulement pour la version précédente, pas
                                    la version actuelle
                                </li>
                            </ul>
                            <div
                                class="w-full border-t-2 border-gray-600"
                            ></div>
                            <p>Pour l'interface utilisateur :</p>
                            <ul class="list">
                                <li>
                                    <a href="https://www.skeleton.dev/"
                                        ><u>Skeleton</u></a
                                    >
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/"
                                        ><u>TailwindCSS</u></a
                                    >
                                </li>
                            </ul>
                            <div
                                class="w-full border-t-2 border-gray-600"
                            ></div>
                            <p>
                                Pour toutes les fonctionalités mathématiques :
                            </p>
                            <ul class="list">
                                <li>
                                    <a href="https://plotly.com/javascript/"
                                        ><u>Plotly</u></a
                                    >
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/aknakos/sveltekit-plotly"
                                        ><u>Svelte Plotly wrapper</u></a
                                    >
                                </li>
                                <li>
                                    <a href="https://mathjs.org/"
                                        ><u>MathJS</u></a
                                    >
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/kelvinsjk/mathlified/tree/main/packages/svelte-katex"
                                        ><u>Svelte-Katex</u></a
                                    >
                                </li>
                            </ul>
                        </Dialog.Description>
                        <Dialog.CloseTrigger class="btn preset-tonal-error"
                            >Fermer</Dialog.CloseTrigger
                        >
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog>

        <a href="https://github.com/MotionForce/mathCalculator">
            Code source sur <u>Github</u>.
        </a>
    </p>
</footer>
