<template lang="pug">
v-toolbar(color="primary" dark)
  v-toolbar-side-icon(
    @click.stop="sidebar = !sidebar"
  )
  v-toolbar-title {{ title }}
  v-spacer
  v-btn(
    @click.native="locale = (locale === 'en' ? 'th' : 'en')"
    icon
  ) {{ locale.toUpperCase() }}
  v-menu(dark)
    v-btn(color="primary" slot="activator") {{ currentCompany ? currentCompany.name : '' }}
    v-list(dense)
      v-list-tile(@click="openDialog()" avatar)
        v-list-tile-action
          v-icon add
        v-list-tile-title {{ $t('COMPANY_CREATE') }}
      v-divider
      v-list-tile(
        v-for="item in normalizedCompanies"
        @click="companiesId = item.id"
        :class="{ active: companiesId === item.id }"
        :key="item.id"
      )
        v-list-tile-action
          v-icon {{ item.avatar }}
        v-list-tile-title {{ item.name }}
</template>

<style lang="stylus" scoped>
$primary ?= #F57C00;
$white ?= #FFFFFF;

.menu__content.theme--dark .list {
  background: $primary;
  color: $white;

  .list__tile__action i {
    color: $white;
  }

  .active {
    background: $white;
    color: $primary;

    .list__tile__action i {
      color: $primary;
    }
  }
}
</style>

<script src="@/components/topbar.js"></script>
