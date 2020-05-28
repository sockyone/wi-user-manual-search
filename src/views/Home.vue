<template>
  <div class="home">
    <content-search></content-search>
  </div>
</template>

<script>
// @ is an alias to /src
import ContentSearch from '../components/ContentSearch'

export default {
  name: 'Home',
  components: {
    "content-search": ContentSearch
  }
}
</script>
