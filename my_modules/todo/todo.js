/**
 * Created by ckraushaar on 16.12.2015.
 */


exports.ToDoElement = function(id, text, bool) {
    var self = this;
    self.toDoText = text;
    self.id = id;
    self.done = bool;
    return self;
}