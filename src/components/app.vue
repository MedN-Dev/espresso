<template lang="pug">
v-app
  sidebar
  topbar
  v-content
    v-container(fill-height fluid)
      router-view
  accounting-dialog
  company-dialog
  customer-dialog
  snackbar
</template>

<style lang="stylus">
@import '~vuetify/src/stylus/main';

* {
  font-family: Prompt, sans-serif;
}

.fullwidth {
  width: 100%;
}
</style>

<script src="@/components/app.js"></script>
