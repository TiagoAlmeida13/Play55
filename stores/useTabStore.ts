import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', {
    state: () => ({
        currentTab: 'Login'
    }),
    actions: {
        setTab(tabName: string) {
            this.currentTab = tabName
        }
    }
})
