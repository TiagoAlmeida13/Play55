import { defineStore } from 'pinia'

interface IUser {
    uid?: string
    name?: string
    email?: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as IUser | null,
        isAuthenticated: false
    }),

    actions: {
        /**
         * Define ou atualiza os dados do usuário
         */
        setUser(userData: IUser) {
            this.user = { ...(this.user || {}), ...userData }
            this.isAuthenticated = true
        },

        /**
         * Limpa os dados do usuário (logout)
         */
        clearUser() {
            this.user = null
            this.isAuthenticated = false
        },

        /**
         * Verifica se o usuário está autenticado
         */
        checkAuthentication(): boolean {
            return this.isAuthenticated
        }
    },

    getters: {
        /**
         * Retorna o nome do usuário autenticado, se houver
         */
        userName: (state) => state.user?.name ?? ''
    }
})
