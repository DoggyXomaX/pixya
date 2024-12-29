import { ImageStore } from '@/store/ImageStore';

export const prepareStores = () => {
  const defaultId = 'Frame_0';

  ImageStore.instance.create({ id: defaultId, width: 32, height: 32 });
  ImageStore.instance.currentImage = defaultId;
};