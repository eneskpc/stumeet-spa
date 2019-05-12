import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat-service/chat.service';
import { ActivatedRoute } from '@angular/router';
import { CustomWindow } from '../models/window';
import { Response } from '../models/response';
declare var jQuery: any;
declare var window: CustomWindow;
declare var Response: Response;
@Component({
  selector: 'app-chat.ks-column.ks-page',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {

  constructor(public chat: ChatService,
    private route: ActivatedRoute) { }

  public currentMessageContent: string = "";
  public currentGroupId: number = 0;
  public currentGroupTitle: string = "";
  public currentGroupCreationDate: string = "";
  public currentMemberCount: string = "";
  public groupLoading: boolean = true;
  public messageLoading: boolean = true;
  public intro: boolean = false;

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

      });
    })(jQuery);
    /**
     * jQuery kodları burada bitiyor.
     */

    this.currentMessageContent = "";
    this.chat.currentMessageList = [];
    this.messageLoading = true;
    this.route.paramMap.subscribe(params => {
      this.currentGroupId = parseInt(params.get("id"));
      if (this.currentGroupId > 0)
        this.chat.getAllMessagesByGroupId(this.currentGroupId)
          .subscribe(response => {
            this.chat.currentMessageList = response["data"];
            this.messageLoading = false;
            document.querySelector<HTMLElement>('.ks-messenger__messages .ks-items')
              .scrollTo(0, 350);
          });
      else {
        this.messageLoading = false;
        this.intro = true;
      }
      this.chat.getGroups().subscribe(response => {
        this.chat.currentMessageGroupList = response["data"];
        this.groupLoading = false;
      });
      this.chat.getGroupById(this.currentGroupId).subscribe(response => {
        let currentGroup = response['data'];
        this.currentGroupTitle = currentGroup['groupName'];
        this.currentGroupCreationDate = currentGroup['creationDate'];
      });
      this.chat.getParticipantsByGroupId(this.currentGroupId).subscribe(response => {
        this.chat.currentGroupParticipants = response['data'];
      });
    });
  }

  onKeydown(event) {
    if (event.key === "Enter" && this.currentMessageContent.trim() != '') {
      this.sendMessage();
    }
  }

  public sendMessage(isEnter: boolean = false) {
    if (this.currentGroupId > 0 && this.currentMessageContent.trim() != '')
      this.chat.sendMessage({
        groupId: this.currentGroupId,
        messageContent: this.currentMessageContent
      }).then(() => {
        this.currentMessageContent = "";
      });
    else
      this.currentMessageContent = "";
  }

}
