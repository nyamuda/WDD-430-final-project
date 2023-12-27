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
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  //meta data for pagination
  private _metaData = new MetaData(0, 0, 0);

  //number of placeholder testimonial items
  placeholders = new Array<number>(9);

  //Signals
  public testimonialListSignal: WritableSignal<Testimonial[]> = signal([]);
  public metaDataSignal: WritableSignal<MetaData> = signal(this._metaData);
  public topTestimonialSignal = signal(new Testimonial());

  //display placeholder testimonials
  //in case its fetching testimonials
  public isFetchingTestimonials: WritableSignal<boolean> = signal(false);
  //information about the logged in user
  public loggedInUser: Signal<User> = computed(() => this.userService.user());

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private userService: UsersService,
    private datePipe: DatePipe
  ) {}

  // CREATE
  addTestimonial(newTestimonial: Testimonial) {
    if (!!newTestimonial) {
      const url = `${this.appService.apiUrl}/testimonials`;
      const headers = this.headers();

      let testimonialDto = {
        userId: this.loggedInUser()['_id'],
        position: newTestimonial.position,
        content: newTestimonial.content,
        stars: newTestimonial.stars,
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
          let errorMessage = error['error']['message']
            ? error['error']['message']
            : error['error']['error']
            ? error['error']['error']
            : "We're sorry, but there was an error submitting your testimonial. Please try again later.";

          this.appService.showFailureToast(
            errorMessage,
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
        //add placeholder image URLs to testimonials that do not have images
        let testimonialPlaceholders = this.addPlaceholderImages(
          response.testimonials
        );

        //format the testimonials' createdAt date
        let formattedTestimonials = this.formatTestimonialDate(
          testimonialPlaceholders
        );

        //get the top testimonial and save it
        let topTestimonial = this.getTopTestimonial(formattedTestimonials);
        this.topTestimonialSignal.set(topTestimonial);

        //remove the top testimonial from the list
        formattedTestimonials = formattedTestimonials.filter(
          (item) => item['_id'] != topTestimonial['_id']
        );

        //update the testimonialListSignal
        this.testimonialListSignal.set(formattedTestimonials);

        let totalItems = response.meta.totalItems
          ? response.meta.totalItems
          : 0;
        let currentPage = response.meta.currentPage
          ? response.meta.currentPage
          : 0;
        let pageSize = response.meta.pageSize ? response.meta.pageSize : 0;

        //save the meta data
        //meta data for pagination
        let meta = new MetaData(totalItems, currentPage, pageSize);
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
        userId: this.loggedInUser()['_id'],

        position: newTestimonial.position,
        content: newTestimonial.content,
        stars: newTestimonial.stars,
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
            let errorMessage = error['error']['message']
              ? error['error']['message']
              : error['error']['error']
              ? error['error']['error']
              : "We're sorry, but there was an error updating your testimonial. Please try again later.";

            this.appService.showFailureToast(
              errorMessage,
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

  //Add placeholder image URLs to testimonials
  //whose users do not have profile images
  addPlaceholderImages(testimonials: Testimonial[]): Testimonial[] {
    //add placeholder image to the testimonial if the user
    //does not have one
    let testimonialsWithImages = testimonials.map(
      (testimonial: Testimonial) => {
        if (testimonial.userId.imageUrl) {
          return testimonial;
        } else {
          //get the username
          let userName = testimonial.userId.name;
          //use the username to general a placeholder image URL
          let placeholderUrl = this.userService.imagePlaceholderUrl(userName);

          //save the placeholder URL to the testimonial
          testimonial.userId.imageUrl = placeholderUrl;
          return testimonial;
        }
      }
    );

    return testimonialsWithImages;
  }

  //format the date of the testimonial
  formatTestimonialDate(testimonials: Testimonial[]): Testimonial[] {
    let formattedTestimonials = testimonials.map((testimonial: Testimonial) => {
      //format the date
      let originalFormat = testimonial.createdAt;
      let newFormat = 'd MMMM yyyy';
      testimonial.createdAt = this.datePipe.transform(
        originalFormat,
        newFormat
      );
      return testimonial;
    });
    return formattedTestimonials;
  }

  //get the top testimonial
  getTopTestimonial(testimonials: Testimonial[]): Testimonial {
    //sort them by rating
    let items = testimonials.sort((a, b) => b.stars - a.stars);

    //return the first item
    return items[0];
  }
}
