<script lang="ts">
    import "../app.postcss";
    import {Modal, getModalStore, initializeStores} from '@skeletonlabs/skeleton';
    import type {ModalSettings} from '@skeletonlabs/skeleton';
    import Credits from "$lib/components/credits.svelte";

    const creditsModal: ModalSettings = {
        type: 'component',
        component: {ref: Credits},
        title: 'Bibliothèques et librairies utilisées'
    };

    initializeStores();

    const modalStore = getModalStore();

    function openCreditsModal() {
        modalStore.trigger(creditsModal);
    }
</script>

<Modal/>
<slot/>

<footer>
    <p>Site-web créé par Andrey Kovalskiy. Pour tout problème contactez moi à l'adresse
        <i>andrey.kovalskiy@outlook.com</i>.
        <button on:click={openCreditsModal}>
            <u>Crédits</u>
        </button>.
        <a href="https://github.com/MotionForce/mathCalculator">
            Code source sur <u>Github</u>.
        </a>
    </p>
</footer>