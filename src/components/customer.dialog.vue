<template lang="pug">
v-dialog(v-model="value" max-width="580")
  v-form(
    @submit.prevent="onSubmit"
    class="fullwidth"
    ref="form"
    lazy-validation
  )
    v-toolbar(color="secondary" dark)
      v-toolbar-title {{ $t('CUSTOMER') }}
      v-spacer
    v-card
      v-card-text
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
        v-select(
          v-model="trucks"
          :label="$t('TRUCK') + (this.$i18n.locale === 'en' ? 's' : '')"
          chips
          clearable
          tags
        )
          template(slot="selection" slot-scope="data")
            v-chip(
              @input="onRemoveTruck(data)"
              :selected="data.selected"
              close
            )
              strong {{ data.item }}
        v-select(
          v-model="accountBank"
          @change="onChangeAccountBank($event)"
          :label="$t('BANK') + ': '"
          :items="banks"
        )
        v-text-field(
          v-model="accountCode"
          :counter="structures.accountCode.length"
          :disabled="accountBank == null"
          :label="$t('BANK_ACCOUNT_CODE') + ': '"
          :rules="structures.accountCode.rules"
          mask="### - # - ##### - #"
        )
        v-text-field(
          v-model="accountName"
          :counter="structures.accountName.length"
          :disabled="accountBank == null"
          :label="$t('BANK_ACCOUNT_NAME') + ': '"
          :rules="structures.accountName.rules"
        )
      v-card-actions
        v-btn(type="submit" icon)
          v-icon save
        v-btn(@click="onReset" icon)
          v-icon undo
        v-btn(
          v-if="id != null"
          @click="onDelete"
          icon
        )
          v-icon delete
</template>

<script src="@/components/customer.dialog.js"></script>
