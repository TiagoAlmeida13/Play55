<script setup lang="ts">
import { LoginGoogle, ContactModal } from "#components"
import { useTabStore } from '~/stores/useTabStore';
import { ref } from 'vue'

const tabStore = useTabStore()
const tabs: { [key: string]: any } = {
    Login: LoginGoogle,
}

const showModal = ref(false)
</script>

<template>
    <section>
        <header class="flex justify-between items-center px-4 py-3 bg-gray-800 text-white">
            <h1 class="text-xl font-semibold">Meu Projeto</h1>
            <button @click="showModal = true" class="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                Fale conosco
            </button>
        </header>

        <component :is="tabs[tabStore.currentTab]" />

        <ContactModal :visible="showModal" @close="showModal = false" />
    </section>
</template>
