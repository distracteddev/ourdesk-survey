require(['bower_components/aura/lib/aura', 'bower_components/flowtype/flowtype'], function(Aura) {
  Aura({debug: {enable: true}})
    .use('extensions/bone.extension')
    .start({ components: 'body'}).then(function() {
      console.warn('Aura started...');
    });
});