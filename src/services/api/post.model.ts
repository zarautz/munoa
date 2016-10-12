export class Post {
    constructor(private data: any) {
        for (var property in this.data) {
            this[property] = this.data[property];
        }
    }

    getThumbnailImage() {
        let keys = Object.keys(this.data.contentImages);

        if (keys.length > 0) {
            return this.data.contentImages[keys[0]].source.square;
        } else {
            return '';
        }
    };
}
