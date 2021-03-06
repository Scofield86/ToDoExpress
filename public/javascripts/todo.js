/*function ToDoElement(text, bool, id) {
 var self = this;
 self.toDoText = ko.observable(text);
 self.id = id;
 if (typeof bool === "string") {
 bool = bool === "true";
 }
 self.done = ko.observable(bool);
 self.shouldShowToDo = ko.computed(function () {
 if (vm != null && vm.showdone()) {
 return true;
 }
 return !self.done();
 }, self);

 //ko.computed(function () {
 //    if (self.done()) { }
 //}, self);
 }*/

var ViewModel = function () {
    var self = this;
    self.ToDotextInput = ko.observable();
    self.ToDoItems = ko.observableArray();
    self.showdone = ko.observable();

    self.Add = function () {
        if (self.ToDotextInput()) {
            var newToDo = new mymodule.ToDoElement(null, self.ToDotextInput(), false);
            console.log(newToDo);
            self.ToDoItems.push(newToDo);
            self.ToDotextInput("");
        }
    };

    self.Clear = function () {
        self.ToDoItems.removeAll();
    }
};

vm = new ViewModel();
ko.applyBindings(vm);
requestJsonToDo();

function requestJsonToDo() {
    $.ajax({
        url: "/api/todolist"
    }).done(function (datas) {
        console.log(datas);
        datas.forEach(function (data) {
            vm.ToDoItems.push(new mymodule.ToDoElement(data));
        });
    });
}