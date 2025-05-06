<script setup lang="ts">
import { LoginGoogle } from "#components";

//store
import { useTabStore } from '~/stores/useTabStore';

const tabStore = useTabStore();

const tabs: { [key: string]: any } = {
  Login: LoginGoogle,
};
</script>

<template>
  <section>
    <component :is="tabs[tabStore.currentTab]" />
  </section>
</template>
