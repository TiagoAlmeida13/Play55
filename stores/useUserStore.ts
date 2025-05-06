import { defineStore } from 'pinia'

interface IUser {
    uid?: string
    name?: string
    email?: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as IUser | null,
        isAuthenticated: false,
    }),

    actions: {
        // Define ou atualiza os dados do usuário
        setUser(userData: IUser) {
            if (this.user) {
                this.user = { ...this.user, ...userData }
            } else {
                this.user = userData
            }
            this.isAuthenticated = true
        },

        // Limpa os dados do usuário (logout)
        clearUser() {
            this.user = null
            this.isAuthenticated = false
        },

        // Verifica se o usuário está autenticado
        checkAuthentication() {
            return this.isAuthenticated
        },
    },
})
