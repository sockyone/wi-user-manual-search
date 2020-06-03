<template>
  <div class="HighlightElement">
    <div class="el-border">
      <div class="header-item">
        <a
          :href="'https://i2g.cloud/user_manual/docs/chapter' + data._source.chapter + '.htm#' + el.mso"
          v-for="(el,idx) in data._source.position"
          :key="idx"
        >
          {{el.name}}
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
        </a>
      </div>
      <div>
        <div div v-for="(el,idx) in data.highlight.content" :key="idx" class="text">
          <div v-html="el"></div>
        </div>
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
  display: flex;
  align-items: center;
  text-align: left;
  border-top: 1px solid #f3f3f4;
  padding: 10px 0;
  color: var(--text-inactive-color) !important;
}
.el-border {
  padding: 20px;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 8px;
  animation: fly-in 0.5s;
  animation-fill-mode: both;
  transition: all cubic-bezier(0.68, -0.55, 0.27, 1.55) 0.2s;
  box-shadow: 0 0px 20px #00000003;
}
.header-item {
  display: flex;
  flex-wrap: wrap;
  & > a {
    font-style: unset;
    text-align: left;
    text-decoration: none;
    color: var(--text-inactive-color) !important;
    margin-bottom: 10px;
  }
}

.header-item > *:last-child {
  font-weight: bold;
  text-decoration: unset;
  padding: 20px 0;
  text-align: left;
  font-size: 120%;
  color: var(--text-primary-color) !important;
  width: calc(100% + 40px);
  &:hover {
    color: var(--primary-color) !important;
    background-color: #3e84ff12;
    padding: 20px;
    margin: 0 -20px 10px -20px;
  }
}

@keyframes fly-in {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

