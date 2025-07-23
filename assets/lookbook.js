$(function() {
  $('.hotspot').hover(function() {
    var panelId = $(this).attr('aria-controls');
    
    // Reset all hotspots and panels
    $('.hotspot').attr('aria-expanded', 'false');
    $('.product-panel').attr('aria-hidden', 'true');

    // Activate clicked hotspot and corresponding panel
    $(this).attr('aria-expanded', 'true');
    $('#' + panelId).attr('aria-hidden', 'false');
  });

  // Show the first product panel by default
  $('.hotspot:first').attr('aria-expanded', 'true');
  $('.product-panel:first').attr('aria-hidden', 'false');


  

    $('.deflaut-hotspost').hover(function() {
    var panelId = $(this).attr('aria-controls');
    
    // Reset all hotspots and panels
    $('.deflaut-hotspost').attr('aria-expanded', 'false');
    $('.product-panel').attr('aria-hidden', 'false');

    // Activate clicked hotspot and corresponding panel
    $(this).attr('aria-expanded', 'true');
    $('#' + panelId).attr('aria-hidden', 'false');
  });

  // Show the first product panel by default
  $('.hotspot:first').attr('aria-expanded', 'true');
  $('.product-panel:first').attr('aria-hidden', 'false');

});
