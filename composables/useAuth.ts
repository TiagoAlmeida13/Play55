import { useUserStore } from '~/stores/useUserStore'
import { ref, computed } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'

export const useAuth = () => {
    const userStore = useUserStore()
    const auth = getAuth()
    const isLoading = ref(false)

    // Login com Google
    const loginWithGoogle = async () => {
        isLoading.value = true
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            userStore.setUser({
                uid: user.uid,
                name: user.displayName || '',
                email: user.email || ''
            })
        } catch (error) {
            console.error('Erro no login: ', error)
        } finally {
            isLoading.value = false
        }
    }

    // Logout
    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error('Erro ao fazer logout:', error)
        } finally {
            userStore.clearUser()
        }
    }

    // Define o UID manualmente
    const setUserId = (uid: string) => {
        userStore.setUser({
            ...(userStore.user || { name: '', email: '' }),
            uid
        })
    }

    // Reseta os dados do usuário
    const reset = () => {
        userStore.clearUser()
    }

    return {
        loginWithGoogle,
        logout,
        isLoading,
        isAuthenticated: computed(() => userStore.isAuthenticated),
        user: computed(() => userStore.user),
        setUserId,
        reset
    }
}
