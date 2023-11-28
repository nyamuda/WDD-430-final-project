import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { MetaData } from '../app.meta';
import { Testimonial, TestimonialMetaDto } from './testimonial.model';
import { User } from '../users/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService } from '../app.service';
import { UsersService } from '../users/users.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  //meta data for pagination
  private _metaData = new MetaData(0, 0, 0);

  //Signals
  public testimonialListSignal: WritableSignal<Testimonial[]> = signal([]);
  public metaDataSignal: WritableSignal<MetaData> = signal(this._metaData);

  //display placeholder testimonials
  //in case its fetching testimonials
  public isFetchingTestimonials: WritableSignal<boolean> = signal(false);
  //information about the logged in user
  public loggedInUser: Signal<User> = computed(() => this.userService.user());

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private userService: UsersService
  ) {}

  // CREATE
  addTestimonial(newTestimonial: Testimonial) {
    if (!!newTestimonial) {
      const url = `${this.appService.apiUrl}/testimonials`;
      const headers = this.headers();

      let testimonialDto = {
        name: newTestimonial.name,
        imageUrl: newTestimonial.imageUrl,
        position: newTestimonial.position,
        content: newTestimonial.content,
        rating: newTestimonial.rating,
      };

      this.http.post(url, testimonialDto, { headers }).subscribe(
        (response) => {
          this.getTestimonials();
          //show toast
          this.appService.showSuccessToast(
            'We appreciate your valuable feedback!',
            'Thank you for your testimonial'
          );
        },
        (error) => {
          this.appService.showFailureToast(
            "We're sorry, but there was an error submitting your testimonial. Please try again later.",
            'Testimonial submission failed'
          );
        }
      );
    }
  }

  //READ
  getTestimonialById(id: string): Observable<Testimonial> {
    const url = `${this.appService.apiUrl}/testimonials/${id}`;
    return this.http.get<Testimonial>(url);
  }

  // READ
  getTestimonials(page: number = 1) {
    //show placeholder testimonials
    this.isFetchingTestimonials.set(true);

    const url = `${this.appService.apiUrl}/testimonials?page=${page}`;

    //get the testimonials
    //and meta data for pagination
    this.http.get<TestimonialMetaDto>(url).subscribe(
      (response: TestimonialMetaDto) => {
        //save the testimonials
        this.testimonialListSignal.set(response.testimonials);

        //save the meta data
        //meta data for pagination
        let meta = new MetaData(
          response.meta.totalItems,
          response.meta.currentPage,
          response.meta.pageSize
        );
        this.metaDataSignal.set(meta);

        //stop placeholder testimonials
        this.isFetchingTestimonials.set(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // UPDATE
  updateTestimonial(id: string, newTestimonial: Testimonial) {
    if (!!newTestimonial) {
      const headers = this.headers();

      let testimonialDto = {
        name: newTestimonial.name,
        imageUrl: newTestimonial.imageUrl,
        position: newTestimonial.position,
        content: newTestimonial.content,
        rating: newTestimonial.rating,
      };

      const url = `${this.appService.apiUrl}/testimonials/${id}`;
      this.http
        .put(url, testimonialDto, {
          headers,
        })
        .subscribe(
          (response) => {
            this.getTestimonials();
            this.appService.showSuccessToast(
              'Thank you for your revised feedback!',
              'Testimonial updated'
            );
          },
          (error) => {
            this.appService.showFailureToast(
              "We're sorry, but there was an error updating your testimonial. Please try again later.",
              'Testimonial update failed'
            );
          }
        );
    }
  }

  // DELETE
  deleteTestimonial(id: string) {
    const headers = this.headers();
    const url = `${this.appService.apiUrl}/testimonials/${id}`;

    this.http.delete(url, { headers }).subscribe(
      (response) => {
        this.getTestimonials();
        this.appService.showSuccessToast(
          'Your testimonial has been successfully removed.',
          'Testimonial deleted successfully'
        );
      },
      (error) => {
        this.appService.showFailureToast(
          "We're sorry, but there was an error deleting your testimonial. Please try again later.",
          'Failed to delete testimonial'
        );
      }
    );
  }

  headers(): HttpHeaders {
    let token = this.userService.getJwtToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return headers;
  }
}