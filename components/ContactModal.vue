<template>
    <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button class="absolute top-2 right-2" @click="close">X</button>
            <h2 class="text-xl font-bold mb-4">Fale conosco</h2>

            <form @submit.prevent="submit">
                <div class="mb-3">
                    <label for="nome" class="block">Nome</label>
                    <input v-model="nome" id="nome" type="text" class="border w-full p-2 rounded" required />
                </div>
                <div class="mb-3">
                    <label for="email" class="block">Email</label>
                    <input v-model="email" id="email" type="email" class="border w-full p-2 rounded" required />
                </div>
                <div class="mb-3">
                    <label for="telefone" class="block">Telefone</label>
                    <input v-model="telefone" id="telefone" type="tel" class="border w-full p-2 rounded" required />
                </div>
                <div class="mb-3">
                    <label for="nascimento" class="block">Data de nascimento</label>
                    <input v-model="nascimento" id="nascimento" type="date" class="border w-full p-2 rounded"
                        required />
                </div>
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
    visible: Boolean
})
const emit = defineEmits(['close'])

const nome = ref('')
const email = ref('')
const telefone = ref('')
const nascimento = ref('')

onMounted(() => {
    // Carregar script do reCAPTCHA
    if (!document.getElementById('recaptcha-script')) {
        const script = document.createElement('script')
        script.id = 'recaptcha-script'
        script.src = 'https://www.google.com/recaptcha/api.js?render=6LfTVC8rAAAAAISI8s59lF0JcXMq_XfgsHsepO5U'
        document.head.appendChild(script)
    }
})

function close() {
    emit('close')
}

async function submit() {
    // Obter token do reCAPTCHA
    const token = await new Promise<string>((resolve) => {
        // @ts-ignore
        grecaptcha.ready(() => {
            // @ts-ignore
            grecaptcha.execute('6LfTVC8rAAAAAISI8s59lF0JcXMq_XfgsHsepO5U', { action: 'form_submit' })
                .then((t: string) => resolve(t))
        })
    })

    const payload = {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        nascimento: nascimento.value,
        token,
    }

    try {
        await fetch('<SEU_ENDPOINT>', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        alert('Enviado com sucesso!')
        close()
    } catch (err) {
        alert('Erro ao enviar o formulário')
        console.error(err)
    }
}
</script>