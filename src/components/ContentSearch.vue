<template>
  <div class="ContentSearch">
    <div class="i2g-search-box-with-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        role="img"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.6002 12.0498C9.49758 12.8568 8.13777 13.3333 6.66667 13.3333C2.98477 13.3333 0 10.3486 0 6.66667C0 2.98477 2.98477 0 6.66667 0C10.3486 0 13.3333 2.98477 13.3333 6.66667C13.3333 8.15637 12.8447 9.53194 12.019 10.6419C12.0265 10.6489 12.0338 10.656 12.0411 10.6633L15.2935 13.9157C15.6841 14.3063 15.6841 14.9394 15.2935 15.33C14.903 15.7205 14.2699 15.7205 13.8793 15.33L10.6269 12.0775C10.6178 12.0684 10.6089 12.0592 10.6002 12.0498ZM11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
        />
      </svg>
      <input
        type="search"
        placeholder="Search in user manual"
        autocomplete="off"
        v-model="searchText"
        style="background: #fff !important;"
      />
    </div>
    <div class="loading" v-if="loadingState">
     loading
    </div>
    <div v-if="!loadingState" class="resultContent">
      <div v-if="sentTextSearch.length > 0">No results found for "{{sentTextSearch}}"</div>
      <div v-for="data in filteredResults" :key="data._id" class="item-row">
        <highlight-element :data="data"></highlight-element>
      </div>
    </div>
    <div class="pagging" v-if="filteredResults.length">
      <div class="previous" @click="previousPage">
        <svg xmlns="http://www.w3.org/2000/svg" width="26.97" height="16.75" viewBox="0 0 26.97 16.75">
          <g id="Group_215" data-name="Group 215" transform="translate(602.834 -1445.28)">
            <path id="Path_32" data-name="Path 32" d="M-594.874,1446.694l-6.961,6.961,6.961,6.961" fill="none" stroke="#707070" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            <path id="Path_33" data-name="Path 33" d="M-600.922,1453.655h24.058" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2"/>
          </g>
        </svg>
      </div>
      <div class="number">Page: {{currentPage}}/{{Math.ceil(results.length/10)}}</div>
      <div class="next" @click="nextPage">
        <svg xmlns="http://www.w3.org/2000/svg" width="26.97" height="16.75" viewBox="0 0 26.97 16.75">
          <g id="Group_215" data-name="Group 215" transform="translate(602.834 -1445.28)">
            <path id="Path_32" data-name="Path 32" d="M-594.874,1446.694l-6.961,6.961,6.961,6.961" fill="none" stroke="#707070" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            <path id="Path_33" data-name="Path 33" d="M-600.922,1453.655h24.058" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2"/>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { BehaviorSubject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import axios from "axios";
import HighlightElement from "./HighlightElement";

const textSearchSubject = new BehaviorSubject("");
const textSearchSubjectDebounced = textSearchSubject.pipe(debounceTime(1000));

export default {
  name: "ContentSearch",
  components: {
    "highlight-element": HighlightElement
  },
  data: function() {
    return {
      searchText: "",
      results: [],
      loadingState: false,
      sentTextSearch: "",
      currentPage: 1
    };
  },
  mounted: function() {
    let self = this;
    textSearchSubjectDebounced.subscribe(data => {
      //console.log('data:', data)

      //start loading state
      if (data.length === 0) {
        self.results = [];
        return;
      }
      self.sentTextSearch = data;
      self.loadingState = true;
      axios
        .post("https://manual.i2g.cloud/search", {
          textSearch: data
        })
        .then(rsFromSvr => {
          //console.log(rsFromSvr.data);
          if (rsFromSvr.data.length === 0) {
            self.sentTextSearch = data;
          } else {
            self.sentTextSearch = "";
          }
          // if (rsFromSvr.data.length > 0) {
          //   // sort
          //   console.log(rsFromSvr.data)
          // }
          //console.log(rsFromSvr.data)
          self.results = rsFromSvr.data.sort((a, b) => {
            let ax = a._source.position[a._source.position.length - 1].name;
            let bs = b._source.position[b._source.position.length - 1].name;
            if (ax.startsWith("Module ")) ax = ax.match(/Module (\d)+:/)[1];
            else ax = ax.match(/(([^\s])+). /)[1];
            if (bs.startsWith("Module ")) bs = bs.match(/Module (\d)+:/)[1];
            else bs = bs.match(/(([^\s])+). /)[1];
            return ax.localeCompare(bs, undefined, { numeric: true });
          });
          self.loadingState = false;
          self.currentPage = 1;
        });
    });
  },
  watch: {
    searchText(newText) {
      textSearchSubject.next(newText);
    }
  },
  computed: {
    filteredResults() {
      return this.results.filter(
        (e, idx) =>
          idx >= (this.currentPage - 1) * 10 && idx < this.currentPage * 10
      );
    }
  },
  methods: {
    nextPage: function() {
      if (this.currentPage * 10 < this.results.length)
        this.currentPage = this.currentPage + 1;
    },
    previousPage: function() {
      if (this.currentPage > 1) this.currentPage = this.currentPage - 1;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.loading {

}
.pagging {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  height: 80px;
  width: 100%;
  max-width: 600px;
  background-color: var(--body-bg-color);
}
.next {
      transform: rotate(180deg);
}
.previous, .next, .number{
  height: 40px;
  min-width: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  cursor: pointer;
}
.number {
  pointer-events: none;
  margin: 0 20px;
}
.previous:hover, .next:hover, .number:hover {
  background-color: #fff;
  transition: all ease-in-out 0.2s;
} 
em {
  font-weight: bold;
  font-style: unset;
}
.i2g-search-box-with-icon {
  width: 100%;
  max-width: 600px;
  margin: 20px;
}

.background-search {
}
.ContentSearch {
  padding: 20px;
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
}
.resultContent {
  display: flex;
  flex-direction: column;
  overflow: auto;
  align-items: center;
  width: 100%;
  height: calc(100% - 140px);
}
.item-row {
  max-width: 600px;
  width: 100%;
}

@media screen and (max-width: 600px) {
  .i2g-search-box-with-icon {
    margin-top: 0 !important;
  }
  // .pagging {
  //   height: 60px !important;
  // }
  .resultContent {
    height: calc(100% - 120px) !important;
  }
}
</style>
