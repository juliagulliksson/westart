<template>
  <div class="quote-wrapper">
      <div class="row1 panel panel-info">
        <div class="panel-body">
            <p class="quote">"{{ quote.quote }}"</p>
            <p class="quote-description">- Mikael Westman {{quote.created}} </p>
        </div>
      </div>
  </div>
</template>

<script>
import SmallWidget from "./../SmallWidget";
import { ProxyFetch } from "./../mixins/ProxyFetch.js";
export default {
  data() {
    return {
      quote: ""
    };
  },
  components: {
    SmallWidget: SmallWidget
  },
  mixins: [ProxyFetch],
  methods: {
    getQuotes() {
      const targetUrl = "https://mikeyquot.es/index.json?q=random";
      this.proxyFetch(targetUrl).then(response => {
        this.quote = response[0];
        this.setYear();
      });
    },
    setYear() {
      let year = new Date(this.quote.created);
      this.quote.created = year.getFullYear();
    }
  },
  created() {
    this.getQuotes();
  }
};
</script>