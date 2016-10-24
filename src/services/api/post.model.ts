export class Post {
    constructor() {}

    assign(obj: any, imageSize: string = 'medium'): void {
        // Replace content images with the preferred size
        for (let path in obj.contentImages) {
            obj.content = obj.content.replace(path, obj.contentImages[path].source[imageSize]);
        }

        delete obj.contentImages;

        Object.assign(this, obj);
    }
}
