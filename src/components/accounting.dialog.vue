<template lang="pug">
v-dialog(v-model="value" max-width="580")
  v-form(
    @submit.prevent="onSubmit"
    class="fullwidth"
    ref="form"
    lazy-validation
  )
    v-toolbar(color="secondary" dark)
      v-toolbar-title {{ $t('ACCOUNTING') }}
      v-spacer
    v-card
      v-card-text
        v-text-field(
          v-model="code"
          :counter="structures.code.length"
          :disabled="safe === 1"
          :label="$t('CODE') + ': '"
          :rules="structures.code.rules"
          required
        )
        v-text-field(
          v-model="name"
          :counter="structures.name.length"
          :label="$t('NAME') + ': '"
          :rules="structures.name.rules"
          required
        )
      v-card-actions
        v-btn(type="submit" icon)
          v-icon save
        v-btn(@click="onReset" icon)
          v-icon undo
        v-btn(
          v-if="id != null && safe === 0"
          @click="onDelete"
          icon
        )
          v-icon delete
</template>

<script src="@/components/accounting.dialog.js"></script>
