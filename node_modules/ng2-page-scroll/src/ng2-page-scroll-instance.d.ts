/**
 * Created by sebastianfuss on 29.08.16.
 */
import { EventEmitter } from '@angular/core';
import { EasingLogic, PageScrollTarget, PageScrollingViews } from './ng2-page-scroll-config';
/**
 * Represents a scrolling action
 */
export declare class PageScrollInstance {
    /**
     * These properties will be set during instance construction
     */
    private _namespace;
    private document;
    private _scrollTopSources;
    private _isInlineScrolling;
    private _scrollTarget;
    private _offset;
    private _duration;
    private _easingLogic;
    private _interruptible;
    private _interruptListener;
    private _pageScrollFinish;
    /**
     * These properties will be set/manipulated if the scroll animation starts
     */
    private _startScrollTop;
    private _targetScrollTop;
    private _distanceToScroll;
    private _startTime;
    private _endTime;
    private _interruptListenersAttached;
    private _timer;
    /**
     * Create a PageScrollInstance representing a scroll animation on the documents body.
     *
     * @param document The document that contains the body to be scrolled and the scrollTarget elements
     * @param scrollTarget Where to scroll to. Can be a HTMLElement reference or a string like '#elementId'
     * @param namespace Optional namespace to group scroll animations logically
     *
     * @returns {PageScrollInstance}
     */
    static simpleInstance(document: Document, scrollTarget: PageScrollTarget, namespace?: string): PageScrollInstance;
    /**
     * Create a PageScrollInstance representing a scroll animation to the target element where the scrollingView
     * elements get scrolled (like a div container with fixed height, resulting in scrollbars in it).
     *
     * Make sure that the scrollTarget is located inside the scrollingView in the DOM hierarchy, otherwise the
     * scrollingView will be scrolled to an apparently arbitrary position.
     *
     * @param document The document that contains the body to be scrolled and the scrollTarget elements
     * @param scrollTarget Where to scroll to. Can be a HTMLElement reference or a string like '#elementId'
     * @param scrollingView The element that should be scrolled
     * @param namespace Optional namespace to group scroll animations logically
     *
     * @returns {PageScrollInstance}
     */
    static simpleInlineInstance(document: Document, scrollTarget: PageScrollTarget, scrollingView: PageScrollingViews, namespace?: string): PageScrollInstance;
    /**
     *
     * @param document The document that contains the body to be scrolled and the scrollTarget elements
     * @param scrollTarget Where to scroll to. Can be a HTMLElement reference or a string like '#elementId'
     * @param scrollingViews The elements that should be scrolled. Null to use the default elements of document and body.
     * @param namespace Optional namespace to group scroll animations logically
     * @param pageScrollOffset The offset to be attached to the top of the target element or
     *                          null/undefined to use application default
     * @param pageScrollInterruptible Whether this scroll animation should be interruptible.
     *                                 Null/undefined for application default
     * @param pageScrollEasingLogic Easing function to be used for manipulating the scroll position
     *                          over time. Null/undefined for application default
     * @param pageScrollDuration The duration in milliseconds the animation should last.
     *                            Null/undefined for application default
     * @param pageScrollFinishListener Listener to be called to notify other parts of the application
     *                                  that the scroll animation has finished
     *
     * @returns {PageScrollInstance}
     */
    static advancedInstance(document: Document, scrollTarget: PageScrollTarget, scrollingViews: PageScrollingViews[], namespace: string, pageScrollOffset?: number, pageScrollInterruptible?: boolean, pageScrollEasingLogic?: EasingLogic, pageScrollDuration?: number, pageScrollFinishListener?: EventEmitter<boolean>): PageScrollInstance;
    /**
     * Private constructor, requires the properties assumed to be the bare minimum.
     * Use the factory methods to create instances: {@link PageScrollInstance#simpleInstance}
     * @param namespace
     * @param document
     */
    constructor(namespace: string, document: Document);
    /**
     * Extract the exact location of the scrollTarget element.
     *
     * Extract the scrollTarget HTMLElement from the given PageScrollTarget object. The latter one may be
     * a string like "#heading2", then this method returns the corresponding DOM element for that id.
     *
     * @returns {HTMLElement}
     */
    extractScrollTargetPosition(): {
        top: number;
        left: number;
    };
    /**
     * Get the top offset of the scroll animation.
     * This automatically takes the offset location of the scrolling container/scrolling view
     * into account (for nested/inline scrolling).
     *
     * @returns {number}
     */
    getCurrentOffset(): number;
    /**
     * Sets the "scrollTop" property for all scrollingViews to the provided value
     * @param position
     * @return true if at least for one ScrollTopSource the scrollTop value could be set and it kept the new value.
     *          false if it failed for all ScrollTopSources, meaning that we should stop the animation
     *          (probably because we're at the end of the scrolling region)
     */
    setScrollTopPosition(position: number): boolean;
    /**
     * Trigger firing a animation finish event
     * @param value Whether the animation finished at the target (true) or got interrupted (false)
     */
    fireEvent(value: boolean): void;
    /**
     * Attach the interrupt listeners to the PageScrollInstance body. The given interruptReporter
     * will be called if any of the attached events is fired.
     *
     * Possibly attached interruptListeners are automatically removed from the body before the new one will be attached.
     *
     * @param interruptReporter
     */
    attachInterruptListeners(interruptReporter: InterruptReporter): void;
    /**
     * Remove event listeners from the body and stop listening for events that might be treated as "animation
     * interrupt" events.
     */
    detachInterruptListeners(): void;
    readonly namespace: string;
    readonly scrollTopSources: any[];
    startScrollTop: number;
    targetScrollTop: number;
    distanceToScroll: number;
    readonly duration: number;
    readonly easingLogic: EasingLogic;
    readonly interruptible: boolean;
    startTime: number;
    endTime: number;
    timer: any;
    readonly interruptListenersAttached: boolean;
}
/**
 * An Interface a listener should implement to be notified about possible interrupt events
 * that happend due to user interaction while a scroll animation takes place.
 *
 * The PageScrollService provides an implementation to a PageScrollInstance to be notified
 * about scroll animation interrupts and stop related animations.
 */
export interface InterruptReporter {
    report: {
        (event: Event, pageScrollInstance: PageScrollInstance): void;
    };
}
