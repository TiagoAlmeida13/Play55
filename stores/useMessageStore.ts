import { defineStore } from 'pinia'

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

export const useMessageStore = defineStore('message', {
    state: () => ({
        messages: [] as IMensagem[],
        filter: 'recentes' as 'recentes' | 'antigas' | 'minhas',
    }),

    actions: {
        // Carregar as mensagens do localStorage
        loadMessages() {
            const storedMessages = localStorage.getItem('mensagens')
            if (storedMessages) {
                this.messages = JSON.parse(storedMessages)
            }
        },

        // Salvar as mensagens no localStorage
        saveMessages() {
            localStorage.setItem('mensagens', JSON.stringify(this.messages))
        },

        // Filtrar as mensagens de acordo com o filtro selecionado
        filteredMessages() {
            let msgs = [...this.messages]
            if (this.filter === 'minhas') {
                return msgs.filter((m) => m.mensagemPropria)
            }
            if (this.filter === 'antigas') {
                return msgs.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
            }
            return msgs.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
        },

        // Alterar o filtro de mensagens
        setFilter(filter: 'recentes' | 'antigas' | 'minhas') {
            this.filter = filter
        },

        // Curtir uma mensagem
        likeMessage(msg: IMensagem) {
            msg.curtidas++
            this.saveMessages() // Salva as mensagens após alteração
        },

        // Adicionar uma nova mensagem
        addMessage(newMessage: IMensagem) {
            this.messages.push(newMessage)
            this.saveMessages() // Salva as mensagens após adicionar
        },

        // Editar uma mensagem
        editMessage(updatedMessage: IMensagem) {
            const index = this.messages.findIndex((msg) => msg.data === updatedMessage.data)
            if (index !== -1) {
                this.messages[index] = updatedMessage
                this.saveMessages() // Salva as mensagens após edição
            }
        },

        // Deletar uma mensagem
        deleteMessage(messageData: string) {
            this.messages = this.messages.filter((msg) => msg.data !== messageData)
            this.saveMessages() // Salva as mensagens após exclusão
        },
    },
})
