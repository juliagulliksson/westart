export const DiffDays = {
  methods: {
    returnDiffDays(dateFrom, dateTo) {
      let oneDay = 24 * 60 * 60 * 1000;
      return Math.round(Math.abs((dateFrom - dateTo) / oneDay));
    }
  }
};
