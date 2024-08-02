class Pagination {
    constructor(page, pageSize) {
        this.page = page;
        this.pageSize = pageSize;
    }

    getOffset() {
        return (this.page - 1) * this.pageSize;
    }

    getLimit() {
        return this.pageSize;
    }
}

module.exports = Pagination;
