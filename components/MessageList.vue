<script setup lang="ts">
import type { IMensagem } from '~/types/IMensagem'
import MessageItem from './MessageItem.vue'

const props = defineProps<{
  mensagens: IMensagem[]
}>()
</script>

<template>
  <div class="space-y-4">
    <MessageItem
      v-for="(msg, index) in mensagens"
      :key="index"
      :mensagem="msg"
      @curtir="$emit('curtir', index)"
    />
  </div>
</template>
