import { PageScrollInstance } from './ng2-page-scroll-instance';
export declare class PageScrollService {
    private static instanceCounter;
    private runningInstances;
    private onInterrupted;
    private stopInternal(interrupted, pageScrollInstance);
    /**
     * Start a scroll animation. All properties of the animation are stored in the given {@link PageScrollInstance} object.
     *
     * This is the core functionality of the whole library.
     *
     * @param pageScrollInstance
     */
    start(pageScrollInstance: PageScrollInstance): void;
    /**
     * Stop all running scroll animations. Optionally limit to stop only the ones of specific namespace.
     *
     * @param namespace
     * @returns {boolean}
     */
    stopAll(namespace?: string): boolean;
    stop(pageScrollInstance: PageScrollInstance): boolean;
    constructor();
}
