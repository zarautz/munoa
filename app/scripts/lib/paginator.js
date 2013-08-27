'use strict';

Z.Paginator = function Paginator(items, pageSize) {
    this._items = items || [];
    this._page  = 1;

    this.setPageSize(pageSize || 10);
};

Z.Paginator.prototype._checkPageNumber = function () {
    this._page = (this._page > this._totalPages) ? this._totalPages : ((this._page < 1) ? 1 : this._page);
}

Z.Paginator.prototype.getItems = function () {
    var offset = (this._page - 1) * this._pageSize;

    return this._items.slice(offset, offset + this._pageSize);
}

Z.Paginator.prototype.getPage = function () {
    return this._page;
}

Z.Paginator.prototype.getPageSize = function () {
    return this._pageSize;
}

Z.Paginator.prototype.getTotalItems = function () {
    return this._items.length;
}

Z.Paginator.prototype.getTotalPages = function () {
    return this._totalPages;
}

Z.Paginator.prototype.hasNext = function () {
    return this._page < this._totalPages;
}

Z.Paginator.prototype.hasPrev = function () {
    return this._page > 1;
}

Z.Paginator.prototype.next = function () {
    if (this.hasNext()) {
        this._page++;
    }
}

Z.Paginator.prototype.prev = function () {
    if (this.hasPrev()) {
        this._page--;
    }
}

Z.Paginator.prototype.moveTo = function (page) {
    this._page = page;
    this._checkPageNumber();
}

Z.Paginator.prototype.setItems = function (items) {
    this._items = items;

    // This resets _totalPages and checks _page boundaries
    this.setPageSize(this.getPageSize());
}

Z.Paginator.prototype.setPageSize = function (size) {
    this._pageSize   = size;
    this._totalPages = Math.ceil(this._items.length / this._pageSize); // 1 - x
    this._checkPageNumber();
}
