<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useNuxtApp } from '#app'
import { onAuthStateChanged } from 'firebase/auth'

// stores
import { useUserStore } from '~/stores/useUserStore'

// composables
import { useAuth } from '~/composables/useAuth'

const loading = ref(true)
const nuxtApp = useNuxtApp()
const userStore = useUserStore()
const { setUserId, reset } = useAuth()

onBeforeMount(() => {
  const unsub = onAuthStateChanged(nuxtApp.$auth, (user) => {
    if (user) {
      setUserId(user.uid)
      userStore.updateLoginStatus(true)
    } else {
      reset()
      userStore.updateLoginStatus(false)
    }
    loading.value = false
  })

  return unsub
})
</script>

<template>
  <div>
    <div v-if="!loading">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
