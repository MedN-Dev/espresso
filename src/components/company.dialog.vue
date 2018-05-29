<template lang="pug">
v-dialog(v-model="value" max-width="580")
  v-form(
    @submit.prevent="onSubmit"
    class="fullwidth"
    ref="form"
    lazy-validation
  )
    v-toolbar(color="secondary" dark)
      v-toolbar-title {{ $t('COMPANY') }}
      v-spacer
    v-card
      v-card-text
        v-flex(
          xs12
          sm12
          md12
          text-xs-center
          layout
          align-center
          justify-center
        )
          v-avatar(:size="96")
            img(
              :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"
              alt="avatar"
            )
        v-flex(
          xs12
          sm12
          md12
          text-xs-center
          layout
          align-center
          justify-center
        )
          file-upload(
            v-model="files"
            @input-filter="inputFilter"
            accept="image/png,image/gif,image/jpeg,image/webp"
            class="file-upload mt-2"
            extensions="gif,jpg,jpeg,png,webp"
            name="avatar"
            post-action="/api/upload"
            ref="upload"
          ) Upload avatar
        v-text-field(
          v-model="code"
          :counter="structures.code.length"
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
        v-text-field(
          v-model="address"
          :counter="structures.address.length"
          :label="$t('ADDRESS') + ': '"
          :rules="structures.address.rules"
        )
        v-text-field(
          v-model="phone"
          :counter="structures.phone.length"
          :label="$t('PHONE') + ': '"
          :rules="structures.phone.rules"
        )
        v-text-field(
          v-model="taxCode"
          :counter="structures.taxCode.length"
          :label="$t('TAX_CODE') + ': '"
          :rules="structures.taxCode.rules"
        )
        v-select(
          v-if="id == null"
          v-model="prototypeId"
          :label="$t('IMPORT_ACCOUNTING_FROM') + ': '"
          :items="normalizedCompanies"
          required
        )
      v-card-actions
        v-btn(type="submit" icon)
          v-icon save
        v-btn(@click="onReset" icon)
          v-icon undo
        v-btn(
          v-if="id != null && normalizedCompanies.length > 2"
          @click="onDelete"
          icon
        )
          v-icon delete
</template>
<style lang="stylus" scoped>
.example-avatar .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #000;
}
</style>

<script src="@/components/company.dialog.js"></script>
