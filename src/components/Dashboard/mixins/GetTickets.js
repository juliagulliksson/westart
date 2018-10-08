import APIKey from "../../../key.json";
export const GetTickets = {
  methods: {
    getTickets(urlParameters) {
      return fetch(
        `http://redmine.westart.se/issues.json?key=${
          APIKey.WAkey
        }&${urlParameters}`
      ).then(response => response.json());
    }
  }
};
