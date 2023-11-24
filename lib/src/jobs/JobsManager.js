"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsManager = void 0;
// @ts-nocheck
const netinfo_1 = __importDefault(require("@react-native-community/netinfo"));
const LocalStorageHandler_1 = require("../helpers/LocalStorageHandler");
const Jobs_1 = require("./Jobs");
const QueuedJobs_1 = require("./QueuedJobs");
class JobsManager {
    constructor(localStorageHandler, apolloClientManager) {
        this.onOnline = () => __awaiter(this, void 0, void 0, function* () {
            for (const item of this.queue) {
                const jobGroup = item.jobGroup;
                const jobName = item.jobName;
                // eslint-disable-next-line no-await-in-loop -- It's necessary to execute every job in order
                yield this.runJob(jobGroup, jobName);
            }
            this.queue = [];
        });
        this.queue = new Array();
        this.localStorageHandler = localStorageHandler;
        this.jobs = new Jobs_1.Jobs(this.localStorageHandler, apolloClientManager);
        this.queuedJobs = new QueuedJobs_1.QueuedJobs(this.localStorageHandler, apolloClientManager);
    }
    static create(localStorageHandler, apolloClientManager) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobsManager = new JobsManager(localStorageHandler, apolloClientManager);
            yield jobsManager.enqueueAllSavedInRepository();
            const netInfo = yield netinfo_1.default.fetch();
            // Check if internet is available to run all jobs in queue
            if (netInfo.type !== "unknown" && netInfo.isInternetReachable === true) {
                yield jobsManager.onOnline();
            }
            return jobsManager;
        });
    }
    /**
     * Executes job immediately and returns result or error.
     * @param jobGroup - Job group name referencing to the class with job functions.
     * @param jobName - Jobs within group/class.
     * @param params - Object passed as the first argument to the job function.
     */
    run(jobGroup, jobName, params) {
        const func = this.jobs[jobGroup][jobName];
        if (typeof func === "function") {
            return func(params);
        }
        return undefined;
    }
    /**
     * Add job to the queue. If there is an internet connection available, job is executed
     * immediately. Otherwise job is inserted into the queue and delayed until internet connection
     * will be restored. Queue is persisted in local storage.
     * @param jobGroup - Job group name referencing to the class with job functions.
     * @param jobName - Jobs within group/class.
     */
    addToQueue(jobGroup, jobName) {
        netinfo_1.default.fetch()
            .then(state => state.type !== "unknown" && state.isInternetReachable === true
            ? this.runJob(jobGroup, jobName)
            : this.enqueueJob(jobGroup, jobName))
            .catch(netError => {
            throw netError;
        });
    }
    /**
     * Attach event listener to the job group.
     * @param jobGroup - Job group name referencing to the class with job functions.
     * @param onEventListener - Function to be called if event will occur during job execution.
     */
    attachEventListener(jobGroup, onEventListener) {
        const typedEventListener = onEventListener;
        this.jobs[jobGroup].attachEventListener(typedEventListener);
    }
    /**
     * Attach error listener to the queued job group.
     * @param jobGroup - Job group name referencing to the class with job functions.
     * @param onErrorListener - Function to be called if error will occur during job execution.
     */
    attachErrorListener(jobGroup, onErrorListener) {
        const typedErrorListener = onErrorListener;
        this.queuedJobs[jobGroup].attachErrorListener(typedErrorListener);
    }
    runJob(jobGroup, jobName) {
        return __awaiter(this, void 0, void 0, function* () {
            const func = this.queuedJobs[jobGroup][jobName];
            if (typeof func === "function") {
                func();
            }
            yield this.dequeueJob(jobGroup, jobName);
        });
    }
    enqueueJob(jobGroup, jobName) {
        return __awaiter(this, void 0, void 0, function* () {
            const methodName = jobName.toString();
            const jobAlreadyQueued = this.queue.some(item => item.jobGroup === jobGroup && item.jobName === jobName);
            if (!jobAlreadyQueued) {
                this.queue.push({ jobGroup, jobName: methodName });
                yield this.updateJobStateInRepository(jobGroup, jobName, true);
            }
        });
    }
    dequeueJob(jobGroup, jobName) {
        return __awaiter(this, void 0, void 0, function* () {
            const methodName = jobName.toString();
            this.queue = this.queue.filter(item => item.jobGroup !== jobGroup || item.jobName !== methodName);
            yield this.updateJobStateInRepository(jobGroup, jobName, false);
        });
    }
    updateJobStateInRepository(jobGroup, jobName, state) {
        return __awaiter(this, void 0, void 0, function* () {
            let jobs = yield LocalStorageHandler_1.LocalStorageHandler.getJobs();
            if (!jobs) {
                jobs = null;
            }
            const jobGroupString = jobGroup.toString();
            const jobNameString = jobName.toString();
            const jobGroupObject = jobs ? jobs[jobGroup] : null;
            yield this.localStorageHandler.setJobs(Object.assign(Object.assign({}, jobs), { [jobGroupString]: Object.assign(Object.assign({}, jobGroupObject), { [jobNameString]: state }) }));
        });
    }
    enqueueAllSavedInRepository() {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield LocalStorageHandler_1.LocalStorageHandler.getJobs();
            if (jobs) {
                for (const jobGroupString of Object.keys(jobs)) {
                    const jobGroupKey = jobGroupString;
                    const jobGroup = jobs[jobGroupKey];
                    if (jobGroup) {
                        for (const jobNameString of Object.keys(jobGroup)) {
                            const jobNameKey = jobNameString;
                            const jobNameState = jobGroup[jobNameKey];
                            if (jobNameState) {
                                this.addToQueue(jobGroupString, jobNameString);
                            }
                        }
                    }
                }
            }
        });
    }
}
exports.JobsManager = JobsManager;
//# sourceMappingURL=JobsManager.js.map