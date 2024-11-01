export class RandomKey {
    constructor(size) {
        this.set = new Set();
        this.keys = [];
        while (this.keys.length < size) {
            this.keys.push(this.getRandomKeys());
        }
    }

    getRandomKeys() {
        let randomKey = Math.floor(Math.random() * 10000);
        while (this.set.has(randomKey))
            randomKey = Math.floor(Math.random() * 10000);
        return randomKey;
    }

    add(index) {
        if (index < 0 || index > this.keys.length)
            return;
        let randomKey = this.getRandomKeys();
        if (index === 0)
            this.keys.unshift(randomKey);
        else {
            let p1 = this.keys.slice(0, index);
            let p2 = this.keys.slice(index, this.keys.length);
            this.keys = p1.concat([randomKey], p2);
        }
    }

    remove(index) {
        if (index < 0 || index >= this.keys.length) {
            return;
        }
        if (index === 0)
            this.keys.shift();
        else {
            this.keys = this.keys.filter((key, i) => i !== index);
        }
    }

    
    toString() {
        console.log(this.keys);
    }
}



