(function($) {
  var options, data,
      cssClass = '.intl-tel-input',
      inputs = $(cssClass);

  inputs.each(function(i, el) {
    var $el;

    $el = $(el);
    data = $el.data();
    options = {
      initialCountry: data.autoGeoIp!== undefined ? 'auto' : data.defaultCode,
      geoIpLookup: function(callback) {
        if (data.autoGeoIp!== undefined) {
          $.get('//freegeoip.net/json/', function() {}, "jsonp").done(function(resp) {
            var countryCode = (resp && resp.country_code) ? resp.country_code : "";
            callback(countryCode);
          }).fail(function(jqXHR) {
            console.warn('GeoIP Error: ' + jqXHR.status);
            callback(defaultCode);
          });
        }
      },
      allowDropdown: data.allowDropdown !== undefined ? true : false,
      onlyCountries: data.onlyCountries,
      hiddenInput: data.hiddenName
    };

    options.utilsScript = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js';
    options.preferredCountries = data.preferredCountries;

    $el.intlTelInput(options);
  });
})(jQuery);
