<script setup lang="ts">
import { ref } from 'vue'
import MessageList from '~/components/MessageList.vue'
import MessageForm from '~/components/MessageForm.vue'
import type { IMensagem } from '../types/IMensagem' // use caminho relativo para evitar erros

// Lista reativa de mensagens
const mensagens = ref<IMensagem[]>([
  {
    nomeRemetente: 'amyrobson',
    data: '1 mês atrás',
    curtidas: 12,
    mensagemPropria: false,
    acoes: {}
  },
  {
    nomeRemetente: 'maxblagun',
    data: '2 semanas atrás',
    curtidas: 5,
    mensagemPropria: false,
    acoes: {}
  }
])

// Adiciona nova mensagem com propriedades automáticas
const adicionarMensagem = (mensagem: IMensagem) => {
  mensagens.value.push({
    ...mensagem,
    curtidas: 0,
    data: new Date().toLocaleDateString('pt-BR'),
    mensagemPropria: true,
    acoes: {
      editar: true,
      excluir: true
    }
  })
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-4 space-y-6">
    <h1 class="text-2xl font-semibold">Fluxo de Mensagens</h1>
    <MessageList :mensagens="mensagens" />
    <MessageForm @nova-mensagem="adicionarMensagem" />
  </div>
</template>
