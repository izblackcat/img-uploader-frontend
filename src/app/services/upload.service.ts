import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // private backendUrl = "http://localhost:8080/api/uploads/images";
  private backendUrl = "https://img-uploader-2904.onrender.com/api/uploads/images";

  fetchedImages = signal<any[]>([]);

  showToast = signal<boolean>(false);

  constructor(private http: HttpClient) { }

  getImages() {
    this.http.get<string[]>(this.backendUrl).subscribe({
      next: (data) => {
        const results = data.map((fileName) => ({
          src: `${this.backendUrl}/${fileName}`,
          alt: fileName,
        }
        ));
        this.fetchedImages.set(results);
      },
      error: (err) => console.error('Failed to fetch images : ', err),
    });
  }

  uploadImage(file: File) {
    const formData = new FormData();

    // our backend expects 'file' key:
    formData.append('file', file);

    return this.http.post(this.backendUrl, formData);
  }

  dismissToast() {
    this.showToast.set(false);
  }
}
