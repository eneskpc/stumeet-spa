import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat-service/chat.service';
import { CustomWindow } from '../models/window';
import { Response } from '../models/response';
declare var jQuery: any;
declare var window: CustomWindow;
declare var Response: Response;
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: [
    "./main-layout.component.scss"
  ]
})
export class MainLayoutComponent implements OnInit {

  constructor(public auth: AuthService,
    public chat: ChatService,
    private router: Router) { }

  ngOnInit() {
    /**
     * jQuery kodları buradan başlıyor.
     */
    (function ($) {

      window.Kosmo = {
        screen: {
          breakpoints: {
            xxl: 1441,
            xl: 1440,
            lg: 992,
            md: 768,
            sm: 544,
            xs: 320
          }
        },
        initSidebarScrollBar: function (ksSidebar, isSidebarFixed) {
          if (isSidebarFixed) {
            ksSidebar.find('.ks-sidebar-wrapper').jScrollPane({
              autoReinitialise: false,
              autoReinitialiseDelay: 300
            });
          }

          $(document).on('sidebar:height:changed', function () {
            var api = ksSidebar.find('.ks-sidebar-wrapper').data('jsp');
            api.reinitialise();
          });
        },
        makeScrollable: function (selector) {
          $(selector).jScrollPane({
            autoReinitialise: true,
            autoReinitialiseDelay: 300
          });
        }
      };

      Response.create({
        prop: "width",
        breakpoints: [
          window.Kosmo.screen.breakpoints.xxl,
          window.Kosmo.screen.breakpoints.xl,
          window.Kosmo.screen.breakpoints.lg,
          window.Kosmo.screen.breakpoints.md,
          window.Kosmo.screen.breakpoints.sm,
          window.Kosmo.screen.breakpoints.xs,
          0
        ]
      });

      $(document).ready(function () {
        window.Kosmo.window = {
          height: $(window).height()
        };

        var ksBody = $('body');
        var isSidebarCompact = ksBody.hasClass('ks-sidebar-compact');
        var ksNavbarMenu = $('.ks-navbar-menu');
        var ksNavbarActionsToggle = $('.ks-navbar-actions-toggle');
        var ksNavbarActions = $('.ks-navbar .ks-navbar-actions');
        var ksSidebarMobileToggle = $('.ks-sidebar-mobile-toggle');
        var isSidebarFixed = ksBody.hasClass('ks-sidebar-position-fixed');
        var ksSidebar = $('.ks-sidebar');
        var ksSidebarToggle = $('.ks-sidebar-toggle');
        var ksSearchOpen = $('.ks-search-open');
        var ksSearchClose = $('.ks-search-close');
        var ksSettingsSlideControl = $('.ks-settings-slide-control');
        var ksSettingsSlideCloseControl = $('.ks-settings-slide-close-control');
        var ksMobileOverlay = $('.ks-mobile-overlay');
        var ksNavbarMenuToggle = $('.ks-navbar-menu-toggle');

        Response.crossover('width', function () {
          if (Response.band(window.Kosmo.screen.breakpoints.xxl)) {
            if (!isSidebarCompact) {
              ksBody.removeClass('ks-sidebar-compact');
            }

            ksBody.removeClass('ks-sidebar-collapsed');
          } else if (Response.band(window.Kosmo.screen.breakpoints.lg, window.Kosmo.screen.breakpoints.xl)) {
            ksBody.removeClass('ks-sidebar-collapsed').addClass('ks-sidebar-compact');
          } else if (Response.band(0, window.Kosmo.screen.breakpoints.lg)) {
            if (!isSidebarCompact) {
              ksBody.removeClass('ks-sidebar-compact');
            }

            ksBody.addClass('ks-sidebar-collapsed');
          }
        });

        Response.ready(function () {
          $(window).trigger('resize');
        });

        // Replace default dropdown logic for sidebar
        ksSidebar.find('.dropdown-toggle').on('click', function () {
          if ($(this).closest('.dropdown-menu').size()) {
            if ($(this).closest('.dropdown-menu').find('.dropdown.open > .dropdown-toggle')[0] != $(this)[0]) {
              $(this).closest('.dropdown-menu').find('.dropdown.open').removeClass('open');
            }

            $(this).closest('.dropdown').toggleClass('open');
          } else {
            if ($('.ks-sidebar .dropdown.open > .dropdown-toggle')[0] != $(this)[0]) {
              $('.ks-sidebar .dropdown.open').removeClass('open');
            }

            $(this).closest('.dropdown').toggleClass('open');
          }
        });

        /**
         * Toggle sidebar to compact size
         */
        ksSidebarToggle.on('click', function () {
          if (!isSidebarCompact) {
            if (ksBody.hasClass('ks-sidebar-compact')) {
              ksBody.removeClass('ks-sidebar-compact');
            } else {
              ksBody.addClass('ks-sidebar-compact');
            }
          }
        });

        ksSidebar.on({
          mouseenter: function () {
            if (ksBody.hasClass('ks-sidebar-compact')) {
              ksBody.addClass('ks-sidebar-compact-open');
            }
          },
          mouseleave: function () {
            if (ksBody.hasClass('ks-sidebar-compact')) {
              ksBody.removeClass('ks-sidebar-compact-open');
              ksSidebar.find('.open').removeClass('open');
            }
          }
        });

        // Navbar toggle
        ksNavbarMenuToggle.on('click', function () {
          var self = $(this);

          if (ksMobileOverlay.hasClass('ks-open') && !self.hasClass('ks-open')) {
            ksMobileOverlay.removeClass('ks-open');
            ksSidebar.removeClass('ks-open');
            ksSidebarMobileToggle.removeClass('ks-open');
            ksNavbarActions.removeClass('ks-open');
            ksNavbarActionsToggle.removeClass('ks-open');
          }

          self.toggleClass('ks-open');
          ksNavbarMenu.toggleClass('ks-open');
          ksMobileOverlay.toggleClass('ks-open');
        });

        ksSidebarMobileToggle.on('click', function () {
          var self = $(this);

          if (ksMobileOverlay.hasClass('ks-open') && !self.hasClass('ks-open')) {
            ksMobileOverlay.removeClass('ks-open');
            ksNavbarMenu.removeClass('ks-open');
            ksNavbarMenuToggle.removeClass('ks-open');
            ksNavbarActions.removeClass('ks-open');
            ksNavbarActionsToggle.removeClass('ks-open');
          }

          self.toggleClass('ks-open');
          ksSidebar.toggleClass('ks-open');
          ksMobileOverlay.toggleClass('ks-open');
        });

        ksNavbarActionsToggle.on('click', function () {
          var self = $(this);

          if (ksMobileOverlay.hasClass('ks-open') && !self.hasClass('ks-open')) {
            ksMobileOverlay.removeClass('ks-open');
            ksNavbarMenu.removeClass('ks-open');
            ksNavbarMenuToggle.removeClass('ks-open');
            ksSidebar.removeClass('ks-open');
            ksSidebarMobileToggle.removeClass('ks-open');
          }

          self.toggleClass('ks-open');
          ksNavbarActions.toggleClass('ks-open');
          ksMobileOverlay.toggleClass('ks-open');
        });

        ksMobileOverlay.on('click', function () {
          if (ksSidebar.hasClass('ks-open')) {
            ksSidebar.toggleClass('ks-open');
          } else if (ksNavbarMenu.hasClass('ks-open')) {
            ksNavbarMenu.toggleClass('ks-open');
          } else if (ksNavbarActions.hasClass('ks-open')) {
            ksNavbarActions.toggleClass('ks-open');
          }

          if (ksSidebarMobileToggle.hasClass('ks-open')) {
            ksSidebarMobileToggle.toggleClass('ks-open');
          }

          if (ksNavbarMenuToggle.hasClass('ks-open')) {
            ksNavbarMenuToggle.toggleClass('ks-open');
          }

          if (ksNavbarActionsToggle.hasClass('ks-open')) {
            ksNavbarActionsToggle.toggleClass('ks-open');
          }

          ksMobileOverlay.toggleClass('ks-open');
        });

        ksSearchOpen.on('click', function () {
          $(this).closest('.ks-navbar-menu').toggleClass('ks-open');
          $('.ks-search-form .form-control').focus();
        });

        ksSearchClose.on('click', function () {
          $(this).closest('.ks-navbar-menu').toggleClass('ks-open');
          $('.ks-search-form .form-control').val('').blur();
        });

        ksSettingsSlideControl.on('click', function () {
          $(this).closest('.ks-settings-slide-block').toggleClass('ks-open');
        });

        ksSettingsSlideCloseControl.on('click', function () {
          $(this).closest('.ks-settings-slide-block').removeClass('ks-open');
        });

        /**
         * Prevent default events for messages dropdown
         */
        $('.ks-navbar .ks-messages .nav-tabs .nav-link').on('click', function (e) {
          e.stopPropagation();
          e.preventDefault();
          $(this).tab('show');
        });

        /**
         * Prevent default events for notifications dropdown
         */
        $('.ks-navbar .ks-notifications .nav-tabs .nav-link').on('click', function (e) {
          e.stopPropagation();
          e.preventDefault();
          $(this).tab('show');
        });

        /**
         * Prevent default events for nested dropdown menus
         */
        $('.ks-navbar .dropdown-menu .dropdown-toggle').on('click', function (e) {
          var self = $(this);
          var parent = self.closest('.dropdown');
          e.stopPropagation();
          e.preventDefault();

          parent.toggleClass('show');
        });

        $('[data-height]').each(function () {
          $(this).height($(this).data('height'));
        });

        $('[data-auto-height]').each(function () {
          var self = $(this);
          var autoHeight = self.data('auto-height');
          var height = window.Kosmo.window.height - self.offset().top;
          var fixHeight = parseInt(self.data('fix-height'), 10);
          var reduceHeight = self.data('reduce-height');
          var scrollableIfHasClass = $(this).data('scrollable-if-has-class');

          self.css({
            overflow: "hidden auto"
          });

          if (!scrollableIfHasClass || (scrollableIfHasClass && ($(this).hasClass(scrollableIfHasClass) || (Response.band(0, window.Kosmo.screen.breakpoints.lg))))) {
            if (autoHeight) {
              if (autoHeight === 'parent') {
                height = self.parent().height();
              } else {
                height = self.closest(autoHeight).height();
              }
            } else {
              if (reduceHeight) {
                $.each(self.parent().find(reduceHeight), function (index, element) {
                  height -= $(element).height();
                });
              }

              if (fixHeight > 0 && height > 0) {
                height -= fixHeight;
              }

              if (height <= 0) {
                if (self.data('min-height')) {
                  height = parseInt(self.data('min-height'), 10);
                } else {
                  height = 200;
                }
              }
            }

            self.height(height);
          }
        });

        window.Kosmo.initSidebarScrollBar(ksSidebar, isSidebarFixed);

        $(document).find('.ks-sidebar .dropdown-toggle').on('click', function () {
          var parent = $(this).parent();
          var menu = parent.find('> .dropdown-menu');

          if (parent.hasClass('open')) {
            menu.show();
            var height = menu.height();
            menu.height(0);
            menu.velocity({
              height: height
            }, {
                duration: 300,
                easing: "easeOut",
                complete: function () {
                  menu.removeAttr('style');
                  $(document).trigger('sidebar:height:changed');
                }
              });
          } else {
            menu.hide();
            menu.removeAttr('style');
            $(document).trigger('sidebar:height:changed');
          }
        });

        $('.navbar .nav-item.dropdown').on('hide.bs.dropdown', function () {
          $(this).find('.dropdown-item.dropdown').removeClass('show');
        });

        $(window).trigger('resize');

      });
    })(jQuery);
    /**
     * jQuery kodları burada bitiyor.
     */

    if (!this.auth.loggedIn()) {
      this.router.navigateByUrl("/giris");
    } else {
      this.chat.startConnection();
      this.chat.getGroups().subscribe(response => {
        this.chat.currentMessageGroupList = response["data"];
      });
    }
  }

  public logout() {
    this.chat.logout().then(value => {
      this.auth.logout();
      this.router.navigateByUrl('giris');
    });
  }

}
