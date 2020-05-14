const horseColors = [
  "Aqua",
  "Black",
  "Blue",
  "LightGreen",
  "Brown",
  "Cyan",
  "DarkGreen",
  "Lime",
  "Magenta",
  "Pink",
  "Purple",
  "Red",
  "Yellow",
];

let otherImageRequests = [
  { name: "grass", url: "./assets/images//grass.jpeg" },
];

let taggedImages = {};

function getNewImagePromise(imageUrl) {
  return new Promise((resolve) => {
    let image = new Image();
    image.onload = function () {
      resolve(image);
    };
    image.src = imageUrl;
  });
}

class ImageLoader {
  constructor() {
    this.horseImages = [];
    this.taggedImages = {};

    this._loadAllHorseImages = function () {
      this.horseImages = [];
      return new Promise((resolve, reject) => {
        let imagePromises = [];
        for (let index in horseColors) {
          let name = horseColors[index];
          let colorName = `./assets/images/Horse${name}.png`;
          imagePromises.push(getNewImagePromise(colorName));
        }
        Promise.all(imagePromises)
          .then((imageArray) => {
            for (let i in imageArray) {
              this.horseImages.push(imageArray[i]);
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    this._loadTaggedImages = function () {
      this.taggedImages = [];
      return new Promise((resolve, reject) => {
        let imagePromises = [];
        for (let index in otherImageRequests) {
          let imageReq = otherImageRequests[index];
          imagePromises.push(getNewImagePromise(imageReq.url));
        }
        Promise.all(imagePromises)
          .then((imageArray) => {
            for (let i in imageArray) {
              this.taggedImages[otherImageRequests[i].name] = imageArray[i];
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    };
  }

  loadImages() {
    return new Promise((resolve, reject) => {
      this._loadAllHorseImages()
        .then(() => {
          this._loadTaggedImages().then(() => {
            resolve();
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
