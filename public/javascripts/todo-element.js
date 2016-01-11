/**
 * Created by ckraushaar on 16.12.2015.
 */

    (function (exports) {

    // your code goes here

    exports.ToDoElement = function (data) {
        var self = this;
        self.toDoText = ko.observable(data.toDoText);
        self.id = data.id;
        if (typeof data.done === "string") {
            data.done = data.done === "true";
        }
        self.done = ko.observable(data.done);
        self.shouldShowToDo = ko.computed(function () {
            if (vm != null && vm.showdone()) {
                return true;
            }
            return !self.done();
        }, self);

        //ko.computed(function () {
        //    if (self.done()) { }
        //}, self);
    };

})(typeof exports === 'undefined' ? this['mymodule'] = {} : exports);
