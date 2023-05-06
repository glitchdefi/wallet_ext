(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@polkadot/keyring'), require('@polkadot/ui-settings'), require('@polkadot/util'), require('@polkadot/util-crypto')) :
    typeof define === 'function' && define.amd ? define(['exports', '@polkadot/keyring', '@polkadot/ui-settings', '@polkadot/util', '@polkadot/util-crypto'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.polkadotUiKeyring = {}, global.polkadotKeyring, global.polkadotUiSettings, global.polkadotUtil, global.polkadotUtilCrypto));
})(this, (function (exports, keyring$1, uiSettings, util, utilCrypto) { 'use strict';

    const global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : window;

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function isFunction(value) {
        return typeof value === 'function';
    }

    function createErrorClass(createImpl) {
        var _super = function (instance) {
            Error.call(instance);
            instance.stack = new Error().stack;
        };
        var ctorFunc = createImpl(_super);
        ctorFunc.prototype = Object.create(Error.prototype);
        ctorFunc.prototype.constructor = ctorFunc;
        return ctorFunc;
    }

    var UnsubscriptionError = createErrorClass(function (_super) {
        return function UnsubscriptionErrorImpl(errors) {
            _super(this);
            this.message = errors
                ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
                : '';
            this.name = 'UnsubscriptionError';
            this.errors = errors;
        };
    });

    function arrRemove(arr, item) {
        if (arr) {
            var index = arr.indexOf(item);
            0 <= index && arr.splice(index, 1);
        }
    }

    var Subscription = (function () {
        function Subscription(initialTeardown) {
            this.initialTeardown = initialTeardown;
            this.closed = false;
            this._parentage = null;
            this._finalizers = null;
        }
        Subscription.prototype.unsubscribe = function () {
            var e_1, _a, e_2, _b;
            var errors;
            if (!this.closed) {
                this.closed = true;
                var _parentage = this._parentage;
                if (_parentage) {
                    this._parentage = null;
                    if (Array.isArray(_parentage)) {
                        try {
                            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                                var parent_1 = _parentage_1_1.value;
                                parent_1.remove(this);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    else {
                        _parentage.remove(this);
                    }
                }
                var initialFinalizer = this.initialTeardown;
                if (isFunction(initialFinalizer)) {
                    try {
                        initialFinalizer();
                    }
                    catch (e) {
                        errors = e instanceof UnsubscriptionError ? e.errors : [e];
                    }
                }
                var _finalizers = this._finalizers;
                if (_finalizers) {
                    this._finalizers = null;
                    try {
                        for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                            var finalizer = _finalizers_1_1.value;
                            try {
                                execFinalizer(finalizer);
                            }
                            catch (err) {
                                errors = errors !== null && errors !== void 0 ? errors : [];
                                if (err instanceof UnsubscriptionError) {
                                    errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                                }
                                else {
                                    errors.push(err);
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                if (errors) {
                    throw new UnsubscriptionError(errors);
                }
            }
        };
        Subscription.prototype.add = function (teardown) {
            var _a;
            if (teardown && teardown !== this) {
                if (this.closed) {
                    execFinalizer(teardown);
                }
                else {
                    if (teardown instanceof Subscription) {
                        if (teardown.closed || teardown._hasParent(this)) {
                            return;
                        }
                        teardown._addParent(this);
                    }
                    (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
                }
            }
        };
        Subscription.prototype._hasParent = function (parent) {
            var _parentage = this._parentage;
            return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
        };
        Subscription.prototype._addParent = function (parent) {
            var _parentage = this._parentage;
            this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
        };
        Subscription.prototype._removeParent = function (parent) {
            var _parentage = this._parentage;
            if (_parentage === parent) {
                this._parentage = null;
            }
            else if (Array.isArray(_parentage)) {
                arrRemove(_parentage, parent);
            }
        };
        Subscription.prototype.remove = function (teardown) {
            var _finalizers = this._finalizers;
            _finalizers && arrRemove(_finalizers, teardown);
            if (teardown instanceof Subscription) {
                teardown._removeParent(this);
            }
        };
        Subscription.EMPTY = (function () {
            var empty = new Subscription();
            empty.closed = true;
            return empty;
        })();
        return Subscription;
    }());
    var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
    function isSubscription(value) {
        return (value instanceof Subscription ||
            (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
    }
    function execFinalizer(finalizer) {
        if (isFunction(finalizer)) {
            finalizer();
        }
        else {
            finalizer.unsubscribe();
        }
    }

    var config = {
        onUnhandledError: null,
        onStoppedNotification: null,
        Promise: undefined,
        useDeprecatedSynchronousErrorHandling: false,
        useDeprecatedNextContext: false,
    };

    var timeoutProvider = {
        setTimeout: function (handler, timeout) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var delegate = timeoutProvider.delegate;
            if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
                return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
            }
            return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
        },
        clearTimeout: function (handle) {
            var delegate = timeoutProvider.delegate;
            return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
        },
        delegate: undefined,
    };

    function reportUnhandledError(err) {
        timeoutProvider.setTimeout(function () {
            {
                throw err;
            }
        });
    }

    function noop() { }

    function errorContext(cb) {
        {
            cb();
        }
    }

    var Subscriber = (function (_super) {
        __extends(Subscriber, _super);
        function Subscriber(destination) {
            var _this = _super.call(this) || this;
            _this.isStopped = false;
            if (destination) {
                _this.destination = destination;
                if (isSubscription(destination)) {
                    destination.add(_this);
                }
            }
            else {
                _this.destination = EMPTY_OBSERVER;
            }
            return _this;
        }
        Subscriber.create = function (next, error, complete) {
            return new SafeSubscriber(next, error, complete);
        };
        Subscriber.prototype.next = function (value) {
            if (this.isStopped) ;
            else {
                this._next(value);
            }
        };
        Subscriber.prototype.error = function (err) {
            if (this.isStopped) ;
            else {
                this.isStopped = true;
                this._error(err);
            }
        };
        Subscriber.prototype.complete = function () {
            if (this.isStopped) ;
            else {
                this.isStopped = true;
                this._complete();
            }
        };
        Subscriber.prototype.unsubscribe = function () {
            if (!this.closed) {
                this.isStopped = true;
                _super.prototype.unsubscribe.call(this);
                this.destination = null;
            }
        };
        Subscriber.prototype._next = function (value) {
            this.destination.next(value);
        };
        Subscriber.prototype._error = function (err) {
            try {
                this.destination.error(err);
            }
            finally {
                this.unsubscribe();
            }
        };
        Subscriber.prototype._complete = function () {
            try {
                this.destination.complete();
            }
            finally {
                this.unsubscribe();
            }
        };
        return Subscriber;
    }(Subscription));
    var _bind = Function.prototype.bind;
    function bind(fn, thisArg) {
        return _bind.call(fn, thisArg);
    }
    var ConsumerObserver = (function () {
        function ConsumerObserver(partialObserver) {
            this.partialObserver = partialObserver;
        }
        ConsumerObserver.prototype.next = function (value) {
            var partialObserver = this.partialObserver;
            if (partialObserver.next) {
                try {
                    partialObserver.next(value);
                }
                catch (error) {
                    handleUnhandledError(error);
                }
            }
        };
        ConsumerObserver.prototype.error = function (err) {
            var partialObserver = this.partialObserver;
            if (partialObserver.error) {
                try {
                    partialObserver.error(err);
                }
                catch (error) {
                    handleUnhandledError(error);
                }
            }
            else {
                handleUnhandledError(err);
            }
        };
        ConsumerObserver.prototype.complete = function () {
            var partialObserver = this.partialObserver;
            if (partialObserver.complete) {
                try {
                    partialObserver.complete();
                }
                catch (error) {
                    handleUnhandledError(error);
                }
            }
        };
        return ConsumerObserver;
    }());
    var SafeSubscriber = (function (_super) {
        __extends(SafeSubscriber, _super);
        function SafeSubscriber(observerOrNext, error, complete) {
            var _this = _super.call(this) || this;
            var partialObserver;
            if (isFunction(observerOrNext) || !observerOrNext) {
                partialObserver = {
                    next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                    error: error !== null && error !== void 0 ? error : undefined,
                    complete: complete !== null && complete !== void 0 ? complete : undefined,
                };
            }
            else {
                var context_1;
                if (_this && config.useDeprecatedNextContext) {
                    context_1 = Object.create(observerOrNext);
                    context_1.unsubscribe = function () { return _this.unsubscribe(); };
                    partialObserver = {
                        next: observerOrNext.next && bind(observerOrNext.next, context_1),
                        error: observerOrNext.error && bind(observerOrNext.error, context_1),
                        complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                    };
                }
                else {
                    partialObserver = observerOrNext;
                }
            }
            _this.destination = new ConsumerObserver(partialObserver);
            return _this;
        }
        return SafeSubscriber;
    }(Subscriber));
    function handleUnhandledError(error) {
        {
            reportUnhandledError(error);
        }
    }
    function defaultErrorHandler(err) {
        throw err;
    }
    var EMPTY_OBSERVER = {
        closed: true,
        next: noop,
        error: defaultErrorHandler,
        complete: noop,
    };

    var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

    function identity(x) {
        return x;
    }

    function pipeFromArray(fns) {
        if (fns.length === 0) {
            return identity;
        }
        if (fns.length === 1) {
            return fns[0];
        }
        return function piped(input) {
            return fns.reduce(function (prev, fn) { return fn(prev); }, input);
        };
    }

    var Observable = (function () {
        function Observable(subscribe) {
            if (subscribe) {
                this._subscribe = subscribe;
            }
        }
        Observable.prototype.lift = function (operator) {
            var observable = new Observable();
            observable.source = this;
            observable.operator = operator;
            return observable;
        };
        Observable.prototype.subscribe = function (observerOrNext, error, complete) {
            var _this = this;
            var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
            errorContext(function () {
                var _a = _this, operator = _a.operator, source = _a.source;
                subscriber.add(operator
                    ?
                        operator.call(subscriber, source)
                    : source
                        ?
                            _this._subscribe(subscriber)
                        :
                            _this._trySubscribe(subscriber));
            });
            return subscriber;
        };
        Observable.prototype._trySubscribe = function (sink) {
            try {
                return this._subscribe(sink);
            }
            catch (err) {
                sink.error(err);
            }
        };
        Observable.prototype.forEach = function (next, promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var subscriber = new SafeSubscriber({
                    next: function (value) {
                        try {
                            next(value);
                        }
                        catch (err) {
                            reject(err);
                            subscriber.unsubscribe();
                        }
                    },
                    error: reject,
                    complete: resolve,
                });
                _this.subscribe(subscriber);
            });
        };
        Observable.prototype._subscribe = function (subscriber) {
            var _a;
            return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
        };
        Observable.prototype[observable] = function () {
            return this;
        };
        Observable.prototype.pipe = function () {
            var operations = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                operations[_i] = arguments[_i];
            }
            return pipeFromArray(operations)(this);
        };
        Observable.prototype.toPromise = function (promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var value;
                _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
            });
        };
        Observable.create = function (subscribe) {
            return new Observable(subscribe);
        };
        return Observable;
    }());
    function getPromiseCtor(promiseCtor) {
        var _a;
        return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
    }
    function isObserver(value) {
        return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
    }
    function isSubscriber(value) {
        return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
    }

    function hasLift(source) {
        return isFunction(source === null || source === void 0 ? void 0 : source.lift);
    }
    function operate(init) {
        return function (source) {
            if (hasLift(source)) {
                return source.lift(function (liftedSource) {
                    try {
                        return init(liftedSource, this);
                    }
                    catch (err) {
                        this.error(err);
                    }
                });
            }
            throw new TypeError('Unable to lift unknown Observable type');
        };
    }

    function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
        return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
    }
    var OperatorSubscriber = (function (_super) {
        __extends(OperatorSubscriber, _super);
        function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
            var _this = _super.call(this, destination) || this;
            _this.onFinalize = onFinalize;
            _this.shouldUnsubscribe = shouldUnsubscribe;
            _this._next = onNext
                ? function (value) {
                    try {
                        onNext(value);
                    }
                    catch (err) {
                        destination.error(err);
                    }
                }
                : _super.prototype._next;
            _this._error = onError
                ? function (err) {
                    try {
                        onError(err);
                    }
                    catch (err) {
                        destination.error(err);
                    }
                    finally {
                        this.unsubscribe();
                    }
                }
                : _super.prototype._error;
            _this._complete = onComplete
                ? function () {
                    try {
                        onComplete();
                    }
                    catch (err) {
                        destination.error(err);
                    }
                    finally {
                        this.unsubscribe();
                    }
                }
                : _super.prototype._complete;
            return _this;
        }
        OperatorSubscriber.prototype.unsubscribe = function () {
            var _a;
            if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                var closed_1 = this.closed;
                _super.prototype.unsubscribe.call(this);
                !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
            }
        };
        return OperatorSubscriber;
    }(Subscriber));

    var ObjectUnsubscribedError = createErrorClass(function (_super) {
        return function ObjectUnsubscribedErrorImpl() {
            _super(this);
            this.name = 'ObjectUnsubscribedError';
            this.message = 'object unsubscribed';
        };
    });

    var Subject = (function (_super) {
        __extends(Subject, _super);
        function Subject() {
            var _this = _super.call(this) || this;
            _this.closed = false;
            _this.currentObservers = null;
            _this.observers = [];
            _this.isStopped = false;
            _this.hasError = false;
            _this.thrownError = null;
            return _this;
        }
        Subject.prototype.lift = function (operator) {
            var subject = new AnonymousSubject(this, this);
            subject.operator = operator;
            return subject;
        };
        Subject.prototype._throwIfClosed = function () {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
        };
        Subject.prototype.next = function (value) {
            var _this = this;
            errorContext(function () {
                var e_1, _a;
                _this._throwIfClosed();
                if (!_this.isStopped) {
                    if (!_this.currentObservers) {
                        _this.currentObservers = Array.from(_this.observers);
                    }
                    try {
                        for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var observer = _c.value;
                            observer.next(value);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            });
        };
        Subject.prototype.error = function (err) {
            var _this = this;
            errorContext(function () {
                _this._throwIfClosed();
                if (!_this.isStopped) {
                    _this.hasError = _this.isStopped = true;
                    _this.thrownError = err;
                    var observers = _this.observers;
                    while (observers.length) {
                        observers.shift().error(err);
                    }
                }
            });
        };
        Subject.prototype.complete = function () {
            var _this = this;
            errorContext(function () {
                _this._throwIfClosed();
                if (!_this.isStopped) {
                    _this.isStopped = true;
                    var observers = _this.observers;
                    while (observers.length) {
                        observers.shift().complete();
                    }
                }
            });
        };
        Subject.prototype.unsubscribe = function () {
            this.isStopped = this.closed = true;
            this.observers = this.currentObservers = null;
        };
        Object.defineProperty(Subject.prototype, "observed", {
            get: function () {
                var _a;
                return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
            },
            enumerable: false,
            configurable: true
        });
        Subject.prototype._trySubscribe = function (subscriber) {
            this._throwIfClosed();
            return _super.prototype._trySubscribe.call(this, subscriber);
        };
        Subject.prototype._subscribe = function (subscriber) {
            this._throwIfClosed();
            this._checkFinalizedStatuses(subscriber);
            return this._innerSubscribe(subscriber);
        };
        Subject.prototype._innerSubscribe = function (subscriber) {
            var _this = this;
            var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
            if (hasError || isStopped) {
                return EMPTY_SUBSCRIPTION;
            }
            this.currentObservers = null;
            observers.push(subscriber);
            return new Subscription(function () {
                _this.currentObservers = null;
                arrRemove(observers, subscriber);
            });
        };
        Subject.prototype._checkFinalizedStatuses = function (subscriber) {
            var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
            if (hasError) {
                subscriber.error(thrownError);
            }
            else if (isStopped) {
                subscriber.complete();
            }
        };
        Subject.prototype.asObservable = function () {
            var observable = new Observable();
            observable.source = this;
            return observable;
        };
        Subject.create = function (destination, source) {
            return new AnonymousSubject(destination, source);
        };
        return Subject;
    }(Observable));
    var AnonymousSubject = (function (_super) {
        __extends(AnonymousSubject, _super);
        function AnonymousSubject(destination, source) {
            var _this = _super.call(this) || this;
            _this.destination = destination;
            _this.source = source;
            return _this;
        }
        AnonymousSubject.prototype.next = function (value) {
            var _a, _b;
            (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
        };
        AnonymousSubject.prototype.error = function (err) {
            var _a, _b;
            (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
        };
        AnonymousSubject.prototype.complete = function () {
            var _a, _b;
            (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        AnonymousSubject.prototype._subscribe = function (subscriber) {
            var _a, _b;
            return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
        };
        return AnonymousSubject;
    }(Subject));

    var BehaviorSubject = (function (_super) {
        __extends(BehaviorSubject, _super);
        function BehaviorSubject(_value) {
            var _this = _super.call(this) || this;
            _this._value = _value;
            return _this;
        }
        Object.defineProperty(BehaviorSubject.prototype, "value", {
            get: function () {
                return this.getValue();
            },
            enumerable: false,
            configurable: true
        });
        BehaviorSubject.prototype._subscribe = function (subscriber) {
            var subscription = _super.prototype._subscribe.call(this, subscriber);
            !subscription.closed && subscriber.next(this._value);
            return subscription;
        };
        BehaviorSubject.prototype.getValue = function () {
            var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
            if (hasError) {
                throw thrownError;
            }
            this._throwIfClosed();
            return _value;
        };
        BehaviorSubject.prototype.next = function (value) {
            _super.prototype.next.call(this, (this._value = value));
        };
        return BehaviorSubject;
    }(Subject));

    function isScheduler(value) {
        return value && isFunction(value.schedule);
    }

    function last(arr) {
        return arr[arr.length - 1];
    }
    function popResultSelector(args) {
        return isFunction(last(args)) ? args.pop() : undefined;
    }
    function popScheduler(args) {
        return isScheduler(last(args)) ? args.pop() : undefined;
    }

    var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

    function isPromise(value) {
        return isFunction(value === null || value === void 0 ? void 0 : value.then);
    }

    function isInteropObservable(input) {
        return isFunction(input[observable]);
    }

    function isAsyncIterable(obj) {
        return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
    }

    function createInvalidObservableTypeError(input) {
        return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
    }

    function getSymbolIterator() {
        if (typeof Symbol !== 'function' || !Symbol.iterator) {
            return '@@iterator';
        }
        return Symbol.iterator;
    }
    var iterator = getSymbolIterator();

    function isIterable(input) {
        return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
    }

    function readableStreamLikeToAsyncGenerator(readableStream) {
        return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
            var reader, _a, value, done;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        reader = readableStream.getReader();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 9, 10]);
                        _b.label = 2;
                    case 2:
                        return [4, __await(reader.read())];
                    case 3:
                        _a = _b.sent(), value = _a.value, done = _a.done;
                        if (!done) return [3, 5];
                        return [4, __await(void 0)];
                    case 4: return [2, _b.sent()];
                    case 5: return [4, __await(value)];
                    case 6: return [4, _b.sent()];
                    case 7:
                        _b.sent();
                        return [3, 2];
                    case 8: return [3, 10];
                    case 9:
                        reader.releaseLock();
                        return [7];
                    case 10: return [2];
                }
            });
        });
    }
    function isReadableStreamLike(obj) {
        return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
    }

    function innerFrom(input) {
        if (input instanceof Observable) {
            return input;
        }
        if (input != null) {
            if (isInteropObservable(input)) {
                return fromInteropObservable(input);
            }
            if (isArrayLike(input)) {
                return fromArrayLike(input);
            }
            if (isPromise(input)) {
                return fromPromise(input);
            }
            if (isAsyncIterable(input)) {
                return fromAsyncIterable(input);
            }
            if (isIterable(input)) {
                return fromIterable(input);
            }
            if (isReadableStreamLike(input)) {
                return fromReadableStreamLike(input);
            }
        }
        throw createInvalidObservableTypeError(input);
    }
    function fromInteropObservable(obj) {
        return new Observable(function (subscriber) {
            var obs = obj[observable]();
            if (isFunction(obs.subscribe)) {
                return obs.subscribe(subscriber);
            }
            throw new TypeError('Provided object does not correctly implement Symbol.observable');
        });
    }
    function fromArrayLike(array) {
        return new Observable(function (subscriber) {
            for (var i = 0; i < array.length && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        });
    }
    function fromPromise(promise) {
        return new Observable(function (subscriber) {
            promise
                .then(function (value) {
                if (!subscriber.closed) {
                    subscriber.next(value);
                    subscriber.complete();
                }
            }, function (err) { return subscriber.error(err); })
                .then(null, reportUnhandledError);
        });
    }
    function fromIterable(iterable) {
        return new Observable(function (subscriber) {
            var e_1, _a;
            try {
                for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                    var value = iterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            subscriber.complete();
        });
    }
    function fromAsyncIterable(asyncIterable) {
        return new Observable(function (subscriber) {
            process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
        });
    }
    function fromReadableStreamLike(readableStream) {
        return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
    }
    function process(asyncIterable, subscriber) {
        var asyncIterable_1, asyncIterable_1_1;
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function () {
            var value, e_2_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 11]);
                        asyncIterable_1 = __asyncValues(asyncIterable);
                        _b.label = 1;
                    case 1: return [4, asyncIterable_1.next()];
                    case 2:
                        if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                        value = asyncIterable_1_1.value;
                        subscriber.next(value);
                        if (subscriber.closed) {
                            return [2];
                        }
                        _b.label = 3;
                    case 3: return [3, 1];
                    case 4: return [3, 11];
                    case 5:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3, 11];
                    case 6:
                        _b.trys.push([6, , 9, 10]);
                        if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                        return [4, _a.call(asyncIterable_1)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8: return [3, 10];
                    case 9:
                        if (e_2) throw e_2.error;
                        return [7];
                    case 10: return [7];
                    case 11:
                        subscriber.complete();
                        return [2];
                }
            });
        });
    }

    function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
        if (delay === void 0) { delay = 0; }
        if (repeat === void 0) { repeat = false; }
        var scheduleSubscription = scheduler.schedule(function () {
            work();
            if (repeat) {
                parentSubscription.add(this.schedule(null, delay));
            }
            else {
                this.unsubscribe();
            }
        }, delay);
        parentSubscription.add(scheduleSubscription);
        if (!repeat) {
            return scheduleSubscription;
        }
    }

    function observeOn(scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        return operate(function (source, subscriber) {
            source.subscribe(createOperatorSubscriber(subscriber, function (value) { return executeSchedule(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return executeSchedule(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return executeSchedule(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
        });
    }

    function subscribeOn(scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        return operate(function (source, subscriber) {
            subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
        });
    }

    function scheduleObservable(input, scheduler) {
        return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
    }

    function schedulePromise(input, scheduler) {
        return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
    }

    function scheduleArray(input, scheduler) {
        return new Observable(function (subscriber) {
            var i = 0;
            return scheduler.schedule(function () {
                if (i === input.length) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(input[i++]);
                    if (!subscriber.closed) {
                        this.schedule();
                    }
                }
            });
        });
    }

    function scheduleIterable(input, scheduler) {
        return new Observable(function (subscriber) {
            var iterator$1;
            executeSchedule(subscriber, scheduler, function () {
                iterator$1 = input[iterator]();
                executeSchedule(subscriber, scheduler, function () {
                    var _a;
                    var value;
                    var done;
                    try {
                        (_a = iterator$1.next(), value = _a.value, done = _a.done);
                    }
                    catch (err) {
                        subscriber.error(err);
                        return;
                    }
                    if (done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(value);
                    }
                }, 0, true);
            });
            return function () { return isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return(); };
        });
    }

    function scheduleAsyncIterable(input, scheduler) {
        if (!input) {
            throw new Error('Iterable cannot be null');
        }
        return new Observable(function (subscriber) {
            executeSchedule(subscriber, scheduler, function () {
                var iterator = input[Symbol.asyncIterator]();
                executeSchedule(subscriber, scheduler, function () {
                    iterator.next().then(function (result) {
                        if (result.done) {
                            subscriber.complete();
                        }
                        else {
                            subscriber.next(result.value);
                        }
                    });
                }, 0, true);
            });
        });
    }

    function scheduleReadableStreamLike(input, scheduler) {
        return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
    }

    function scheduled(input, scheduler) {
        if (input != null) {
            if (isInteropObservable(input)) {
                return scheduleObservable(input, scheduler);
            }
            if (isArrayLike(input)) {
                return scheduleArray(input, scheduler);
            }
            if (isPromise(input)) {
                return schedulePromise(input, scheduler);
            }
            if (isAsyncIterable(input)) {
                return scheduleAsyncIterable(input, scheduler);
            }
            if (isIterable(input)) {
                return scheduleIterable(input, scheduler);
            }
            if (isReadableStreamLike(input)) {
                return scheduleReadableStreamLike(input, scheduler);
            }
        }
        throw createInvalidObservableTypeError(input);
    }

    function from(input, scheduler) {
        return scheduler ? scheduled(input, scheduler) : innerFrom(input);
    }

    function map(project, thisArg) {
        return operate(function (source, subscriber) {
            var index = 0;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                subscriber.next(project.call(thisArg, value, index++));
            }));
        });
    }

    var isArray$1 = Array.isArray;
    function callOrApply(fn, args) {
        return isArray$1(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
    }
    function mapOneOrManyArgs(fn) {
        return map(function (args) { return callOrApply(fn, args); });
    }

    var isArray = Array.isArray;
    var getPrototypeOf = Object.getPrototypeOf, objectProto = Object.prototype, getKeys = Object.keys;
    function argsArgArrayOrObject(args) {
        if (args.length === 1) {
            var first_1 = args[0];
            if (isArray(first_1)) {
                return { args: first_1, keys: null };
            }
            if (isPOJO(first_1)) {
                var keys = getKeys(first_1);
                return {
                    args: keys.map(function (key) { return first_1[key]; }),
                    keys: keys,
                };
            }
        }
        return { args: args, keys: null };
    }
    function isPOJO(obj) {
        return obj && typeof obj === 'object' && getPrototypeOf(obj) === objectProto;
    }

    function createObject(keys, values) {
        return keys.reduce(function (result, key, i) { return ((result[key] = values[i]), result); }, {});
    }

    function combineLatest() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var scheduler = popScheduler(args);
        var resultSelector = popResultSelector(args);
        var _a = argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
        if (observables.length === 0) {
            return from([], scheduler);
        }
        var result = new Observable(combineLatestInit(observables, scheduler, keys
            ?
                function (values) { return createObject(keys, values); }
            :
                identity));
        return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
    }
    function combineLatestInit(observables, scheduler, valueTransform) {
        if (valueTransform === void 0) { valueTransform = identity; }
        return function (subscriber) {
            maybeSchedule(scheduler, function () {
                var length = observables.length;
                var values = new Array(length);
                var active = length;
                var remainingFirstValues = length;
                var _loop_1 = function (i) {
                    maybeSchedule(scheduler, function () {
                        var source = from(observables[i], scheduler);
                        var hasFirstValue = false;
                        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                            values[i] = value;
                            if (!hasFirstValue) {
                                hasFirstValue = true;
                                remainingFirstValues--;
                            }
                            if (!remainingFirstValues) {
                                subscriber.next(valueTransform(values.slice()));
                            }
                        }, function () {
                            if (!--active) {
                                subscriber.complete();
                            }
                        }));
                    }, subscriber);
                };
                for (var i = 0; i < length; i++) {
                    _loop_1(i);
                }
            }, subscriber);
        };
    }
    function maybeSchedule(scheduler, execute, subscription) {
        if (scheduler) {
            executeSchedule(subscription, scheduler, execute);
        }
        else {
            execute();
        }
    }

    const subject = new BehaviorSubject(false);
    const env = {
        isDevelopment: () => subject.getValue(),
        set: (isDevelopment) => {
            subject.next(isDevelopment);
        },
        subject
    };

    const ACCOUNT_PREFIX = 'account:';
    const ADDRESS_PREFIX = 'address:';
    const CONTRACT_PREFIX = 'contract:';
    function toHex(address) {
        return util.u8aToHex(
        keyring$1.decodeAddress(address, true));
    }
    function accountKey(address) {
        return `${ACCOUNT_PREFIX}${toHex(address)}`;
    }
    function addressKey(address) {
        return `${ADDRESS_PREFIX}${toHex(address)}`;
    }
    function contractKey(address) {
        return `${CONTRACT_PREFIX}${toHex(address)}`;
    }
    const accountRegex = new RegExp(`^${ACCOUNT_PREFIX}0x[0-9a-f]*`, '');
    const addressRegex = new RegExp(`^${ADDRESS_PREFIX}0x[0-9a-f]*`, '');
    const contractRegex = new RegExp(`^${CONTRACT_PREFIX}0x[0-9a-f]*`, '');

    function createOptionItem(address, _name) {
        const name = util.isUndefined(_name)
            ? ((address.length > 15)
                ? `${address.slice(0, 6)}…${address.slice(-6)}`
                : address)
            : _name;
        return {
            key: address,
            name,
            value: address
        };
    }

    function callNext(current, subject, withTest) {
        const isDevMode = env.isDevelopment();
        const filtered = {};
        Object.keys(current).forEach((key) => {
            const { json: { meta: { isTesting = false } = {} } = {} } = current[key];
            if (!withTest || isDevMode || isTesting !== true) {
                filtered[key] = current[key];
            }
        });
        subject.next(filtered);
    }
    function genericSubject(keyCreator, withTest = false) {
        let current = {};
        const subject = new BehaviorSubject({});
        const next = () => callNext(current, subject, withTest);
        env.subject.subscribe(next);
        return {
            add: async (store, address, json, type) => {
                current = util.objectCopy(current);
                current[address] = {
                    json: util.objectSpread({}, json, { address }),
                    option: createOptionItem(address, json.meta.name),
                    type
                };
                if (!json.meta.isInjected && (!json.meta.isTesting || env.isDevelopment())) {
                    await store.set(keyCreator(address), json);
                }
                next();
                return current[address];
            },
            remove: async (store, address) => {
                current = util.objectCopy(current);
                delete current[address];
                await store.remove(keyCreator(address));
                next();
            },
            subject
        };
    }

    const accounts =  genericSubject(accountKey, true);

    const addresses =  genericSubject(addressKey);

    const contracts =  genericSubject(contractKey);

    const obervableAll =  combineLatest([
        accounts.subject,
        addresses.subject,
        contracts.subject
    ]).pipe(map(([accounts, addresses, contracts]) => ({
        accounts,
        addresses,
        contracts
    })));

    let hasCalledInitOptions = false;
    const sortByName = (a, b) => {
        const valueA = a.option.name;
        const valueB = b.option.name;
        return valueA.localeCompare(valueB);
    };
    const sortByCreated = (a, b) => {
        const valueA = a.json.meta.whenCreated || 0;
        const valueB = b.json.meta.whenCreated || 0;
        if (valueA < valueB) {
            return 1;
        }
        if (valueA > valueB) {
            return -1;
        }
        return 0;
    };
    class KeyringOption {
        constructor() {
            this.__internal__allSub = null;
            this.optionsSubject = new BehaviorSubject(this.emptyOptions());
        }
        createOptionHeader(name) {
            return {
                key: `header-${name.toLowerCase()}`,
                name,
                value: null
            };
        }
        init(keyring) {
            if (hasCalledInitOptions) {
                throw new Error('Unable to initialise options more than once');
            }
            this.__internal__allSub = obervableAll.subscribe(() => {
                const opts = this.emptyOptions();
                this.addAccounts(keyring, opts);
                this.addAddresses(keyring, opts);
                this.addContracts(keyring, opts);
                opts.address = this.linkItems({ Addresses: opts.address, Recent: opts.recent });
                opts.account = this.linkItems({ Accounts: opts.account, Development: opts.testing });
                opts.contract = this.linkItems({ Contracts: opts.contract });
                opts.all = [].concat(opts.account, opts.address);
                opts.allPlus = [].concat(opts.account, opts.address, opts.contract);
                this.optionsSubject.next(opts);
            });
            hasCalledInitOptions = true;
        }
        clear() {
            if (this.__internal__allSub) {
                this.__internal__allSub.unsubscribe();
            }
        }
        linkItems(items) {
            return Object.keys(items).reduce((result, header) => {
                const options = items[header];
                return result.concat(options.length
                    ? [this.createOptionHeader(header)]
                    : [], options);
            }, []);
        }
        addAccounts(keyring, options) {
            const available = keyring.accounts.subject.getValue();
            Object
                .values(available)
                .sort(sortByName)
                .forEach(({ json: { meta: { isTesting = false } }, option }) => {
                if (!isTesting) {
                    options.account.push(option);
                }
                else {
                    options.testing.push(option);
                }
            });
        }
        addAddresses(keyring, options) {
            const available = keyring.addresses.subject.getValue();
            Object
                .values(available)
                .filter(({ json }) => !!json.meta.isRecent)
                .sort(sortByCreated)
                .forEach(({ option }) => {
                options.recent.push(option);
            });
            Object
                .values(available)
                .filter(({ json }) => !json.meta.isRecent)
                .sort(sortByName)
                .forEach(({ option }) => {
                options.address.push(option);
            });
        }
        addContracts(keyring, options) {
            const available = keyring.contracts.subject.getValue();
            Object
                .values(available)
                .sort(sortByName)
                .forEach(({ option }) => {
                options.contract.push(option);
            });
        }
        emptyOptions() {
            return {
                account: [],
                address: [],
                all: [],
                allPlus: [],
                contract: [],
                recent: [],
                testing: []
            };
        }
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function commonjsRequire(path) {
    	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
    }

    var localforage = {exports: {}};

    /*!
        localForage -- Offline Storage, Improved
        Version 1.10.0
        https://localforage.github.io/localForage
        (c) 2013-2017 Mozilla, Apache License 2.0
    */
    (function (module, exports) {
    	(function(f){{module.exports=f();}})(function(){return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
    	(function (global){
    	var Mutation = global.MutationObserver || global.WebKitMutationObserver;
    	var scheduleDrain;
    	{
    	  if (Mutation) {
    	    var called = 0;
    	    var observer = new Mutation(nextTick);
    	    var element = global.document.createTextNode('');
    	    observer.observe(element, {
    	      characterData: true
    	    });
    	    scheduleDrain = function () {
    	      element.data = (called = ++called % 2);
    	    };
    	  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    	    var channel = new global.MessageChannel();
    	    channel.port1.onmessage = nextTick;
    	    scheduleDrain = function () {
    	      channel.port2.postMessage(0);
    	    };
    	  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    	    scheduleDrain = function () {
    	      var scriptEl = global.document.createElement('script');
    	      scriptEl.onreadystatechange = function () {
    	        nextTick();
    	        scriptEl.onreadystatechange = null;
    	        scriptEl.parentNode.removeChild(scriptEl);
    	        scriptEl = null;
    	      };
    	      global.document.documentElement.appendChild(scriptEl);
    	    };
    	  } else {
    	    scheduleDrain = function () {
    	      setTimeout(nextTick, 0);
    	    };
    	  }
    	}
    	var draining;
    	var queue = [];
    	function nextTick() {
    	  draining = true;
    	  var i, oldQueue;
    	  var len = queue.length;
    	  while (len) {
    	    oldQueue = queue;
    	    queue = [];
    	    i = -1;
    	    while (++i < len) {
    	      oldQueue[i]();
    	    }
    	    len = queue.length;
    	  }
    	  draining = false;
    	}
    	module.exports = immediate;
    	function immediate(task) {
    	  if (queue.push(task) === 1 && !draining) {
    	    scheduleDrain();
    	  }
    	}
    	}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    	},{}],2:[function(_dereq_,module,exports){
    	var immediate = _dereq_(1);
    	function INTERNAL() {}
    	var handlers = {};
    	var REJECTED = ['REJECTED'];
    	var FULFILLED = ['FULFILLED'];
    	var PENDING = ['PENDING'];
    	module.exports = Promise;
    	function Promise(resolver) {
    	  if (typeof resolver !== 'function') {
    	    throw new TypeError('resolver must be a function');
    	  }
    	  this.state = PENDING;
    	  this.queue = [];
    	  this.outcome = void 0;
    	  if (resolver !== INTERNAL) {
    	    safelyResolveThenable(this, resolver);
    	  }
    	}
    	Promise.prototype["catch"] = function (onRejected) {
    	  return this.then(null, onRejected);
    	};
    	Promise.prototype.then = function (onFulfilled, onRejected) {
    	  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    	    typeof onRejected !== 'function' && this.state === REJECTED) {
    	    return this;
    	  }
    	  var promise = new this.constructor(INTERNAL);
    	  if (this.state !== PENDING) {
    	    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    	    unwrap(promise, resolver, this.outcome);
    	  } else {
    	    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
    	  }
    	  return promise;
    	};
    	function QueueItem(promise, onFulfilled, onRejected) {
    	  this.promise = promise;
    	  if (typeof onFulfilled === 'function') {
    	    this.onFulfilled = onFulfilled;
    	    this.callFulfilled = this.otherCallFulfilled;
    	  }
    	  if (typeof onRejected === 'function') {
    	    this.onRejected = onRejected;
    	    this.callRejected = this.otherCallRejected;
    	  }
    	}
    	QueueItem.prototype.callFulfilled = function (value) {
    	  handlers.resolve(this.promise, value);
    	};
    	QueueItem.prototype.otherCallFulfilled = function (value) {
    	  unwrap(this.promise, this.onFulfilled, value);
    	};
    	QueueItem.prototype.callRejected = function (value) {
    	  handlers.reject(this.promise, value);
    	};
    	QueueItem.prototype.otherCallRejected = function (value) {
    	  unwrap(this.promise, this.onRejected, value);
    	};
    	function unwrap(promise, func, value) {
    	  immediate(function () {
    	    var returnValue;
    	    try {
    	      returnValue = func(value);
    	    } catch (e) {
    	      return handlers.reject(promise, e);
    	    }
    	    if (returnValue === promise) {
    	      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    	    } else {
    	      handlers.resolve(promise, returnValue);
    	    }
    	  });
    	}
    	handlers.resolve = function (self, value) {
    	  var result = tryCatch(getThen, value);
    	  if (result.status === 'error') {
    	    return handlers.reject(self, result.value);
    	  }
    	  var thenable = result.value;
    	  if (thenable) {
    	    safelyResolveThenable(self, thenable);
    	  } else {
    	    self.state = FULFILLED;
    	    self.outcome = value;
    	    var i = -1;
    	    var len = self.queue.length;
    	    while (++i < len) {
    	      self.queue[i].callFulfilled(value);
    	    }
    	  }
    	  return self;
    	};
    	handlers.reject = function (self, error) {
    	  self.state = REJECTED;
    	  self.outcome = error;
    	  var i = -1;
    	  var len = self.queue.length;
    	  while (++i < len) {
    	    self.queue[i].callRejected(error);
    	  }
    	  return self;
    	};
    	function getThen(obj) {
    	  var then = obj && obj.then;
    	  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    	    return function appyThen() {
    	      then.apply(obj, arguments);
    	    };
    	  }
    	}
    	function safelyResolveThenable(self, thenable) {
    	  var called = false;
    	  function onError(value) {
    	    if (called) {
    	      return;
    	    }
    	    called = true;
    	    handlers.reject(self, value);
    	  }
    	  function onSuccess(value) {
    	    if (called) {
    	      return;
    	    }
    	    called = true;
    	    handlers.resolve(self, value);
    	  }
    	  function tryToUnwrap() {
    	    thenable(onSuccess, onError);
    	  }
    	  var result = tryCatch(tryToUnwrap);
    	  if (result.status === 'error') {
    	    onError(result.value);
    	  }
    	}
    	function tryCatch(func, value) {
    	  var out = {};
    	  try {
    	    out.value = func(value);
    	    out.status = 'success';
    	  } catch (e) {
    	    out.status = 'error';
    	    out.value = e;
    	  }
    	  return out;
    	}
    	Promise.resolve = resolve;
    	function resolve(value) {
    	  if (value instanceof this) {
    	    return value;
    	  }
    	  return handlers.resolve(new this(INTERNAL), value);
    	}
    	Promise.reject = reject;
    	function reject(reason) {
    	  var promise = new this(INTERNAL);
    	  return handlers.reject(promise, reason);
    	}
    	Promise.all = all;
    	function all(iterable) {
    	  var self = this;
    	  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    	    return this.reject(new TypeError('must be an array'));
    	  }
    	  var len = iterable.length;
    	  var called = false;
    	  if (!len) {
    	    return this.resolve([]);
    	  }
    	  var values = new Array(len);
    	  var resolved = 0;
    	  var i = -1;
    	  var promise = new this(INTERNAL);
    	  while (++i < len) {
    	    allResolver(iterable[i], i);
    	  }
    	  return promise;
    	  function allResolver(value, i) {
    	    self.resolve(value).then(resolveFromAll, function (error) {
    	      if (!called) {
    	        called = true;
    	        handlers.reject(promise, error);
    	      }
    	    });
    	    function resolveFromAll(outValue) {
    	      values[i] = outValue;
    	      if (++resolved === len && !called) {
    	        called = true;
    	        handlers.resolve(promise, values);
    	      }
    	    }
    	  }
    	}
    	Promise.race = race;
    	function race(iterable) {
    	  var self = this;
    	  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    	    return this.reject(new TypeError('must be an array'));
    	  }
    	  var len = iterable.length;
    	  var called = false;
    	  if (!len) {
    	    return this.resolve([]);
    	  }
    	  var i = -1;
    	  var promise = new this(INTERNAL);
    	  while (++i < len) {
    	    resolver(iterable[i]);
    	  }
    	  return promise;
    	  function resolver(value) {
    	    self.resolve(value).then(function (response) {
    	      if (!called) {
    	        called = true;
    	        handlers.resolve(promise, response);
    	      }
    	    }, function (error) {
    	      if (!called) {
    	        called = true;
    	        handlers.reject(promise, error);
    	      }
    	    });
    	  }
    	}
    	},{"1":1}],3:[function(_dereq_,module,exports){
    	(function (global){
    	if (typeof global.Promise !== 'function') {
    	  global.Promise = _dereq_(2);
    	}
    	}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    	},{"2":2}],4:[function(_dereq_,module,exports){
    	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
    	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    	function getIDB() {
    	    try {
    	        if (typeof indexedDB !== 'undefined') {
    	            return indexedDB;
    	        }
    	        if (typeof webkitIndexedDB !== 'undefined') {
    	            return webkitIndexedDB;
    	        }
    	        if (typeof mozIndexedDB !== 'undefined') {
    	            return mozIndexedDB;
    	        }
    	        if (typeof OIndexedDB !== 'undefined') {
    	            return OIndexedDB;
    	        }
    	        if (typeof msIndexedDB !== 'undefined') {
    	            return msIndexedDB;
    	        }
    	    } catch (e) {
    	        return;
    	    }
    	}
    	var idb = getIDB();
    	function isIndexedDBValid() {
    	    try {
    	        if (!idb || !idb.open) {
    	            return false;
    	        }
    	        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
    	        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;
    	        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
    	        typeof IDBKeyRange !== 'undefined';
    	    } catch (e) {
    	        return false;
    	    }
    	}
    	function createBlob(parts, properties) {
    	    parts = parts || [];
    	    properties = properties || {};
    	    try {
    	        return new Blob(parts, properties);
    	    } catch (e) {
    	        if (e.name !== 'TypeError') {
    	            throw e;
    	        }
    	        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
    	        var builder = new Builder();
    	        for (var i = 0; i < parts.length; i += 1) {
    	            builder.append(parts[i]);
    	        }
    	        return builder.getBlob(properties.type);
    	    }
    	}
    	if (typeof Promise === 'undefined') {
    	    _dereq_(3);
    	}
    	var Promise$1 = Promise;
    	function executeCallback(promise, callback) {
    	    if (callback) {
    	        promise.then(function (result) {
    	            callback(null, result);
    	        }, function (error) {
    	            callback(error);
    	        });
    	    }
    	}
    	function executeTwoCallbacks(promise, callback, errorCallback) {
    	    if (typeof callback === 'function') {
    	        promise.then(callback);
    	    }
    	    if (typeof errorCallback === 'function') {
    	        promise["catch"](errorCallback);
    	    }
    	}
    	function normalizeKey(key) {
    	    if (typeof key !== 'string') {
    	        console.warn(key + ' used as a key, but it is not a string.');
    	        key = String(key);
    	    }
    	    return key;
    	}
    	function getCallback() {
    	    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
    	        return arguments[arguments.length - 1];
    	    }
    	}
    	var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
    	var supportsBlobs = void 0;
    	var dbContexts = {};
    	var toString = Object.prototype.toString;
    	var READ_ONLY = 'readonly';
    	var READ_WRITE = 'readwrite';
    	function _binStringToArrayBuffer(bin) {
    	    var length = bin.length;
    	    var buf = new ArrayBuffer(length);
    	    var arr = new Uint8Array(buf);
    	    for (var i = 0; i < length; i++) {
    	        arr[i] = bin.charCodeAt(i);
    	    }
    	    return buf;
    	}
    	function _checkBlobSupportWithoutCaching(idb) {
    	    return new Promise$1(function (resolve) {
    	        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
    	        var blob = createBlob(['']);
    	        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');
    	        txn.onabort = function (e) {
    	            e.preventDefault();
    	            e.stopPropagation();
    	            resolve(false);
    	        };
    	        txn.oncomplete = function () {
    	            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
    	            var matchedEdge = navigator.userAgent.match(/Edge\//);
    	            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
    	        };
    	    })["catch"](function () {
    	        return false;
    	    });
    	}
    	function _checkBlobSupport(idb) {
    	    if (typeof supportsBlobs === 'boolean') {
    	        return Promise$1.resolve(supportsBlobs);
    	    }
    	    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
    	        supportsBlobs = value;
    	        return supportsBlobs;
    	    });
    	}
    	function _deferReadiness(dbInfo) {
    	    var dbContext = dbContexts[dbInfo.name];
    	    var deferredOperation = {};
    	    deferredOperation.promise = new Promise$1(function (resolve, reject) {
    	        deferredOperation.resolve = resolve;
    	        deferredOperation.reject = reject;
    	    });
    	    dbContext.deferredOperations.push(deferredOperation);
    	    if (!dbContext.dbReady) {
    	        dbContext.dbReady = deferredOperation.promise;
    	    } else {
    	        dbContext.dbReady = dbContext.dbReady.then(function () {
    	            return deferredOperation.promise;
    	        });
    	    }
    	}
    	function _advanceReadiness(dbInfo) {
    	    var dbContext = dbContexts[dbInfo.name];
    	    var deferredOperation = dbContext.deferredOperations.pop();
    	    if (deferredOperation) {
    	        deferredOperation.resolve();
    	        return deferredOperation.promise;
    	    }
    	}
    	function _rejectReadiness(dbInfo, err) {
    	    var dbContext = dbContexts[dbInfo.name];
    	    var deferredOperation = dbContext.deferredOperations.pop();
    	    if (deferredOperation) {
    	        deferredOperation.reject(err);
    	        return deferredOperation.promise;
    	    }
    	}
    	function _getConnection(dbInfo, upgradeNeeded) {
    	    return new Promise$1(function (resolve, reject) {
    	        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
    	        if (dbInfo.db) {
    	            if (upgradeNeeded) {
    	                _deferReadiness(dbInfo);
    	                dbInfo.db.close();
    	            } else {
    	                return resolve(dbInfo.db);
    	            }
    	        }
    	        var dbArgs = [dbInfo.name];
    	        if (upgradeNeeded) {
    	            dbArgs.push(dbInfo.version);
    	        }
    	        var openreq = idb.open.apply(idb, dbArgs);
    	        if (upgradeNeeded) {
    	            openreq.onupgradeneeded = function (e) {
    	                var db = openreq.result;
    	                try {
    	                    db.createObjectStore(dbInfo.storeName);
    	                    if (e.oldVersion <= 1) {
    	                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
    	                    }
    	                } catch (ex) {
    	                    if (ex.name === 'ConstraintError') {
    	                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
    	                    } else {
    	                        throw ex;
    	                    }
    	                }
    	            };
    	        }
    	        openreq.onerror = function (e) {
    	            e.preventDefault();
    	            reject(openreq.error);
    	        };
    	        openreq.onsuccess = function () {
    	            var db = openreq.result;
    	            db.onversionchange = function (e) {
    	                e.target.close();
    	            };
    	            resolve(db);
    	            _advanceReadiness(dbInfo);
    	        };
    	    });
    	}
    	function _getOriginalConnection(dbInfo) {
    	    return _getConnection(dbInfo, false);
    	}
    	function _getUpgradedConnection(dbInfo) {
    	    return _getConnection(dbInfo, true);
    	}
    	function _isUpgradeNeeded(dbInfo, defaultVersion) {
    	    if (!dbInfo.db) {
    	        return true;
    	    }
    	    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    	    var isDowngrade = dbInfo.version < dbInfo.db.version;
    	    var isUpgrade = dbInfo.version > dbInfo.db.version;
    	    if (isDowngrade) {
    	        if (dbInfo.version !== defaultVersion) {
    	            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
    	        }
    	        dbInfo.version = dbInfo.db.version;
    	    }
    	    if (isUpgrade || isNewStore) {
    	        if (isNewStore) {
    	            var incVersion = dbInfo.db.version + 1;
    	            if (incVersion > dbInfo.version) {
    	                dbInfo.version = incVersion;
    	            }
    	        }
    	        return true;
    	    }
    	    return false;
    	}
    	function _encodeBlob(blob) {
    	    return new Promise$1(function (resolve, reject) {
    	        var reader = new FileReader();
    	        reader.onerror = reject;
    	        reader.onloadend = function (e) {
    	            var base64 = btoa(e.target.result || '');
    	            resolve({
    	                __local_forage_encoded_blob: true,
    	                data: base64,
    	                type: blob.type
    	            });
    	        };
    	        reader.readAsBinaryString(blob);
    	    });
    	}
    	function _decodeBlob(encodedBlob) {
    	    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    	    return createBlob([arrayBuff], { type: encodedBlob.type });
    	}
    	function _isEncodedBlob(value) {
    	    return value && value.__local_forage_encoded_blob;
    	}
    	function _fullyReady(callback) {
    	    var self = this;
    	    var promise = self._initReady().then(function () {
    	        var dbContext = dbContexts[self._dbInfo.name];
    	        if (dbContext && dbContext.dbReady) {
    	            return dbContext.dbReady;
    	        }
    	    });
    	    executeTwoCallbacks(promise, callback, callback);
    	    return promise;
    	}
    	function _tryReconnect(dbInfo) {
    	    _deferReadiness(dbInfo);
    	    var dbContext = dbContexts[dbInfo.name];
    	    var forages = dbContext.forages;
    	    for (var i = 0; i < forages.length; i++) {
    	        var forage = forages[i];
    	        if (forage._dbInfo.db) {
    	            forage._dbInfo.db.close();
    	            forage._dbInfo.db = null;
    	        }
    	    }
    	    dbInfo.db = null;
    	    return _getOriginalConnection(dbInfo).then(function (db) {
    	        dbInfo.db = db;
    	        if (_isUpgradeNeeded(dbInfo)) {
    	            return _getUpgradedConnection(dbInfo);
    	        }
    	        return db;
    	    }).then(function (db) {
    	        dbInfo.db = dbContext.db = db;
    	        for (var i = 0; i < forages.length; i++) {
    	            forages[i]._dbInfo.db = db;
    	        }
    	    })["catch"](function (err) {
    	        _rejectReadiness(dbInfo, err);
    	        throw err;
    	    });
    	}
    	function createTransaction(dbInfo, mode, callback, retries) {
    	    if (retries === undefined) {
    	        retries = 1;
    	    }
    	    try {
    	        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
    	        callback(null, tx);
    	    } catch (err) {
    	        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
    	            return Promise$1.resolve().then(function () {
    	                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
    	                    if (dbInfo.db) {
    	                        dbInfo.version = dbInfo.db.version + 1;
    	                    }
    	                    return _getUpgradedConnection(dbInfo);
    	                }
    	            }).then(function () {
    	                return _tryReconnect(dbInfo).then(function () {
    	                    createTransaction(dbInfo, mode, callback, retries - 1);
    	                });
    	            })["catch"](callback);
    	        }
    	        callback(err);
    	    }
    	}
    	function createDbContext() {
    	    return {
    	        forages: [],
    	        db: null,
    	        dbReady: null,
    	        deferredOperations: []
    	    };
    	}
    	function _initStorage(options) {
    	    var self = this;
    	    var dbInfo = {
    	        db: null
    	    };
    	    if (options) {
    	        for (var i in options) {
    	            dbInfo[i] = options[i];
    	        }
    	    }
    	    var dbContext = dbContexts[dbInfo.name];
    	    if (!dbContext) {
    	        dbContext = createDbContext();
    	        dbContexts[dbInfo.name] = dbContext;
    	    }
    	    dbContext.forages.push(self);
    	    if (!self._initReady) {
    	        self._initReady = self.ready;
    	        self.ready = _fullyReady;
    	    }
    	    var initPromises = [];
    	    function ignoreErrors() {
    	        return Promise$1.resolve();
    	    }
    	    for (var j = 0; j < dbContext.forages.length; j++) {
    	        var forage = dbContext.forages[j];
    	        if (forage !== self) {
    	            initPromises.push(forage._initReady()["catch"](ignoreErrors));
    	        }
    	    }
    	    var forages = dbContext.forages.slice(0);
    	    return Promise$1.all(initPromises).then(function () {
    	        dbInfo.db = dbContext.db;
    	        return _getOriginalConnection(dbInfo);
    	    }).then(function (db) {
    	        dbInfo.db = db;
    	        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
    	            return _getUpgradedConnection(dbInfo);
    	        }
    	        return db;
    	    }).then(function (db) {
    	        dbInfo.db = dbContext.db = db;
    	        self._dbInfo = dbInfo;
    	        for (var k = 0; k < forages.length; k++) {
    	            var forage = forages[k];
    	            if (forage !== self) {
    	                forage._dbInfo.db = dbInfo.db;
    	                forage._dbInfo.version = dbInfo.version;
    	            }
    	        }
    	    });
    	}
    	function getItem(key, callback) {
    	    var self = this;
    	    key = normalizeKey(key);
    	    var promise = new Promise$1(function (resolve, reject) {
    	        self.ready().then(function () {
    	            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
    	                if (err) {
    	                    return reject(err);
    	                }
    	                try {
    	                    var store = transaction.objectStore(self._dbInfo.storeName);
    	                    var req = store.get(key);
    	                    req.onsuccess = function () {
    	                        var value = req.result;
    	                        if (value === undefined) {
    	                            value = null;
    	                        }
    	                        if (_isEncodedBlob(value)) {
    	                            value = _decodeBlob(value);
    	                        }
    	                        resolve(value);
    	                    };
    	                    req.onerror = function () {
    	                        reject(req.error);
    	                    };
    	                } catch (e) {
    	                    reject(e);
    	                }
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function iterate(iterator, callback) {
    	    var self = this;
    	    var promise = new Promise$1(function (resolve, reject) {
    	        self.ready().then(function () {
    	            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
    	                if (err) {
    	                    return reject(err);
    	                }
    	                try {
    	                    var store = transaction.objectStore(self._dbInfo.storeName);
    	                    var req = store.openCursor();
    	                    var iterationNumber = 1;
    	                    req.onsuccess = function () {
    	                        var cursor = req.result;
    	                        if (cursor) {
    	                            var value = cursor.value;
    	                            if (_isEncodedBlob(value)) {
    	                                value = _decodeBlob(value);
    	                            }
    	                            var result = iterator(value, cursor.key, iterationNumber++);
    	                            if (result !== void 0) {
    	                                resolve(result);
    	                            } else {
    	                                cursor["continue"]();
    	                            }
    	                        } else {
    	                            resolve();
    	                        }
    	                    };
    	                    req.onerror = function () {
    	                        reject(req.error);
    	                    };
    	                } catch (e) {
    	                    reject(e);
    	                }
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function setItem(key, value, callback) {
    	    var self = this;
    	    key = normalizeKey(key);
    	    var promise = new Promise$1(function (resolve, reject) {
    	        var dbInfo;
    	        self.ready().then(function () {
    	            dbInfo = self._dbInfo;
    	            if (toString.call(value) === '[object Blob]') {
    	                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
    	                    if (blobSupport) {
    	                        return value;
    	                    }
    	                    return _encodeBlob(value);
    	                });
    	            }
    	            return value;
    	        }).then(function (value) {
    	            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
    	                if (err) {
    	                    return reject(err);
    	                }
    	                try {
    	                    var store = transaction.objectStore(self._dbInfo.storeName);
    	                    if (value === null) {
    	                        value = undefined;
    	                    }
    	                    var req = store.put(value, key);
    	                    transaction.oncomplete = function () {
    	                        if (value === undefined) {
    	                            value = null;
    	                        }
    	                        resolve(value);
    	                    };
    	                    transaction.onabort = transaction.onerror = function () {
    	                        var err = req.error ? req.error : req.transaction.error;
    	                        reject(err);
    	                    };
    	                } catch (e) {
    	                    reject(e);
    	                }
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function removeItem(key, callback) {
    	    var self = this;
    	    key = normalizeKey(key);
    	    var promise = new Promise$1(function (resolve, reject) {
    	        self.ready().then(function () {
    	            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
    	                if (err) {
    	                    return reject(err);
    	                }
    	                try {
    	                    var store = transaction.objectStore(self._dbInfo.storeName);
    	                    var req = store["delete"](key);
    	                    transaction.oncomplete = function () {
    	                        resolve();
    	                    };
    	                    transaction.onerror = function () {
    	                        reject(req.error);
    	                    };
    	                    transaction.onabort = function () {
    	                        var err = req.error ? req.error : req.transaction.error;
    	                        reject(err);
    	                    };
    	                } catch (e) {
    	                    reject(e);
    	                }
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function clear(callback) {
    	    var self = this;
    	    var promise = new Promise$1(function (resolve, reject) {
    	        self.ready().then(function () {
    	            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
    	                if (err) {
    	                    return reject(err);
    	                }
    	                try {
    	                    var store = transaction.objectStore(self._dbInfo.storeName);
    	                    var req = store.clear();
    	                    transaction.oncomplete = function () {
    	                        resolve();
    	                    };
    	                    transaction.onabort = transaction.onerror = function () {
    	                        var err = req.error ? req.error : req.transaction.error;
    	                        reject(err);
    	                    };
    	                } catch (e) {
    	                    reject(e);
    	                }
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function length(callback) {
    	    var self = this;
    	    var promise = new Promise$1(function (resolve, reject) {
    	        self.ready().then(function () {
    	            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
    	                if (err) {
    	                    return reject(err);
    	                }
    	                try {
    	                    var store = transaction.objectStore(self._dbInfo.storeName);
    	                    var req = store.count();
    	                    req.onsuccess = function () {
    	                        resolve(req.result);
    	                    };
    	                    req.onerror = function () {
    	                        reject(req.error);
    	                    };
    	                } catch (e) {
    	                    reject(e);
    	                }
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function key(n, callback) {
    	    var self = this;
    	    var promise = new Promise$1(function (resolve, reject) {
    	        if (n < 0) {
    	            resolve(null);
    	            return;
    	        }
    	        self.ready().then(function () {
    	            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
    	                if (err) {
    	                    return reject(err);
    	                }
    	                try {
    	                    var store = transaction.objectStore(self._dbInfo.storeName);
    	                    var advanced = false;
    	                    var req = store.openKeyCursor();
    	                    req.onsuccess = function () {
    	                        var cursor = req.result;
    	                        if (!cursor) {
    	                            resolve(null);
    	                            return;
    	                        }
    	                        if (n === 0) {
    	                            resolve(cursor.key);
    	                        } else {
    	                            if (!advanced) {
    	                                advanced = true;
    	                                cursor.advance(n);
    	                            } else {
    	                                resolve(cursor.key);
    	                            }
    	                        }
    	                    };
    	                    req.onerror = function () {
    	                        reject(req.error);
    	                    };
    	                } catch (e) {
    	                    reject(e);
    	                }
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function keys(callback) {
    	    var self = this;
    	    var promise = new Promise$1(function (resolve, reject) {
    	        self.ready().then(function () {
    	            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
    	                if (err) {
    	                    return reject(err);
    	                }
    	                try {
    	                    var store = transaction.objectStore(self._dbInfo.storeName);
    	                    var req = store.openKeyCursor();
    	                    var keys = [];
    	                    req.onsuccess = function () {
    	                        var cursor = req.result;
    	                        if (!cursor) {
    	                            resolve(keys);
    	                            return;
    	                        }
    	                        keys.push(cursor.key);
    	                        cursor["continue"]();
    	                    };
    	                    req.onerror = function () {
    	                        reject(req.error);
    	                    };
    	                } catch (e) {
    	                    reject(e);
    	                }
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function dropInstance(options, callback) {
    	    callback = getCallback.apply(this, arguments);
    	    var currentConfig = this.config();
    	    options = typeof options !== 'function' && options || {};
    	    if (!options.name) {
    	        options.name = options.name || currentConfig.name;
    	        options.storeName = options.storeName || currentConfig.storeName;
    	    }
    	    var self = this;
    	    var promise;
    	    if (!options.name) {
    	        promise = Promise$1.reject('Invalid arguments');
    	    } else {
    	        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;
    	        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
    	            var dbContext = dbContexts[options.name];
    	            var forages = dbContext.forages;
    	            dbContext.db = db;
    	            for (var i = 0; i < forages.length; i++) {
    	                forages[i]._dbInfo.db = db;
    	            }
    	            return db;
    	        });
    	        if (!options.storeName) {
    	            promise = dbPromise.then(function (db) {
    	                _deferReadiness(options);
    	                var dbContext = dbContexts[options.name];
    	                var forages = dbContext.forages;
    	                db.close();
    	                for (var i = 0; i < forages.length; i++) {
    	                    var forage = forages[i];
    	                    forage._dbInfo.db = null;
    	                }
    	                var dropDBPromise = new Promise$1(function (resolve, reject) {
    	                    var req = idb.deleteDatabase(options.name);
    	                    req.onerror = function () {
    	                        var db = req.result;
    	                        if (db) {
    	                            db.close();
    	                        }
    	                        reject(req.error);
    	                    };
    	                    req.onblocked = function () {
    	                        console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
    	                    };
    	                    req.onsuccess = function () {
    	                        var db = req.result;
    	                        if (db) {
    	                            db.close();
    	                        }
    	                        resolve(db);
    	                    };
    	                });
    	                return dropDBPromise.then(function (db) {
    	                    dbContext.db = db;
    	                    for (var i = 0; i < forages.length; i++) {
    	                        var _forage = forages[i];
    	                        _advanceReadiness(_forage._dbInfo);
    	                    }
    	                })["catch"](function (err) {
    	                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
    	                    throw err;
    	                });
    	            });
    	        } else {
    	            promise = dbPromise.then(function (db) {
    	                if (!db.objectStoreNames.contains(options.storeName)) {
    	                    return;
    	                }
    	                var newVersion = db.version + 1;
    	                _deferReadiness(options);
    	                var dbContext = dbContexts[options.name];
    	                var forages = dbContext.forages;
    	                db.close();
    	                for (var i = 0; i < forages.length; i++) {
    	                    var forage = forages[i];
    	                    forage._dbInfo.db = null;
    	                    forage._dbInfo.version = newVersion;
    	                }
    	                var dropObjectPromise = new Promise$1(function (resolve, reject) {
    	                    var req = idb.open(options.name, newVersion);
    	                    req.onerror = function (err) {
    	                        var db = req.result;
    	                        db.close();
    	                        reject(err);
    	                    };
    	                    req.onupgradeneeded = function () {
    	                        var db = req.result;
    	                        db.deleteObjectStore(options.storeName);
    	                    };
    	                    req.onsuccess = function () {
    	                        var db = req.result;
    	                        db.close();
    	                        resolve(db);
    	                    };
    	                });
    	                return dropObjectPromise.then(function (db) {
    	                    dbContext.db = db;
    	                    for (var j = 0; j < forages.length; j++) {
    	                        var _forage2 = forages[j];
    	                        _forage2._dbInfo.db = db;
    	                        _advanceReadiness(_forage2._dbInfo);
    	                    }
    	                })["catch"](function (err) {
    	                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
    	                    throw err;
    	                });
    	            });
    	        }
    	    }
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	var asyncStorage = {
    	    _driver: 'asyncStorage',
    	    _initStorage: _initStorage,
    	    _support: isIndexedDBValid(),
    	    iterate: iterate,
    	    getItem: getItem,
    	    setItem: setItem,
    	    removeItem: removeItem,
    	    clear: clear,
    	    length: length,
    	    key: key,
    	    keys: keys,
    	    dropInstance: dropInstance
    	};
    	function isWebSQLValid() {
    	    return typeof openDatabase === 'function';
    	}
    	var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    	var BLOB_TYPE_PREFIX = '~~local_forage_type~';
    	var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
    	var SERIALIZED_MARKER = '__lfsc__:';
    	var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
    	var TYPE_ARRAYBUFFER = 'arbf';
    	var TYPE_BLOB = 'blob';
    	var TYPE_INT8ARRAY = 'si08';
    	var TYPE_UINT8ARRAY = 'ui08';
    	var TYPE_UINT8CLAMPEDARRAY = 'uic8';
    	var TYPE_INT16ARRAY = 'si16';
    	var TYPE_INT32ARRAY = 'si32';
    	var TYPE_UINT16ARRAY = 'ur16';
    	var TYPE_UINT32ARRAY = 'ui32';
    	var TYPE_FLOAT32ARRAY = 'fl32';
    	var TYPE_FLOAT64ARRAY = 'fl64';
    	var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
    	var toString$1 = Object.prototype.toString;
    	function stringToBuffer(serializedString) {
    	    var bufferLength = serializedString.length * 0.75;
    	    var len = serializedString.length;
    	    var i;
    	    var p = 0;
    	    var encoded1, encoded2, encoded3, encoded4;
    	    if (serializedString[serializedString.length - 1] === '=') {
    	        bufferLength--;
    	        if (serializedString[serializedString.length - 2] === '=') {
    	            bufferLength--;
    	        }
    	    }
    	    var buffer = new ArrayBuffer(bufferLength);
    	    var bytes = new Uint8Array(buffer);
    	    for (i = 0; i < len; i += 4) {
    	        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
    	        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
    	        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
    	        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
    	        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    	        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    	        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    	    }
    	    return buffer;
    	}
    	function bufferToString(buffer) {
    	    var bytes = new Uint8Array(buffer);
    	    var base64String = '';
    	    var i;
    	    for (i = 0; i < bytes.length; i += 3) {
    	        base64String += BASE_CHARS[bytes[i] >> 2];
    	        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
    	        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
    	        base64String += BASE_CHARS[bytes[i + 2] & 63];
    	    }
    	    if (bytes.length % 3 === 2) {
    	        base64String = base64String.substring(0, base64String.length - 1) + '=';
    	    } else if (bytes.length % 3 === 1) {
    	        base64String = base64String.substring(0, base64String.length - 2) + '==';
    	    }
    	    return base64String;
    	}
    	function serialize(value, callback) {
    	    var valueType = '';
    	    if (value) {
    	        valueType = toString$1.call(value);
    	    }
    	    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
    	        var buffer;
    	        var marker = SERIALIZED_MARKER;
    	        if (value instanceof ArrayBuffer) {
    	            buffer = value;
    	            marker += TYPE_ARRAYBUFFER;
    	        } else {
    	            buffer = value.buffer;
    	            if (valueType === '[object Int8Array]') {
    	                marker += TYPE_INT8ARRAY;
    	            } else if (valueType === '[object Uint8Array]') {
    	                marker += TYPE_UINT8ARRAY;
    	            } else if (valueType === '[object Uint8ClampedArray]') {
    	                marker += TYPE_UINT8CLAMPEDARRAY;
    	            } else if (valueType === '[object Int16Array]') {
    	                marker += TYPE_INT16ARRAY;
    	            } else if (valueType === '[object Uint16Array]') {
    	                marker += TYPE_UINT16ARRAY;
    	            } else if (valueType === '[object Int32Array]') {
    	                marker += TYPE_INT32ARRAY;
    	            } else if (valueType === '[object Uint32Array]') {
    	                marker += TYPE_UINT32ARRAY;
    	            } else if (valueType === '[object Float32Array]') {
    	                marker += TYPE_FLOAT32ARRAY;
    	            } else if (valueType === '[object Float64Array]') {
    	                marker += TYPE_FLOAT64ARRAY;
    	            } else {
    	                callback(new Error('Failed to get type for BinaryArray'));
    	            }
    	        }
    	        callback(marker + bufferToString(buffer));
    	    } else if (valueType === '[object Blob]') {
    	        var fileReader = new FileReader();
    	        fileReader.onload = function () {
    	            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);
    	            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
    	        };
    	        fileReader.readAsArrayBuffer(value);
    	    } else {
    	        try {
    	            callback(JSON.stringify(value));
    	        } catch (e) {
    	            console.error("Couldn't convert value into a JSON string: ", value);
    	            callback(null, e);
    	        }
    	    }
    	}
    	function deserialize(value) {
    	    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
    	        return JSON.parse(value);
    	    }
    	    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    	    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
    	    var blobType;
    	    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
    	        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
    	        blobType = matcher[1];
    	        serializedString = serializedString.substring(matcher[0].length);
    	    }
    	    var buffer = stringToBuffer(serializedString);
    	    switch (type) {
    	        case TYPE_ARRAYBUFFER:
    	            return buffer;
    	        case TYPE_BLOB:
    	            return createBlob([buffer], { type: blobType });
    	        case TYPE_INT8ARRAY:
    	            return new Int8Array(buffer);
    	        case TYPE_UINT8ARRAY:
    	            return new Uint8Array(buffer);
    	        case TYPE_UINT8CLAMPEDARRAY:
    	            return new Uint8ClampedArray(buffer);
    	        case TYPE_INT16ARRAY:
    	            return new Int16Array(buffer);
    	        case TYPE_UINT16ARRAY:
    	            return new Uint16Array(buffer);
    	        case TYPE_INT32ARRAY:
    	            return new Int32Array(buffer);
    	        case TYPE_UINT32ARRAY:
    	            return new Uint32Array(buffer);
    	        case TYPE_FLOAT32ARRAY:
    	            return new Float32Array(buffer);
    	        case TYPE_FLOAT64ARRAY:
    	            return new Float64Array(buffer);
    	        default:
    	            throw new Error('Unkown type: ' + type);
    	    }
    	}
    	var localforageSerializer = {
    	    serialize: serialize,
    	    deserialize: deserialize,
    	    stringToBuffer: stringToBuffer,
    	    bufferToString: bufferToString
    	};
    	function createDbTable(t, dbInfo, callback, errorCallback) {
    	    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
    	}
    	function _initStorage$1(options) {
    	    var self = this;
    	    var dbInfo = {
    	        db: null
    	    };
    	    if (options) {
    	        for (var i in options) {
    	            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
    	        }
    	    }
    	    var dbInfoPromise = new Promise$1(function (resolve, reject) {
    	        try {
    	            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
    	        } catch (e) {
    	            return reject(e);
    	        }
    	        dbInfo.db.transaction(function (t) {
    	            createDbTable(t, dbInfo, function () {
    	                self._dbInfo = dbInfo;
    	                resolve();
    	            }, function (t, error) {
    	                reject(error);
    	            });
    	        }, reject);
    	    });
    	    dbInfo.serializer = localforageSerializer;
    	    return dbInfoPromise;
    	}
    	function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
    	    t.executeSql(sqlStatement, args, callback, function (t, error) {
    	        if (error.code === error.SYNTAX_ERR) {
    	            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
    	                if (!results.rows.length) {
    	                    createDbTable(t, dbInfo, function () {
    	                        t.executeSql(sqlStatement, args, callback, errorCallback);
    	                    }, errorCallback);
    	                } else {
    	                    errorCallback(t, error);
    	                }
    	            }, errorCallback);
    	        } else {
    	            errorCallback(t, error);
    	        }
    	    }, errorCallback);
    	}
    	function getItem$1(key, callback) {
    	    var self = this;
    	    key = normalizeKey(key);
    	    var promise = new Promise$1(function (resolve, reject) {
    	        self.ready().then(function () {
    	            var dbInfo = self._dbInfo;
    	            dbInfo.db.transaction(function (t) {
    	                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
    	                    var result = results.rows.length ? results.rows.item(0).value : null;
    	                    if (result) {
    	                        result = dbInfo.serializer.deserialize(result);
    	                    }
    	                    resolve(result);
    	                }, function (t, error) {
    	                    reject(error);
    	                });
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function iterate$1(iterator, callback) {
    	    var self = this;
    	    var promise = new Promise$1(function (resolve, reject) {
    	        self.ready().then(function () {
    	            var dbInfo = self._dbInfo;
    	            dbInfo.db.transaction(function (t) {
    	                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
    	                    var rows = results.rows;
    	                    var length = rows.length;
    	                    for (var i = 0; i < length; i++) {
    	                        var item = rows.item(i);
    	                        var result = item.value;
    	                        if (result) {
    	                            result = dbInfo.serializer.deserialize(result);
    	                        }
    	                        result = iterator(result, item.key, i + 1);
    	                        if (result !== void 0) {
    	                            resolve(result);
    	                            return;
    	                        }
    	                    }
    	                    resolve();
    	                }, function (t, error) {
    	                    reject(error);
    	                });
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function _setItem(key, value, callback, retriesLeft) {
    	    var self = this;
    	    key = normalizeKey(key);
    	    var promise = new Promise$1(function (resolve, reject) {
    	        self.ready().then(function () {
    	            if (value === undefined) {
    	                value = null;
    	            }
    	            var originalValue = value;
    	            var dbInfo = self._dbInfo;
    	            dbInfo.serializer.serialize(value, function (value, error) {
    	                if (error) {
    	                    reject(error);
    	                } else {
    	                    dbInfo.db.transaction(function (t) {
    	                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
    	                            resolve(originalValue);
    	                        }, function (t, error) {
    	                            reject(error);
    	                        });
    	                    }, function (sqlError) {
    	                        if (sqlError.code === sqlError.QUOTA_ERR) {
    	                            if (retriesLeft > 0) {
    	                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
    	                                return;
    	                            }
    	                            reject(sqlError);
    	                        }
    	                    });
    	                }
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function setItem$1(key, value, callback) {
    	    return _setItem.apply(this, [key, value, callback, 1]);
    	}
    	function removeItem$1(key, callback) {
    	    var self = this;
    	    key = normalizeKey(key);
    	    var promise = new Promise$1(function (resolve, reject) {
    	        self.ready().then(function () {
    	            var dbInfo = self._dbInfo;
    	            dbInfo.db.transaction(function (t) {
    	                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
    	                    resolve();
    	                }, function (t, error) {
    	                    reject(error);
    	                });
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function clear$1(callback) {
    	    var self = this;
    	    var promise = new Promise$1(function (resolve, reject) {
    	        self.ready().then(function () {
    	            var dbInfo = self._dbInfo;
    	            dbInfo.db.transaction(function (t) {
    	                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
    	                    resolve();
    	                }, function (t, error) {
    	                    reject(error);
    	                });
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function length$1(callback) {
    	    var self = this;
    	    var promise = new Promise$1(function (resolve, reject) {
    	        self.ready().then(function () {
    	            var dbInfo = self._dbInfo;
    	            dbInfo.db.transaction(function (t) {
    	                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
    	                    var result = results.rows.item(0).c;
    	                    resolve(result);
    	                }, function (t, error) {
    	                    reject(error);
    	                });
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function key$1(n, callback) {
    	    var self = this;
    	    var promise = new Promise$1(function (resolve, reject) {
    	        self.ready().then(function () {
    	            var dbInfo = self._dbInfo;
    	            dbInfo.db.transaction(function (t) {
    	                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
    	                    var result = results.rows.length ? results.rows.item(0).key : null;
    	                    resolve(result);
    	                }, function (t, error) {
    	                    reject(error);
    	                });
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function keys$1(callback) {
    	    var self = this;
    	    var promise = new Promise$1(function (resolve, reject) {
    	        self.ready().then(function () {
    	            var dbInfo = self._dbInfo;
    	            dbInfo.db.transaction(function (t) {
    	                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
    	                    var keys = [];
    	                    for (var i = 0; i < results.rows.length; i++) {
    	                        keys.push(results.rows.item(i).key);
    	                    }
    	                    resolve(keys);
    	                }, function (t, error) {
    	                    reject(error);
    	                });
    	            });
    	        })["catch"](reject);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function getAllStoreNames(db) {
    	    return new Promise$1(function (resolve, reject) {
    	        db.transaction(function (t) {
    	            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
    	                var storeNames = [];
    	                for (var i = 0; i < results.rows.length; i++) {
    	                    storeNames.push(results.rows.item(i).name);
    	                }
    	                resolve({
    	                    db: db,
    	                    storeNames: storeNames
    	                });
    	            }, function (t, error) {
    	                reject(error);
    	            });
    	        }, function (sqlError) {
    	            reject(sqlError);
    	        });
    	    });
    	}
    	function dropInstance$1(options, callback) {
    	    callback = getCallback.apply(this, arguments);
    	    var currentConfig = this.config();
    	    options = typeof options !== 'function' && options || {};
    	    if (!options.name) {
    	        options.name = options.name || currentConfig.name;
    	        options.storeName = options.storeName || currentConfig.storeName;
    	    }
    	    var self = this;
    	    var promise;
    	    if (!options.name) {
    	        promise = Promise$1.reject('Invalid arguments');
    	    } else {
    	        promise = new Promise$1(function (resolve) {
    	            var db;
    	            if (options.name === currentConfig.name) {
    	                db = self._dbInfo.db;
    	            } else {
    	                db = openDatabase(options.name, '', '', 0);
    	            }
    	            if (!options.storeName) {
    	                resolve(getAllStoreNames(db));
    	            } else {
    	                resolve({
    	                    db: db,
    	                    storeNames: [options.storeName]
    	                });
    	            }
    	        }).then(function (operationInfo) {
    	            return new Promise$1(function (resolve, reject) {
    	                operationInfo.db.transaction(function (t) {
    	                    function dropTable(storeName) {
    	                        return new Promise$1(function (resolve, reject) {
    	                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
    	                                resolve();
    	                            }, function (t, error) {
    	                                reject(error);
    	                            });
    	                        });
    	                    }
    	                    var operations = [];
    	                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
    	                        operations.push(dropTable(operationInfo.storeNames[i]));
    	                    }
    	                    Promise$1.all(operations).then(function () {
    	                        resolve();
    	                    })["catch"](function (e) {
    	                        reject(e);
    	                    });
    	                }, function (sqlError) {
    	                    reject(sqlError);
    	                });
    	            });
    	        });
    	    }
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	var webSQLStorage = {
    	    _driver: 'webSQLStorage',
    	    _initStorage: _initStorage$1,
    	    _support: isWebSQLValid(),
    	    iterate: iterate$1,
    	    getItem: getItem$1,
    	    setItem: setItem$1,
    	    removeItem: removeItem$1,
    	    clear: clear$1,
    	    length: length$1,
    	    key: key$1,
    	    keys: keys$1,
    	    dropInstance: dropInstance$1
    	};
    	function isLocalStorageValid() {
    	    try {
    	        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
    	        !!localStorage.setItem;
    	    } catch (e) {
    	        return false;
    	    }
    	}
    	function _getKeyPrefix(options, defaultConfig) {
    	    var keyPrefix = options.name + '/';
    	    if (options.storeName !== defaultConfig.storeName) {
    	        keyPrefix += options.storeName + '/';
    	    }
    	    return keyPrefix;
    	}
    	function checkIfLocalStorageThrows() {
    	    var localStorageTestKey = '_localforage_support_test';
    	    try {
    	        localStorage.setItem(localStorageTestKey, true);
    	        localStorage.removeItem(localStorageTestKey);
    	        return false;
    	    } catch (e) {
    	        return true;
    	    }
    	}
    	function _isLocalStorageUsable() {
    	    return !checkIfLocalStorageThrows() || localStorage.length > 0;
    	}
    	function _initStorage$2(options) {
    	    var self = this;
    	    var dbInfo = {};
    	    if (options) {
    	        for (var i in options) {
    	            dbInfo[i] = options[i];
    	        }
    	    }
    	    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);
    	    if (!_isLocalStorageUsable()) {
    	        return Promise$1.reject();
    	    }
    	    self._dbInfo = dbInfo;
    	    dbInfo.serializer = localforageSerializer;
    	    return Promise$1.resolve();
    	}
    	function clear$2(callback) {
    	    var self = this;
    	    var promise = self.ready().then(function () {
    	        var keyPrefix = self._dbInfo.keyPrefix;
    	        for (var i = localStorage.length - 1; i >= 0; i--) {
    	            var key = localStorage.key(i);
    	            if (key.indexOf(keyPrefix) === 0) {
    	                localStorage.removeItem(key);
    	            }
    	        }
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function getItem$2(key, callback) {
    	    var self = this;
    	    key = normalizeKey(key);
    	    var promise = self.ready().then(function () {
    	        var dbInfo = self._dbInfo;
    	        var result = localStorage.getItem(dbInfo.keyPrefix + key);
    	        if (result) {
    	            result = dbInfo.serializer.deserialize(result);
    	        }
    	        return result;
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function iterate$2(iterator, callback) {
    	    var self = this;
    	    var promise = self.ready().then(function () {
    	        var dbInfo = self._dbInfo;
    	        var keyPrefix = dbInfo.keyPrefix;
    	        var keyPrefixLength = keyPrefix.length;
    	        var length = localStorage.length;
    	        var iterationNumber = 1;
    	        for (var i = 0; i < length; i++) {
    	            var key = localStorage.key(i);
    	            if (key.indexOf(keyPrefix) !== 0) {
    	                continue;
    	            }
    	            var value = localStorage.getItem(key);
    	            if (value) {
    	                value = dbInfo.serializer.deserialize(value);
    	            }
    	            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);
    	            if (value !== void 0) {
    	                return value;
    	            }
    	        }
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function key$2(n, callback) {
    	    var self = this;
    	    var promise = self.ready().then(function () {
    	        var dbInfo = self._dbInfo;
    	        var result;
    	        try {
    	            result = localStorage.key(n);
    	        } catch (error) {
    	            result = null;
    	        }
    	        if (result) {
    	            result = result.substring(dbInfo.keyPrefix.length);
    	        }
    	        return result;
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function keys$2(callback) {
    	    var self = this;
    	    var promise = self.ready().then(function () {
    	        var dbInfo = self._dbInfo;
    	        var length = localStorage.length;
    	        var keys = [];
    	        for (var i = 0; i < length; i++) {
    	            var itemKey = localStorage.key(i);
    	            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
    	                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
    	            }
    	        }
    	        return keys;
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function length$2(callback) {
    	    var self = this;
    	    var promise = self.keys().then(function (keys) {
    	        return keys.length;
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function removeItem$2(key, callback) {
    	    var self = this;
    	    key = normalizeKey(key);
    	    var promise = self.ready().then(function () {
    	        var dbInfo = self._dbInfo;
    	        localStorage.removeItem(dbInfo.keyPrefix + key);
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function setItem$2(key, value, callback) {
    	    var self = this;
    	    key = normalizeKey(key);
    	    var promise = self.ready().then(function () {
    	        if (value === undefined) {
    	            value = null;
    	        }
    	        var originalValue = value;
    	        return new Promise$1(function (resolve, reject) {
    	            var dbInfo = self._dbInfo;
    	            dbInfo.serializer.serialize(value, function (value, error) {
    	                if (error) {
    	                    reject(error);
    	                } else {
    	                    try {
    	                        localStorage.setItem(dbInfo.keyPrefix + key, value);
    	                        resolve(originalValue);
    	                    } catch (e) {
    	                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
    	                            reject(e);
    	                        }
    	                        reject(e);
    	                    }
    	                }
    	            });
    	        });
    	    });
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	function dropInstance$2(options, callback) {
    	    callback = getCallback.apply(this, arguments);
    	    options = typeof options !== 'function' && options || {};
    	    if (!options.name) {
    	        var currentConfig = this.config();
    	        options.name = options.name || currentConfig.name;
    	        options.storeName = options.storeName || currentConfig.storeName;
    	    }
    	    var self = this;
    	    var promise;
    	    if (!options.name) {
    	        promise = Promise$1.reject('Invalid arguments');
    	    } else {
    	        promise = new Promise$1(function (resolve) {
    	            if (!options.storeName) {
    	                resolve(options.name + '/');
    	            } else {
    	                resolve(_getKeyPrefix(options, self._defaultConfig));
    	            }
    	        }).then(function (keyPrefix) {
    	            for (var i = localStorage.length - 1; i >= 0; i--) {
    	                var key = localStorage.key(i);
    	                if (key.indexOf(keyPrefix) === 0) {
    	                    localStorage.removeItem(key);
    	                }
    	            }
    	        });
    	    }
    	    executeCallback(promise, callback);
    	    return promise;
    	}
    	var localStorageWrapper = {
    	    _driver: 'localStorageWrapper',
    	    _initStorage: _initStorage$2,
    	    _support: isLocalStorageValid(),
    	    iterate: iterate$2,
    	    getItem: getItem$2,
    	    setItem: setItem$2,
    	    removeItem: removeItem$2,
    	    clear: clear$2,
    	    length: length$2,
    	    key: key$2,
    	    keys: keys$2,
    	    dropInstance: dropInstance$2
    	};
    	var sameValue = function sameValue(x, y) {
    	    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
    	};
    	var includes = function includes(array, searchElement) {
    	    var len = array.length;
    	    var i = 0;
    	    while (i < len) {
    	        if (sameValue(array[i], searchElement)) {
    	            return true;
    	        }
    	        i++;
    	    }
    	    return false;
    	};
    	var isArray = Array.isArray || function (arg) {
    	    return Object.prototype.toString.call(arg) === '[object Array]';
    	};
    	var DefinedDrivers = {};
    	var DriverSupport = {};
    	var DefaultDrivers = {
    	    INDEXEDDB: asyncStorage,
    	    WEBSQL: webSQLStorage,
    	    LOCALSTORAGE: localStorageWrapper
    	};
    	var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
    	var OptionalDriverMethods = ['dropInstance'];
    	var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);
    	var DefaultConfig = {
    	    description: '',
    	    driver: DefaultDriverOrder.slice(),
    	    name: 'localforage',
    	    size: 4980736,
    	    storeName: 'keyvaluepairs',
    	    version: 1.0
    	};
    	function callWhenReady(localForageInstance, libraryMethod) {
    	    localForageInstance[libraryMethod] = function () {
    	        var _args = arguments;
    	        return localForageInstance.ready().then(function () {
    	            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
    	        });
    	    };
    	}
    	function extend() {
    	    for (var i = 1; i < arguments.length; i++) {
    	        var arg = arguments[i];
    	        if (arg) {
    	            for (var _key in arg) {
    	                if (arg.hasOwnProperty(_key)) {
    	                    if (isArray(arg[_key])) {
    	                        arguments[0][_key] = arg[_key].slice();
    	                    } else {
    	                        arguments[0][_key] = arg[_key];
    	                    }
    	                }
    	            }
    	        }
    	    }
    	    return arguments[0];
    	}
    	var LocalForage = function () {
    	    function LocalForage(options) {
    	        _classCallCheck(this, LocalForage);
    	        for (var driverTypeKey in DefaultDrivers) {
    	            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
    	                var driver = DefaultDrivers[driverTypeKey];
    	                var driverName = driver._driver;
    	                this[driverTypeKey] = driverName;
    	                if (!DefinedDrivers[driverName]) {
    	                    this.defineDriver(driver);
    	                }
    	            }
    	        }
    	        this._defaultConfig = extend({}, DefaultConfig);
    	        this._config = extend({}, this._defaultConfig, options);
    	        this._driverSet = null;
    	        this._initDriver = null;
    	        this._ready = false;
    	        this._dbInfo = null;
    	        this._wrapLibraryMethodsWithReady();
    	        this.setDriver(this._config.driver)["catch"](function () {});
    	    }
    	    LocalForage.prototype.config = function config(options) {
    	        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    	            if (this._ready) {
    	                return new Error("Can't call config() after localforage " + 'has been used.');
    	            }
    	            for (var i in options) {
    	                if (i === 'storeName') {
    	                    options[i] = options[i].replace(/\W/g, '_');
    	                }
    	                if (i === 'version' && typeof options[i] !== 'number') {
    	                    return new Error('Database version must be a number.');
    	                }
    	                this._config[i] = options[i];
    	            }
    	            if ('driver' in options && options.driver) {
    	                return this.setDriver(this._config.driver);
    	            }
    	            return true;
    	        } else if (typeof options === 'string') {
    	            return this._config[options];
    	        } else {
    	            return this._config;
    	        }
    	    };
    	    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
    	        var promise = new Promise$1(function (resolve, reject) {
    	            try {
    	                var driverName = driverObject._driver;
    	                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');
    	                if (!driverObject._driver) {
    	                    reject(complianceError);
    	                    return;
    	                }
    	                var driverMethods = LibraryMethods.concat('_initStorage');
    	                for (var i = 0, len = driverMethods.length; i < len; i++) {
    	                    var driverMethodName = driverMethods[i];
    	                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
    	                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
    	                        reject(complianceError);
    	                        return;
    	                    }
    	                }
    	                var configureMissingMethods = function configureMissingMethods() {
    	                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
    	                        return function () {
    	                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
    	                            var promise = Promise$1.reject(error);
    	                            executeCallback(promise, arguments[arguments.length - 1]);
    	                            return promise;
    	                        };
    	                    };
    	                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
    	                        var optionalDriverMethod = OptionalDriverMethods[_i];
    	                        if (!driverObject[optionalDriverMethod]) {
    	                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
    	                        }
    	                    }
    	                };
    	                configureMissingMethods();
    	                var setDriverSupport = function setDriverSupport(support) {
    	                    if (DefinedDrivers[driverName]) {
    	                        console.info('Redefining LocalForage driver: ' + driverName);
    	                    }
    	                    DefinedDrivers[driverName] = driverObject;
    	                    DriverSupport[driverName] = support;
    	                    resolve();
    	                };
    	                if ('_support' in driverObject) {
    	                    if (driverObject._support && typeof driverObject._support === 'function') {
    	                        driverObject._support().then(setDriverSupport, reject);
    	                    } else {
    	                        setDriverSupport(!!driverObject._support);
    	                    }
    	                } else {
    	                    setDriverSupport(true);
    	                }
    	            } catch (e) {
    	                reject(e);
    	            }
    	        });
    	        executeTwoCallbacks(promise, callback, errorCallback);
    	        return promise;
    	    };
    	    LocalForage.prototype.driver = function driver() {
    	        return this._driver || null;
    	    };
    	    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
    	        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));
    	        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
    	        return getDriverPromise;
    	    };
    	    LocalForage.prototype.getSerializer = function getSerializer(callback) {
    	        var serializerPromise = Promise$1.resolve(localforageSerializer);
    	        executeTwoCallbacks(serializerPromise, callback);
    	        return serializerPromise;
    	    };
    	    LocalForage.prototype.ready = function ready(callback) {
    	        var self = this;
    	        var promise = self._driverSet.then(function () {
    	            if (self._ready === null) {
    	                self._ready = self._initDriver();
    	            }
    	            return self._ready;
    	        });
    	        executeTwoCallbacks(promise, callback, callback);
    	        return promise;
    	    };
    	    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
    	        var self = this;
    	        if (!isArray(drivers)) {
    	            drivers = [drivers];
    	        }
    	        var supportedDrivers = this._getSupportedDrivers(drivers);
    	        function setDriverToConfig() {
    	            self._config.driver = self.driver();
    	        }
    	        function extendSelfWithDriver(driver) {
    	            self._extend(driver);
    	            setDriverToConfig();
    	            self._ready = self._initStorage(self._config);
    	            return self._ready;
    	        }
    	        function initDriver(supportedDrivers) {
    	            return function () {
    	                var currentDriverIndex = 0;
    	                function driverPromiseLoop() {
    	                    while (currentDriverIndex < supportedDrivers.length) {
    	                        var driverName = supportedDrivers[currentDriverIndex];
    	                        currentDriverIndex++;
    	                        self._dbInfo = null;
    	                        self._ready = null;
    	                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
    	                    }
    	                    setDriverToConfig();
    	                    var error = new Error('No available storage method found.');
    	                    self._driverSet = Promise$1.reject(error);
    	                    return self._driverSet;
    	                }
    	                return driverPromiseLoop();
    	            };
    	        }
    	        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
    	            return Promise$1.resolve();
    	        }) : Promise$1.resolve();
    	        this._driverSet = oldDriverSetDone.then(function () {
    	            var driverName = supportedDrivers[0];
    	            self._dbInfo = null;
    	            self._ready = null;
    	            return self.getDriver(driverName).then(function (driver) {
    	                self._driver = driver._driver;
    	                setDriverToConfig();
    	                self._wrapLibraryMethodsWithReady();
    	                self._initDriver = initDriver(supportedDrivers);
    	            });
    	        })["catch"](function () {
    	            setDriverToConfig();
    	            var error = new Error('No available storage method found.');
    	            self._driverSet = Promise$1.reject(error);
    	            return self._driverSet;
    	        });
    	        executeTwoCallbacks(this._driverSet, callback, errorCallback);
    	        return this._driverSet;
    	    };
    	    LocalForage.prototype.supports = function supports(driverName) {
    	        return !!DriverSupport[driverName];
    	    };
    	    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
    	        extend(this, libraryMethodsAndProperties);
    	    };
    	    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
    	        var supportedDrivers = [];
    	        for (var i = 0, len = drivers.length; i < len; i++) {
    	            var driverName = drivers[i];
    	            if (this.supports(driverName)) {
    	                supportedDrivers.push(driverName);
    	            }
    	        }
    	        return supportedDrivers;
    	    };
    	    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
    	        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
    	            callWhenReady(this, LibraryMethods[i]);
    	        }
    	    };
    	    LocalForage.prototype.createInstance = function createInstance(options) {
    	        return new LocalForage(options);
    	    };
    	    return LocalForage;
    	}();
    	var localforage_js = new LocalForage();
    	module.exports = localforage_js;
    	},{"3":3}]},{},[4])(4)
    	});
    } (localforage));
    var localforageExports = localforage.exports;
    getDefaultExportFromCjs(localforageExports);

    class LocalForage {
        constructor(namespace, drivers = [
            localforageExports.INDEXEDDB,
            localforageExports.LOCALSTORAGE
        ]) {
            this.namespace = namespace;
            this.storage = localforageExports.createInstance({
                name: this.namespace,
                driver: drivers,
                storeName: 'glitch_db'
            });
        }
        async set(items) {
            const promises = Object.keys(items).map((key) => this.storage.setItem(key, items[key]));
            await Promise.all(promises);
        }
        async remove(key) {
            return await this.storage.removeItem(key);
        }
        async clear() {
            return await this.storage.clear();
        }
        async get(key) {
            const item = await this.storage.getItem(key);
            if (!item) {
                return {};
            }
            return {
                [key]: item
            };
        }
        async getWholeStorage() {
            const storeOb = {};
            return await this.storage
                .iterate((value, key) => {
                storeOb[key] = value;
            })
                .then(() => storeOb);
        }
    }
    const LocalForage$1 = LocalForage;

    class ForageStorage {
        constructor(namespace, options) {
            if (!options.storage) {
                options.storage = new LocalForage$1(namespace);
            }
            this.namespace = namespace;
            this.storage = options.storage;
        }
        async all(fn) {
            const allValues = await this.storage.getWholeStorage();
            const keyringValues = allValues?.keyring;
            if (keyringValues) {
                Object.keys(keyringValues).forEach((key) => {
                    fn && fn(key, keyringValues[key]);
                });
            }
        }
        async get(key) {
            const vals = await this.storage.get(this.namespace);
            if (vals[this.namespace] && vals[this.namespace][key]) {
                return vals[this.namespace][key];
            }
            return null;
        }
        async set(key, val) {
            let vals = await this.storage.get(this.namespace);
            vals = vals[this.namespace] ? vals[this.namespace] : {};
            vals[key] = val;
            await this.storage.set({
                [this.namespace]: vals
            });
        }
        async remove(key) {
            let vals = await this.storage.get(this.namespace);
            vals = vals[this.namespace] ? vals[this.namespace] : {};
            console.log('remove', { vals, key });
            delete vals[key];
            console.log('afterRemove', { vals, key });
            return await this.storage.set({
                [this.namespace]: vals
            });
        }
        async clear() {
            await this.storage.remove(this.namespace);
        }
    }
    const ForageStorage$1 = ForageStorage;

    class Base {
        constructor() {
            this._genesisHashAdd = [];
            this.decodeAddress = (key, ignoreChecksum, ss58Format) => {
                return this.keyring.decodeAddress(key, ignoreChecksum, ss58Format);
            };
            this.encodeAddress = (key, ss58Format) => {
                return this.keyring.encodeAddress(key, ss58Format);
            };
            this.__internal__accounts = accounts;
            this.__internal__addresses = addresses;
            this.__internal__contracts = contracts;
            this.__internal__isEthereum = false;
            this._forageStore = new ForageStorage$1('keyring', {});
        }
        get accounts() {
            return this.__internal__accounts;
        }
        get addresses() {
            return this.__internal__addresses;
        }
        get contracts() {
            return this.__internal__contracts;
        }
        get isEthereum() {
            return this.__internal__isEthereum;
        }
        get keyring() {
            if (this.__internal__keyring) {
                return this.__internal__keyring;
            }
            throw new Error('Keyring should be initialised via \'loadAll\' before use');
        }
        get genesisHash() {
            return this._genesisHash;
        }
        get genesisHashes() {
            return this._genesisHash
                ? [this._genesisHash, ...this._genesisHashAdd]
                : [...this._genesisHashAdd];
        }
        getPair(address) {
            return this.keyring.getPair(address);
        }
        getPairs() {
            return this.keyring.getPairs().filter((pair) => env.isDevelopment() || pair.meta.isTesting !== true);
        }
        isAvailable(_address) {
            const accountsValue = this.accounts.subject.getValue();
            const addressesValue = this.addresses.subject.getValue();
            const contractsValue = this.contracts.subject.getValue();
            const address = util.isString(_address)
                ? _address
                : this.encodeAddress(_address);
            return !accountsValue[address] && !addressesValue[address] && !contractsValue[address];
        }
        isPassValid(password) {
            return password.length > 0;
        }
        setSS58Format(ss58Format) {
            if (this.__internal__keyring && util.isNumber(ss58Format)) {
                this.__internal__keyring.setSS58Format(ss58Format);
            }
        }
        setDevMode(isDevelopment) {
            env.set(isDevelopment);
        }
        async initKeyring(options) {
            const keyring = keyring$1.createTestKeyring(options, true);
            if (util.isBoolean(options.isDevelopment)) {
                this.setDevMode(options.isDevelopment);
            }
            this.__internal__isEthereum = keyring.type === 'ethereum';
            this.__internal__keyring = keyring;
            this._genesisHash = options.genesisHash && (util.isString(options.genesisHash)
                ? options.genesisHash.toString()
                : options.genesisHash.toHex());
            this._genesisHashAdd = options.genesisHashAdd || [];
            this._forageStore = this._forageStore;
            await this.addAccountPairs();
        }
        async addAccountPairs() {
            this.keyring
                .getPairs()
                .forEach(async ({ address, meta }) => {
                await this.accounts.add(this._forageStore, address, { address, meta });
            });
        }
        addTimestamp(pair) {
            if (!pair.meta.whenCreated) {
                pair.setMeta({ whenCreated: Date.now() });
            }
        }
    }

    const RECENT_EXPIRY = 24 * 60 * 60;
    class Keyring extends Base {
        constructor() {
            super(...arguments);
            this.keyringOption = new KeyringOption();
            this.__internal__stores = {
                account: () => this.accounts,
                address: () => this.addresses,
                contract: () => this.contracts
            };
        }
        async addExternal(address, meta = {}) {
            const pair = this.keyring.addFromAddress(address, util.objectSpread({}, meta, { isExternal: true }), null);
            const json = await this.saveAccount(pair);
            return {
                json,
                pair
            };
        }
        async addHardware(address, hardwareType, meta = {}) {
            return await this.addExternal(address, util.objectSpread({}, meta, { hardwareType, isHardware: true }));
        }
        async addMultisig(addresses, threshold, meta = {}) {
            let address = utilCrypto.createKeyMulti(addresses, threshold);
            if (this.isEthereum) {
                address = address.slice(0, 20);
            }
            const who = util.u8aSorted(addresses.map((who) => this.decodeAddress(who))).map((who) => this.encodeAddress(who));
            return await this.addExternal(address, util.objectSpread({}, meta, { isMultisig: true, threshold: util.bnToBn(threshold).toNumber(), who }));
        }
        async addPair(pair, password) {
            this.keyring.addPair(pair);
            const json = await this.saveAccount(pair, password);
            return {
                json,
                pair
            };
        }
        async addUri(suri, password, meta = {}, type) {
            const pair = this.keyring.addFromUri(suri, meta, type);
            const json = await this.saveAccount(pair, password);
            return {
                json,
                pair
            };
        }
        backupAccount(pair, password) {
            if (!pair.isLocked) {
                pair.lock();
            }
            pair.decodePkcs8(password);
            return pair.toJson(password);
        }
        async backupAccounts(addresses, password) {
            const accountPromises = addresses.map((address) => {
                return new Promise(async (resolve) => {
                    const data = await this._forageStore.get(accountKey(address));
                    resolve(data);
                });
            });
            const accounts = await Promise.all(accountPromises);
            return util.objectSpread({}, utilCrypto.jsonEncrypt(util.stringToU8a(JSON.stringify(accounts)), ['batch-pkcs8'], password), {
                accounts: accounts.map((account) => ({
                    address: account.address,
                    meta: account.meta
                }))
            });
        }
        createFromJson(json, meta = {}) {
            return this.keyring.createFromJson(util.objectSpread({}, json, {
                meta: util.objectSpread({}, json.meta, meta)
            }));
        }
        createFromUri(suri, meta = {}, type) {
            return this.keyring.createFromUri(suri, meta, type);
        }
        async encryptAccount(pair, password) {
            const json = pair.toJson(password);
            json.meta.whenEdited = Date.now();
            this.keyring.addFromJson(json);
            await this.accounts.add(this._forageStore, pair.address, json, pair.type);
        }
        async forgetAccount(address) {
            this.keyring.removePair(address);
            await this.accounts.remove(this._forageStore, address);
        }
        async forgetAddress(address) {
            await this.addresses.remove(this._forageStore, address);
        }
        async forgetContract(address) {
            await this.contracts.remove(this._forageStore, address);
        }
        getAccount(address) {
            return this.getAddress(address, 'account');
        }
        getAccounts() {
            const available = this.accounts.subject.getValue();
            return Object
                .keys(available)
                .map((address) => this.getAddress(address, 'account'))
                .filter((account) => env.isDevelopment() || account.meta.isTesting !== true);
        }
        getAddress(_address, type = null) {
            const address = util.isString(_address)
                ? _address
                : this.encodeAddress(_address);
            const publicKey = this.decodeAddress(address);
            const stores = type
                ? [this.__internal__stores[type]]
                : Object.values(this.__internal__stores);
            const info = stores.reduce((lastInfo, store) => (store().subject.getValue()[address] || lastInfo), undefined);
            return info && {
                address,
                meta: info.json.meta,
                publicKey
            };
        }
        getAddresses() {
            const available = this.addresses.subject.getValue();
            return Object
                .keys(available)
                .map((address) => this.getAddress(address));
        }
        getContract(address) {
            return this.getAddress(address, 'contract');
        }
        getContracts() {
            const available = this.contracts.subject.getValue();
            return Object
                .entries(available)
                .filter(([, { json: { meta: { contract } } }]) => !!contract && contract.genesisHash === this.genesisHash)
                .map(([address]) => this.getContract(address));
        }
        async rewriteKey(json, key, hexAddr, creator) {
            if (hexAddr.substring(0, 2) === '0x') {
                return;
            }
            await this._forageStore.remove(key);
            await this._forageStore.set(creator(hexAddr), json);
        }
        async loadAccount(json, key) {
            if (!json.meta.isTesting && json.encoded) {
                const pair = this.keyring.addFromJson(json, true);
                await this.accounts.add(this._forageStore, pair.address, json, pair.type);
            }
            const [, hexAddr] = key.split(':');
            await this.rewriteKey(json, key, hexAddr.trim(), accountKey);
        }
        async loadAddress(json, key) {
            const { isRecent, whenCreated = 0 } = json.meta;
            if (isRecent && (Date.now() - whenCreated) > RECENT_EXPIRY) {
                await this._forageStore.remove(key);
                return;
            }
            const address = util.isHex(json.address) && json.address.length !== 66
                ? json.address
                : this.encodeAddress(util.isHex(json.address)
                    ? util.hexToU8a(json.address)
                    : this.decodeAddress(json.address, true));
            const [, hexAddr] = key.split(':');
            await this.addresses.add(this._forageStore, address, json);
            await this.rewriteKey(json, key, hexAddr, addressKey);
        }
        async loadContract(json, key) {
            const address = this.encodeAddress(this.decodeAddress(json.address));
            const [, hexAddr] = key.split(':');
            json.meta.genesisHash = json.meta.genesisHash || (json.meta.contract && json.meta.contract.genesisHash);
            await this.contracts.add(this._forageStore, address, json);
            await this.rewriteKey(json, key, hexAddr, contractKey);
        }
        async loadInjected(address, meta, type) {
            const json = {
                address,
                meta: util.objectSpread({}, meta, { isInjected: true })
            };
            const pair = this.keyring.addFromAddress(address, json.meta, null, type);
            await this.accounts.add(this._forageStore, pair.address, json, pair.type);
        }
        allowGenesis(json) {
            if (json && json.meta && this.genesisHash) {
                const hashes = Object.values(uiSettings.chains).find((hashes) => hashes.includes(this.genesisHash || '')) || [this.genesisHash];
                if (json.meta.genesisHash) {
                    return hashes.includes(json.meta.genesisHash) || this.genesisHashes.includes(json.meta.genesisHash);
                }
                else if (json.meta.contract) {
                    return hashes.includes(json.meta.contract.genesisHash);
                }
            }
            return true;
        }
        async loadAll(options, injected = []) {
            await super.initKeyring(options);
            this._forageStore.all(async (key, json) => {
                if (!util.isFunction(options.filter) || options.filter(json)) {
                    try {
                        if (this.allowGenesis(json)) {
                            if (accountRegex.test(key)) {
                                await this.loadAccount(json, key);
                            }
                            else if (addressRegex.test(key)) {
                                await this.loadAddress(json, key);
                            }
                            else if (contractRegex.test(key)) {
                                await this.loadContract(json, key);
                            }
                        }
                    }
                    catch {
                        console.warn(`Keyring: Unable to load ${key}:${util.stringify(json)}`);
                    }
                }
            });
            injected.forEach(async (account) => {
                if (this.allowGenesis(account)) {
                    try {
                        await this.loadInjected(account.address, account.meta, account.type);
                    }
                    catch {
                        console.warn(`Keyring: Unable to inject ${util.stringify(account)}`);
                    }
                }
            });
            this.keyringOption.init(this);
        }
        restoreAccount(json, password) {
            const cryptoType = Array.isArray(json.encoding.content) ? json.encoding.content[1] : 'ed25519';
            const encType = Array.isArray(json.encoding.type) ? json.encoding.type : [json.encoding.type];
            const pair = keyring$1.createPair({ toSS58: this.encodeAddress, type: cryptoType }, { publicKey: this.decodeAddress(json.address, true) }, json.meta, util.isHex(json.encoded) ? util.hexToU8a(json.encoded) : utilCrypto.base64Decode(json.encoded), encType);
            pair.decodePkcs8(password);
            this.addPair(pair, password);
            pair.lock();
            return pair;
        }
        restoreAccounts(json, password) {
            const accounts = JSON.parse(util.u8aToString(utilCrypto.jsonDecrypt(json, password)));
            accounts.forEach(async (account) => {
                await this.loadAccount(account, accountKey(account.address));
            });
        }
        async saveAccount(pair, password) {
            this.addTimestamp(pair);
            const json = pair.toJson(password);
            this.keyring.addFromJson(json);
            await this.accounts.add(this._forageStore, pair.address, json, pair.type);
            return json;
        }
        async saveAccountMeta(pair, meta) {
            const address = pair.address;
            const json = await this._forageStore.get(accountKey(address));
            pair.setMeta(meta);
            json.meta = pair.meta;
            await this.accounts.add(this._forageStore, address, json, pair.type);
        }
        async saveAddress(address, meta, type = 'address') {
            const available = this.addresses.subject.getValue();
            const json = (available[address] && available[address].json) || {
                address,
                meta: {
                    isRecent: undefined,
                    whenCreated: Date.now()
                }
            };
            Object.keys(meta).forEach((key) => {
                json.meta[key] = meta[key];
            });
            delete json.meta.isRecent;
            await this.__internal__stores[type]().add(this._forageStore, address, json);
            return json;
        }
        async saveContract(address, meta) {
            return await this.saveAddress(address, meta, 'contract');
        }
        async saveRecent(address) {
            const available = this.addresses.subject.getValue();
            if (!available[address]) {
                await this.addresses.add(this._forageStore, address, {
                    address,
                    meta: {
                        genesisHash: this.genesisHash,
                        isRecent: true,
                        whenCreated: Date.now()
                    }
                });
            }
            return this.addresses.subject.getValue()[address];
        }
    }

    const packageInfo = { name: '@polkadot/ui-keyring', path: (({ url: (typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-ui-keyring.js', document.baseURI).href)) }) && (typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-ui-keyring.js', document.baseURI).href))) ? new URL((typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-ui-keyring.js', document.baseURI).href))).pathname.substring(0, new URL((typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-ui-keyring.js', document.baseURI).href))).pathname.lastIndexOf('/') + 1) : 'auto', type: 'esm', version: '3.2.3-2-x' };

    const keyring = new Keyring();

    exports.Keyring = Keyring;
    exports.keyring = keyring;
    exports.packageInfo = packageInfo;

}));
