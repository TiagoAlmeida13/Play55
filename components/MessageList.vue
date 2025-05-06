<template>
    <div>
        <MessageForm @message-created="addMessage" />

        <div class="flex gap-2 my-6">
            <button @click="setFilter('recentes')">Recentes</button>
            <button @click="setFilter('antigas')">Antigas</button>
            <button @click="setFilter('minhas')">Minhas</button>
        </div>

        <MessageItem v-for="msg in filteredMessages" :key="msg.data + msg.nomeRemetente" :msg="msg"
            @edit="editMessage" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import MessageForm from './MessageForm.vue'
import MessageItem from './MessageItem.vue'

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

const messages = ref<IMensagem[]>([])
const filter = ref<'recentes' | 'antigas' | 'minhas'>('recentes')

onMounted(() => {
    const stored = localStorage.getItem('mensagens')
    messages.value = stored ? JSON.parse(stored) : []
})

const filteredMessages = computed(() => {
    let msgs = [...messages.value]
    if (filter.value === 'minhas') {
        return msgs.filter((m) => m.mensagemPropria)
    }
    if (filter.value === 'antigas') {
        return msgs.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
    }
    return msgs.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
})

function setFilter(f: typeof filter.value) {
    filter.value = f
}

function addMessage(msg: IMensagem) {
    messages.value.push(msg)
}

function editMessage(msg: IMensagem) {
    // implementar mais tarde
}
</script>