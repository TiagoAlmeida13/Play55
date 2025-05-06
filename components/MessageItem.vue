<script setup lang="ts">
import type { IMensagem } from '~/types/IMensagem'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  mensagem: IMensagem
}>()

const emit = defineEmits(['curtir'])
</script>

<template>
  <div class="flex gap-4 bg-white p-4 rounded-xl shadow-sm">
    <!-- Avatar fictício -->
    <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
      {{ mensagem.nomeRemetente.charAt(0).toUpperCase() }}
    </div>

    <div class="flex-1">
      <div class="flex justify-between items-center">
        <h2 class="font-semibold">{{ mensagem.nomeRemetente }}</h2>
        <span class="text-sm text-gray-400">{{ mensagem.data }}</span>
      </div>
      <p class="mt-1 text-gray-700">
        {{ mensagem.texto || 'Mensagem sem conteúdo.' }}
      </p>

      <div class="mt-2 flex items-center gap-2">
        <button @click="$emit('curtir')" class="text-red-500 hover:scale-110 transition">
          ❤️
        </button>
        <span class="text-sm">{{ mensagem.curtidas }}</span>
        <template v-if="mensagem.mensagemPropria && mensagem.acoes">
          <button class="text-sm text-blue-500 ml-4 hover:underline" v-if="mensagem.acoes.editar">Editar</button>
          <button class="text-sm text-red-500 hover:underline" v-if="mensagem.acoes.excluir">Excluir</button>
        </template>
      </div>
    </div>
  </div>
</template>
