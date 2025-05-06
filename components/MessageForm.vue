<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
            <label class="block">Mensagem:</label>
            <textarea v-model="texto" required class="w-full border p-2 rounded" />
        </div>

        <div>
            <label class="flex items-center gap-2">
                <input type="checkbox" v-model="outraPessoa" />
                Mensagem de outra pessoa
            </label>
        </div>

        <div v-if="outraPessoa">
            <label class="block">Nome da pessoa:</label>
            <input v-model="nomeRemetente" type="text" required class="w-full border p-2 rounded" />
        </div>

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
            Enviar
        </button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

const emit = defineEmits(['message-created'])

const texto = ref('')
const outraPessoa = ref(false)
const nomeRemetente = ref('')

function handleSubmit() {
    const novaMensagem: IMensagem = {
        nomeRemetente: outraPessoa.value ? nomeRemetente.value : 'Você',
        texto: texto.value,
        data: new Date().toISOString(),
        curtidas: 0,
        mensagemPropria: !outraPessoa.value,
        acoes: {
            editar: !outraPessoa.value,
            excluir: !outraPessoa.value,
        },
    }

    const stored = localStorage.getItem('mensagens')
    const mensagens = stored ? JSON.parse(stored) : []
    mensagens.push(novaMensagem)
    localStorage.setItem('mensagens', JSON.stringify(mensagens))

    emit('message-created', novaMensagem)

    texto.value = ''
    nomeRemetente.value = ''
    outraPessoa.value = false
}
</script>