<template>
    <div class="ContentSearch">
        <input type="text" v-model="searchText">
        <div>
            <div v-for="data in results" :key="data._id">
                <highlight-element :data="data"></highlight-element>
            </div>
        </div>
    </div>
</template>

<script>

import { BehaviorSubject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import axios from 'axios'
import HighlightElement from './HighlightElement'

const textSearchSubject = new BehaviorSubject("")
const textSearchSubjectDebounced = textSearchSubject.pipe(debounceTime(1000))

export default {
  name: 'ContentSearch',
  components: {
      "highlight-element": HighlightElement
  },
  data: function() {
      return {
          searchText: "",
          results: []
      }
  },
  mounted: function() {
      let self = this
      textSearchSubjectDebounced.subscribe((data)=>{
        //console.log('data:', data)
        axios.post("http://112.137.129.229:30666/search", {
            textSearch: data
        }).then((rsFromSvr)=>{
            console.log(rsFromSvr.data)
            self.results = rsFromSvr.data
        })
      })
  },
  watch: {
      searchText(newText) {
          textSearchSubject.next(newText)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    em {
        font-weight: 900;
    }
</style>
