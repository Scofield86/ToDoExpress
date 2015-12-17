/**
 * Created by ckraushaar on 16.12.2015.
 */
function Element (id, text, bool) {
    var self = this;
    self.toDoText = text;
    self.id = id;
    self.done = bool;
};

exports.ToDoElement = function(id, text, bool)
{
    return new Element(id, text, bool);
};