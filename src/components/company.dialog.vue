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
          v-avatar(
            :size="64"
          )
            img(
              src="/static/favico.png"
              alt="avatar"
            )
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

<script src="@/components/company.dialog.js"></script>
