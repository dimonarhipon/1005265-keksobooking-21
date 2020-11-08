'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`, `svg`, `webp`];
const photoStyles = {
  width: 70,
  height: 70
};

const avatar = window.form.container.querySelector(`#avatar`);
const previewAvatar = window.form.container.querySelector(`.ad-form-header__preview`).querySelector(`img`);
const photoHousing = window.form.container.querySelector(`#images`);
const previewPhoto = window.form.container.querySelector(`.ad-form__photo`);


avatar.addEventListener(`change`, () => {
  const file = avatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((ending) => {
    return fileName.endsWith(ending);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
      previewAvatar.src = reader.result;
      previewAvatar.style.objectFit = `contain`;
    });
    reader.readAsDataURL(file);
  }
});

photoHousing.addEventListener(`change`, () => {
  const file = photoHousing.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((ending) => {
    return fileName.endsWith(ending);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      const previewImage = previewPhoto.querySelector(`img`);

      if (previewImage === null) {
        const photoElement = document.createElement(`img`);
        photoElement.width = photoStyles.width;
        photoElement.height = photoStyles.height;
        photoElement.style.objectFit = `contain`;
        photoElement.src = reader.result;
        previewPhoto.appendChild(photoElement);
      }
      if (previewImage) {
        previewImage.src = reader.result;
        previewImage.style.objectFit = `contain`;
      }

    });

    reader.readAsDataURL(file);
  }
});

window.loadImage = {
  previewAvatar,
  previewPhoto,
};

