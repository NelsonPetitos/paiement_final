import { Directive, Input, Output, EventEmitter, Inject, Optional } from '@angular/core';
import { Router, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { PageScrollService } from './ng2-page-scroll.service';
import { PageScrollInstance } from './ng2-page-scroll-instance';
import { PageScrollUtilService } from './ng2-page-scroll-util.service';
export var PageScroll = (function () {
    function PageScroll(pageScrollService, router, document) {
        this.pageScrollService = pageScrollService;
        this.router = router;
        this.pageScrollOffset = null;
        this.pageScrollDuration = null;
        this.pageScrollEasing = null;
        this.pageScroll = null;
        this.pageScrollFinish = new EventEmitter();
        this.document = document;
    }
    PageScroll.prototype.ngOnDestroy = function () {
        if (this.pageScrollInstance) {
            this.pageScrollService.stop(this.pageScrollInstance);
        }
        return undefined;
    };
    PageScroll.prototype.generatePageScrollInstance = function () {
        if (PageScrollUtilService.isUndefinedOrNull(this.pageScrollInstance)) {
            this.pageScrollInstance = PageScrollInstance.advancedInstance(this.document, this.href, null, this.pageScroll, this.pageScrollOffset, this.pageScrollInterruptible, this.pageScrollEasing, this.pageScrollDuration, this.pageScrollFinish);
        }
        return this.pageScrollInstance;
    };
    PageScroll.prototype.handleClick = function (clickEvent) {
        var _this = this;
        if (this.routerLink && this.router !== null && this.router !== undefined) {
            // We need to navigate their first.
            // Navigation is handled by the routerLink directive
            // so we only need to listen for route change
            // Note: the change event is also emitted when navigating to the current route again
            var subscription_1 = this.router.events.subscribe(function (routerEvent) {
                if (routerEvent instanceof NavigationEnd) {
                    subscription_1.unsubscribe();
                    _this.pageScrollService.start(_this.generatePageScrollInstance());
                }
                else if (routerEvent instanceof NavigationError || routerEvent instanceof NavigationCancel) {
                    subscription_1.unsubscribe();
                }
            });
        }
        else {
            this.pageScrollService.start(this.generatePageScrollInstance());
        }
        return false; // to preventDefault()
    };
    PageScroll.decorators = [
        { type: Directive, args: [{
                    selector: '[pageScroll]',
                    host: {
                        '(click)': 'handleClick($event)',
                    }
                },] },
    ];
    /** @nocollapse */
    PageScroll.ctorParameters = [
        { type: PageScrollService, },
        { type: Router, decorators: [{ type: Optional },] },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ];
    PageScroll.propDecorators = {
        'routerLink': [{ type: Input },],
        'href': [{ type: Input },],
        'pageScrollOffset': [{ type: Input },],
        'pageScrollDuration': [{ type: Input },],
        'pageScrollEasing': [{ type: Input },],
        'pageScrollInterruptible': [{ type: Input },],
        'pageScroll': [{ type: Input },],
        'pageScrollFinish': [{ type: Output },],
    };
    return PageScroll;
}());
//# sourceMappingURL=ng2-page-scroll.directive.js.map