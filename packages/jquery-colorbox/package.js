Package.describe({
  summary: "Colorbox"
});

Package.on_use(function (api) {
  api.use('jquery');
  api.add_files('colorbox.js', 'client');
});
