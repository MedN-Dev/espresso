<template lang="pug">
v-navigation-drawer(
  v-model="sidebar"
  app dark fixed temporary
)
  v-toolbar(class="transparent" flat)
    v-list(class="pa-0")
      v-list-tile
        v-list-tile-action
          v-icon store
        v-list-tile-content
          v-list-tile-title {{ name }}
  v-divider
  v-list(class="pt-1 pb-1")
    v-list-tile
      v-list-tile-action
        v-icon person
      v-list-tile-content
        v-list-tile-title Edkung
  v-divider
  v-list(dense)
    v-list-tile(
      v-for="item in items"
      @click="item.word === 'SETTING_COMPANY' ? openDialog(currentCompany) : setActiveByItem(item)"
      :key="item.name"
      :to="item.path"
      active-class="primary--text white"
      exact
    )
      v-list-tile-action
        v-icon {{ item.icon }}
      v-list-tile-content
        v-list-tile-title {{ $t(item.word) }}
</template>

<style lang="stylus" scoped>
$primary ?= #F57C00;

.navigation-drawer.theme--dark {
  background: $primary;
}
</style>

<script src="@/components/sidebar.js"></script>
