
require.config({
  paths : {
    jquery       : 'vendor/jquery/jquery-1.7.2',
    knockout     : 'vendor/knockout/knockout-2.1.0',
    template     : 'vendor/knockout/koExternalTemplateEngine.min',
    localstorage : "vendor/knockout/knockout.localStorage",
    moment       : "vendor/moment/moment-1.6.1"
  }
});

require(['modules/application'], function (app) {
  app.initialize();
});
