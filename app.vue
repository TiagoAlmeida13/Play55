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
      console.log('Usuário autenticado:', user)
      setUserId(user.uid)
      userStore.setUser({
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || ''
      })
    } else {
      console.log('Nenhum usuário autenticado')
      reset() // ✅ já chama userStore.clearUser()
    }
    loading.value = false
  })

  // opcional: retorna unsub para possíveis usos futuros
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
    <div v-else>
      <p>Carregando...</p>
    </div>
  </div>
</template>
