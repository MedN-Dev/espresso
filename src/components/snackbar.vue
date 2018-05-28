<template lang="pug">
v-snackbar(
  v-bind="Snackbar"
  @input="(value) => setValue(value)"
) {{ $store.state.Snackbar.text }}
  v-btn(
    @click.native="setValue(false)"
    dark flat
  ) {{ $t('CLOSE') }}
</template>

<script src="@/components/snackbar.js"></script>
