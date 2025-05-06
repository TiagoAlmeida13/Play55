import { ref } from 'vue'

export const useRecaptcha = () => {
    const token = ref<string | null>(null)

    // Carregar o script do reCAPTCHA se ainda não foi carregado
    const loadRecaptcha = () => {
        if (!document.getElementById('recaptcha-script')) {
            const script = document.createElement('script')
            script.id = 'recaptcha-script'
            script.src = 'https://www.google.com/recaptcha/api.js?render=6LfTVC8rAAAAAISI8s59lF0JcXMq_XfgsHsepO5U'
            document.head.appendChild(script)
        }
    }

    // Obter o token do reCAPTCHA
    const getRecaptchaToken = async () => {
        return new Promise<string>((resolve) => {
            // @ts-ignore
            grecaptcha.ready(() => {
                // @ts-ignore
                grecaptcha.execute('6LfTVC8rAAAAAISI8s59lF0JcXMq_XfgsHsepO5U', { action: 'form_submit' })
                    .then((t: string) => {
                        token.value = t
                        resolve(t)
                    })
            })
        })
    }

    return {
        loadRecaptcha,
        getRecaptchaToken,
        token,
    }
}
