import APIKey from "../../../key.json";
export const GetTickets = {
  methods: {
    getTickets(urlParameters) {
      console.log(urlParameters);
      return fetch(
        `http://redmine.westart.se/issues.json?key=${
          APIKey.key
        }&${urlParameters}`
      ).then(response => response.json());
    }
  }
};
