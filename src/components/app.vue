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

$primary ?= #F57C00;

* {
  font-family: Prompt, sans-serif;
}

.file-upload {
  color: #fff;
  background-color: $primary;
  border-color: #007bff;
  border-radius: .25rem;
  border: 1px solid transparent;
  font-size: 1rem;
  line-height: 1.25;
  padding: .5rem .75rem;
}

.fullwidth {
  width: 100%;
}
</style>

<script src="@/components/app.js"></script>
