import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', {
    state: () => ({
        currentTab: 'Login' // ou outro valor inicial desejado
    }),
    actions: {
        setTab(tabName: string) {
            this.currentTab = tabName
        }
    }
})
