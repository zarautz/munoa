'use strict';

Z.Status = function Status(children) {
    this._children = [];
    this._parent   = null;
    this._uid      = 'uid:' + Math.random();

    // Init Hierarchy
    children = children || [];

    for (var i = 0; i < children.length; i++) {
        children[i].setParent(this);
    }

    // Init vars
    this.reset();

    // Update
    this.update();
};

Z.Status.prototype.addChild = function (child) {
    this._children.push(child);
};

Z.Status.prototype.getUID = function () {
    return this._uid;
};

Z.Status.prototype.hasChildren = function () {
    return !!this._children.length;
};

Z.Status.prototype.hasParent = function () {
    return this._parent !== null;
};

Z.Status.prototype.reset = function () {
    this.isDone    = false;
    this.isError   = false;
    this.isLoading = false;
    this.isOld     = false;
};

Z.Status.prototype.setParent = function (parent) {
    parent.addChild(this);
    this._parent = parent;
};

Z.Status.prototype.update = function () {
    if (this.hasChildren()) {
        var isDone = true,
            child;

        this.reset();

        for (var i = 0; i < this._children.length; i++) {
            child = this._children[i];

            if (!child.isDone) { isDone = false; }
            if (child.isError) { this.isError = true; }
            if (child.isLoading) { this.isLoading = true; }
            if (child.isOld) { this.isOld = true; }
        }

        this.isDone = isDone;
    }

    if (this.hasParent()) {
        this._parent.update();
    }
};
