const models = require('@BudgetManager/app/setup');

module.exports = (app) => {
  const api = app.BudgetManagerAPI.app.api.real;

  app.route('/api/v1/ping')
    .get(api.ping(models.User));
}
