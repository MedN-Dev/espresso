<template lang="pug">
v-layout(column)
  v-toolbar(color="secondary" dark)
    v-spacer
    v-btn(@click="openDialog()" icon)
      v-icon add
    v-btn(
      @click="setPagination({ descending: !pagination.descending })"
      icon
    )
      v-icon(v-if="pagination.descending") fas fa-sort-amount-up
      v-icon(v-else) fas fa-sort-amount-down
    v-text-field(
      v-if="(search != null)"
      v-model="search"
    )
    v-btn(@click="search = search == null ? '' : null" icon)
      v-icon search
  v-card
    v-container(fluid grid-list-md)
      v-data-iterator(
        :custom-filter="customFilter"
        :custom-sort="customSort"
        :items="items"
        :no-data-text="$t('NO_DATA_TEXT')"
        :no-results-text="$t('NO_RESULTS_TEXT')"
        :pagination.sync="pagination"
        :rows-per-page-items="rowsPerPageItems"
        :search="search"
        content-tag="v-layout"
        row wrap
      )
        v-flex(
          slot="item"
          slot-scope="props"
          xs12 sm6 md4 lg3
        )
          v-card(
            @click.native="openDialog(props.item)"
          )
            v-card-title {{ $t('CODE') + ': ' + props.item.code }}
            v-card-title {{ $t('NAME') + ': ' + props.item.name }}
</template>

<script src="@/components/customers.content.js"></script>
