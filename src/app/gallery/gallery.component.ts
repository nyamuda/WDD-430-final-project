import { Component, OnInit, Signal, computed } from '@angular/core';
import { GalleryService } from './gallery.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  constructor(
    private galleryService: GalleryService,
    private userService: UsersService
  ) {}
  ngOnInit(): void {
    this.galleryService.getGalleryItems();
  }

  //information about the current logged in user
  currentUser: Signal<User> = computed(() => this.userService.user());

  //only admins have the authority to edit or gallery items
  isAdmin(): boolean {
    return this.currentUser().isAdmin;
  }
}
