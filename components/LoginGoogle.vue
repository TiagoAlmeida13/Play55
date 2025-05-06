<template>
    <div class="flex justify-center items-center h-full">
        <button @click="loginWithGoogle" class="bg-blue-500 text-white px-6 py-2 rounded">
            Entrar com Google
        </button>
    </div>
</template>

<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";

const auth = getAuth();
const router = useRouter();

async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        // Salvar os dados do usuário
        const user = result.user;
        console.log("Usuário logado com sucesso:", user);
        // Redirecionar após o login
        router.push("/dashboard");
    } catch (error) {
        console.error("Erro ao logar com o Google", error);
    }
}
</script>