import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  async uploadImage(id: string, file: File): Promise<void> {
    const time: number = new Date().getTime();
    const result = await this.storage.ref(`lessons/${id}/images/${time}`).put(file);
    return await result.ref.getDownloadURL();
  }
}
