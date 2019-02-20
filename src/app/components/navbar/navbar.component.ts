import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .modal {
      top: 30%;
    }
    .modal-dialog {
      max-width: 375px;
    }
  `]
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isLoggedInReference.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

  onLogout() {
    this.authService.logout();
    if (!this.authService.isLoggedIn()) {
      this.isLoggedIn = false;
    }
  }
}
