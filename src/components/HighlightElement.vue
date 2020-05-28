<template>
  <div class="HighlightElement">
    <div class = "el-border">
      <div style="display: flex;">
        <div v-for="(el,idx) in data._source.position" :key="idx" style="display: flex;">
          <a
            :href="'https://i2g.cloud/user_manual/docs/chapter' + data._source.chapter + '.htm#' + el.mso"
          >{{el.name}}</a>
          <div> > </div>
        </div>
      </div>
      <div div v-for="(el,idx) in data.highlight.content" :key="idx" class="text">
        <div v-html="el"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HighlightElement",
  props: {
    data: Object
  }
};
</script>

<style scoped lang="less">
    .text {
        text-align: left;
        margin-left: 50px;
    }
    .el-border {
        border: solid 1px;
        margin: 3px;
    }
</style>

