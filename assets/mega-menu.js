$(document).ready(function() {
  // Function to initialize a specific mega menu
  function initializeMegaMenu(menuContainer) {
    const firstLink = $(menuContainer).find('.xboost-mega-menu__link--level-2').first();
    const firstList = firstLink.siblings('.list-unstyled');
    
    // Reset all menus in this container
    $(menuContainer).find('.xboost-mega-menu__link--level-2').css({
      'text-decoration': 'none',
      'color': '' 
    });
    $(menuContainer).find('.list-unstyled').css({
      'display': 'none',
      'opacity': '0',
      'visibility': 'hidden'
    });
    
    // Show first link's submenu if it exists
    if (firstList.length) {
      firstLink.css({
        'text-decoration': 'underline',
        'color': '#4c6762'  
      });
      firstList.css({
        'display': 'block',
        'opacity': '1',
        'visibility': 'visible'
      });
    }
  }

  // Handle mouse enter on mega menu links
  $('.xboost-mega-menu__links').on('mouseenter', '.xboost-mega-menu__link--level-2', function() {
    const menuContainer = $(this).closest('.xboost-mega-menu__links');
    
    // Reset all links and lists in this menu
    menuContainer.find('.xboost-mega-menu__link--level-2').css({
      'text-decoration': 'none',
      'color': '' 
    });
    menuContainer.find('.list-unstyled').css({
      'display': 'none',
      'opacity': '0',
      'visibility': 'hidden'
    });
    
    // Show current link's submenu
    $(this).css({
      'text-decoration': 'underline',
      'color': '#4c6762' 
    });
    const currentList = $(this).siblings('.list-unstyled');
    if (currentList.length) {
      currentList.css({
        'display': 'block',
        'opacity': '1',
        'visibility': 'visible'
      });
    }
  });

  // Handle when details element is opened
  $('details.mega-menu').on('toggle', function() {
    if (this.open) {
      const menuContainer = $(this).find('.xboost-mega-menu__links');
      initializeMegaMenu(menuContainer);
    }
  });

  // Initialize all open mega menus on page load
  $('details.mega-menu[open]').each(function() {
    const menuContainer = $(this).find('.xboost-mega-menu__links');
    initializeMegaMenu(menuContainer);
  });
});