import { ref } from 'vue'
import { useMessageStore } from '~/stores/useMessageStore'

export const useMessages = () => {
    const messageStore = useMessageStore()

    // Função para adicionar uma nova mensagem
    const addMessage = (message: {
        nomeRemetente: string,
        data: string,
        curtidas: number,
        mensagemPropria: boolean,
        texto: string
    }) => {
        messageStore.addMessage(message)
    }

    // Função para editar uma mensagem existente
    const editMessage = (updatedMessage: {
        nomeRemetente: string,
        data: string,
        curtidas: number,
        mensagemPropria: boolean,
        texto: string
    }) => {
        messageStore.editMessage(updatedMessage)
    }

    // Função para remover uma mensagem
    const deleteMessage = (messageData: string) => {
        messageStore.deleteMessage(messageData)
    }

    // Função para curtir uma mensagem
    const likeMessage = (message: {
        nomeRemetente: string,
        data: string,
        curtidas: number,
        mensagemPropria: boolean,
        texto: string
    }) => {
        messageStore.likeMessage(message)
    }

    // Função para filtrar as mensagens
    const setFilter = (filter: 'recentes' | 'antigas' | 'minhas') => {
        messageStore.setFilter(filter)
    }

    return {
        addMessage,
        editMessage,
        deleteMessage,
        likeMessage,
        setFilter,
        filteredMessages: messageStore.filteredMessages,
    }
}
