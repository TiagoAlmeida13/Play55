<template>
    <div class="border p-4 mb-3">
        <p><strong>{{ mensagem.nomeRemetente }}</strong></p>
        <p>{{ mensagem.data }}</p>
        <p>{{ mensagem.texto }}</p>
        <p>Curtidas: {{ mensagem.curtidas }}</p>
        <div class="flex gap-2 mt-2">
            <button @click="curtir">Curtir</button>
            <button v-if="mensagem.mensagemPropria && mensagem.acoes?.editar"
                @click="$emit('edit', mensagem)">Editar</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface IMensagem {
    nomeRemetente: string
    data: string
    curtidas: number
    mensagemPropria: boolean
    texto: string
    acoes?: {
        editar?: boolean
        excluir?: boolean
    }
}

const props = defineProps<{
    mensagem: IMensagem
}>()

const emit = defineEmits(['curtir', 'edit'])

function curtir() {
    emit('curtir', props.mensagem)
}
</script>