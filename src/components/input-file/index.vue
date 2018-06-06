<template lang="pug">
form(
  enctype="multipart/form-data"
  novalidate
)
  div(class="dropbox")
    input(
      @change="onChange"
      :accept="accept"
      :disabled="isUploading"
      :name="name"
      class="input-file"
      type="file"
      multiple
    )
    p {{ label }}
</template>

<style lang="scss" scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  cursor: pointer;
  min-height: 200px; /* minimum height */
  padding: 10px 10px;
  position: relative;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>

<script src="./script.js"></script>
