export class Post {
    contentImages: {};

    constructor(private data) {
        for (var property in data) {
            this[property] = data[property];
        }
    }

    getThumbnailImage() {
        var images = this.contentImages,
            keys = Object.keys(images);

        if (keys.length > 0) {
            return images[keys[0]].source.square;
        } else {
            return '';
        }
    };
}


export class PostManager {
    public objects: Array<Post> = [];

    constructor(private data) {
        for (var i = 0, len = data.length; i < len; i++) {
            this.objects.push(new Post(data[i]));
        }
    }
}
