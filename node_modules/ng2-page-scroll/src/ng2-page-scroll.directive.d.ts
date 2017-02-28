import { EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PageScrollService } from './ng2-page-scroll.service';
import { EasingLogic } from './ng2-page-scroll-config';
export declare class PageScroll implements OnDestroy {
    private pageScrollService;
    private router;
    routerLink: any;
    href: string;
    pageScrollOffset: number;
    pageScrollDuration: number;
    pageScrollEasing: EasingLogic;
    pageScrollInterruptible: boolean;
    pageScroll: string;
    pageScrollFinish: EventEmitter<boolean>;
    private pageScrollInstance;
    private document;
    constructor(pageScrollService: PageScrollService, router: Router, document: any);
    ngOnDestroy(): any;
    private generatePageScrollInstance();
    handleClick(clickEvent: Event): boolean;
}
