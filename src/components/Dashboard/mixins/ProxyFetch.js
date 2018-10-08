export const ProxyFetch = {
  methods: {
    proxyFetch(targetUrl) {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      return fetch(proxyUrl + targetUrl).then(response => response.json());
    }
  }
};
