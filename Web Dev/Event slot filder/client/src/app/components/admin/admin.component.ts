import { Component, OnInit } from '@angular/core';
import { Hall } from '../../Hall';
import { DbService } from '../../services/db.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  name!: string;
  place!: string;
  capacity?: string | undefined;
  constructor(private db: DbService) {}

  ngOnInit(): void {}
  onAddHall(): void {
    if (!this.name || !this.place) {
      alert('Please fill all the fields!');
    } else {
      const event_hall: Hall = {
        name: this.name,
        place: this.place,
        capacity: this.capacity,
      };
      this.db.createHalls(event_hall).subscribe(
        (data) => {
          console.log('Data: ', data);
        },
        (err) => {
          console.log('err: ', err);
        },
        () => {
          alert('Hall added successfully!');
        }
      );

    }
  }
}
